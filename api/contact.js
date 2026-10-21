// Vercel serverless function: POST /api/contact
import { handleContact } from "./_lib/contact.js";

export default async function handler(req, res) {
  let body;
  try {
    body = req.body; // Vercel parses JSON lazily and throws on malformed input
  } catch {
    body = null;
  }

  // Vercel sets x-real-ip / x-forwarded-for itself; client-supplied values are overwritten.
  const ip =
    req.headers["x-real-ip"] ||
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress;

  const result = await handleContact({
    method: req.method,
    contentType: req.headers["content-type"],
    body,
    ip,
    env: process.env,
  });

  for (const [key, value] of Object.entries(result.headers)) res.setHeader(key, value);
  res.setHeader("Cache-Control", "no-store");
  res.status(result.status).json(result.json);
}
