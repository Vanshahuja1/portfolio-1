// Platform-agnostic contact handler. api/contact.js adapts it for Vercel and
// vite.config.js adapts it for `npm run dev`. The leading underscore keeps
// Vercel from exposing this file as its own route.
import nodemailer from "nodemailer";
import { validateContact } from "../../src/lib/contactValidation.js";

const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot
const RATE_LIMIT = 5; // requests…
const RATE_WINDOW_MS = 15 * 60 * 1000; // …per IP per 15 minutes

// In-memory and per-instance: it resets on cold starts and isn't shared
// between concurrent serverless instances. Enough to slow down casual abuse.
// Only attempts that would actually send mail are counted.
const hits = new Map();
let lastPrune = 0;

function isRateLimited(ip, now) {
  if (now - lastPrune > 60_000) {
    lastPrune = now;
    for (const [key, times] of hits) {
      if (now - times.at(-1) > RATE_WINDOW_MS) hits.delete(key); // newest is last
    }
  }
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true; // blocked attempts aren't recorded
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

let transporter;
function getTransporter(env) {
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

// Strip control characters (incl. CR/LF) from anything placed in a header.
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const oneLine = (s) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const reply = (status, json, headers = {}) => ({ status, json, headers });

/**
 * @param {{ method: string, contentType?: string, body: unknown, ip: string, env: Record<string, string|undefined> }} req
 * @returns {Promise<{ status: number, json: object, headers: Record<string, string> }>}
 */
export async function handleContact({ method, contentType, body, ip, env }) {
  if (method !== "POST") {
    return reply(405, { error: "Method not allowed." }, { Allow: "POST" });
  }
  if (!contentType?.toLowerCase().startsWith("application/json")) {
    return reply(415, { error: "Expected a JSON body." });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return reply(400, { error: "Invalid request body." });
  }

  const { name, email, message, hp, elapsedMs } = body;

  // Honeypot filled in: pretend it worked so bots get no signal.
  if (hp) {
    console.info("[contact] Honeypot triggered; message dropped");
    return reply(200, { ok: true });
  }

  if (typeof elapsedMs !== "number" || elapsedMs < MIN_FILL_MS) {
    return reply(400, { error: "That was quick! Please wait a few seconds and try again." });
  }

  const fields = validateContact({ name, email, message });
  if (Object.keys(fields).length) {
    return reply(400, { error: Object.values(fields).join(" "), fields });
  }

  const now = Date.now();
  if (isRateLimited(ip || "unknown", now)) {
    return reply(
      429,
      { error: "Too many messages. Please try again later or email me directly." },
      { "Retry-After": String(RATE_WINDOW_MS / 1000) }
    );
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_TO) {
    console.error("[contact] Missing GMAIL_USER, GMAIL_APP_PASSWORD or CONTACT_TO");
    return reply(500, { error: "Something went wrong on my side. Please email me directly." });
  }

  const cleanName = oneLine(name);
  const cleanEmail = email.trim();
  const sentAt = new Date(now).toISOString();

  try {
    await getTransporter(env).sendMail({
      from: { name: "Portfolio contact form", address: GMAIL_USER },
      to: CONTACT_TO,
      replyTo: cleanEmail,
      subject: `Portfolio contact: ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nSent: ${sentAt}\n\n${message.trim()}\n`,
    });
  } catch (err) {
    // Log the reason only; never echo it back to the client.
    console.error("[contact] sendMail failed:", err?.code || err?.message);
    return reply(502, { error: "Couldn't send your message. Please try again or email me directly." });
  }

  return reply(200, { ok: true });
}
