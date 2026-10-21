import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Serves api/contact.js's logic at /api/contact during `npm run dev`, so the
// form works locally without the Vercel CLI. In production Vercel runs
// api/contact.js itself. Server env vars come from .env (never VITE_-prefixed,
// so they are not exposed to the client bundle).
function contactApiDev() {
  return {
    name: "contact-api-dev",
    apply: "serve",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir || server.config.root, "");
      server.middlewares.use("/api/contact", async (req, res) => {
        const send = (status, json, headers = {}) => {
          res.statusCode = status;
          for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(json));
        };

        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);

          let body = null;
          try {
            body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          } catch {
            // handled as an invalid body below
          }

          const { handleContact } = await server.ssrLoadModule("/api/_lib/contact.js");
          const result = await handleContact({
            method: req.method,
            contentType: req.headers["content-type"],
            body,
            ip: req.socket.remoteAddress,
            env,
          });
          send(result.status, result.json, result.headers);
        } catch (err) {
          console.error("[contact dev]", err);
          send(500, { error: "Something went wrong on my side. Please email me directly." });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApiDev()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
