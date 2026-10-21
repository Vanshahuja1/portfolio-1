# Vansh Ahuja — Portfolio

Personal portfolio built with React 19, Vite, Tailwind CSS v4, React Router 7 and GSAP.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run lint      # ESLint
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

### Contact form

The form posts JSON to `/api/contact`, a Vercel serverless function ([`api/contact.js`](api/contact.js)) that sends the message with Nodemailer over Gmail SMTP. No third-party form service is involved. The logic lives in [`api/_lib/contact.js`](api/_lib/contact.js); validation rules are shared with the form via [`src/lib/contactValidation.js`](src/lib/contactValidation.js).

It needs three **server-side** environment variables (never prefix them with `VITE_`, which would expose them to the browser):

| Variable | Purpose |
|---|---|
| `GMAIL_USER` | The Gmail address that sends the mail |
| `GMAIL_APP_PASSWORD` | A Gmail App Password for that account (not your normal password) |
| `CONTACT_TO` | Where messages are delivered (`vanshahuja318@gmail.com`) |

**Create a Gmail App Password:** turn on 2-Step Verification for the Google account (Google Account → Security), then open <https://myaccount.google.com/apppasswords>, create one named e.g. "Portfolio contact" and copy the 16-character password (spaces don't matter). Revoke it there at any time.

**Local development:** copy `.env.example` to `.env` (git-ignored), fill in the values and run `npm run dev`. A small Vite dev middleware ([`vite.config.js`](vite.config.js)) serves `/api/contact` with the same handler, so the Vercel CLI isn't needed. (`vercel dev` also works if you have it.)

**Production (Vercel):** add the three variables under Project → Settings → Environment Variables, then redeploy. [`vercel.json`](vercel.json) rewrites every non-`/api` path to `index.html` for client-side routing.

**Abuse protection** (no third parties): a hidden honeypot field (silently accepted, never sent), a minimum 3-second fill time, and a per-IP limit of 5 requests per 15 minutes. The rate limit is in memory, so it resets on cold starts and isn't shared between concurrent function instances. It slows casual abuse; it isn't a hard guarantee.

Without the variables the form shows a generic error; the rest of the site works.

## Routes

| Path | Page |
|---|---|
| `/` | Home (hero, selected projects, experience, skills, testimonials, contact) |
| `/projects` | All projects |
| `/projects/:slug` | Project detail page |
| `*` | Not found |

The app is a client-side SPA, so the host must serve `index.html` for unknown paths (a rewrite to `/index.html`), otherwise deep links such as `/projects/gatherrgo` will 404 on refresh.

## Content

All site content lives in [`src/constants/index.js`](src/constants/index.js).

**Projects** are a single list that feeds the home-page showcase (`featured: true`), the `/projects` index and the `/projects/:slug` detail pages. Slugs are used in URLs, so don't rename them. Each project can optionally carry a `detail` object with `overview`, `problem`, `role`, `architecture`, `decisions`, `challenges`, `outcomes` and `media`; the detail page only renders the sections that are present. The schema is documented above the `projects` array.

## Project structure

```
src/
  pages/        Home, ProjectsPage, ProjectDetailPage, NotFound
  sections/     Home-page sections (Hero, ShowcaseSection, Experience, …)
  components/   Shared UI (NavBar, Button, TitleHeader, ProjectCard, …)
  hooks/        usePageTitle
  lib/          Small helpers (reduced-motion check)
  constants/    Site content
public/         Static assets (images under public/images)
```

## Accessibility notes

- Skip-to-content link, a single `<main>` landmark and one `h1` per page.
- Mobile navigation menu below the `lg` breakpoint (keyboard operable; `Esc` closes it).
- `prefers-reduced-motion` is respected for CSS and GSAP animation.
