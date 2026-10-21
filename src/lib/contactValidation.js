// Shared by the contact form (client) and api/_lib/contact.js (server) so both
// enforce the same rules. The server is the source of truth.

export const LIMITS = { name: 100, email: 254, message: 5000 };

// Pragmatic check: something@something.tld. Also rejects whitespace and the
// address-list syntax characters (<>()[],;:"\) so the value can be used
// safely as a single Reply-To address.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

const str = (v) => (typeof v === "string" ? v.trim() : "");

// Returns { name?, email?, message? } with a message per invalid field.
export function validateContact({ name, email, message } = {}) {
  const errors = {};
  const n = str(name);
  const e = str(email);
  const m = str(message);

  if (!n) errors.name = "Please enter your name.";
  else if (n.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!e) errors.email = "Please enter your email.";
  else if (e.length > LIMITS.email || !EMAIL_RE.test(e)) errors.email = "Please enter a valid email address.";

  if (!m) errors.message = "Please enter a message.";
  else if (m.length > LIMITS.message) errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return errors;
}
