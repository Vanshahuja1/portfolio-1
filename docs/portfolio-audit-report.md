# Portfolio Audit Report — Vansh Ahuja

- **Audit date:** 2026-10-20
- **Scope:** `D:\Portfolio\3d-portfolio` (working tree, including uncommitted changes)
- **Mode:** Read-only audit. No application code, content, config, or dependencies were changed. This report is the only file added.
- **Method:** Full read of every source file under `src/`, `index.html`, `package.json`, `vite.config.js`, `public/`, and the existing `dist/` build output; asset inventory and cross-referencing; ESLint run (exit 0, no findings); installed skills/plugins inventory.
- **Not done:** No browser or screenshot inspection (see §18, Limitations). Every UX/responsive/visual finding below is derived from source and tagged accordingly.

### Evidence tags used throughout

| Tag | Meaning |
|---|---|
| **[V]** | Verified directly in source/build output/filesystem |
| **[H]** | Hypothesis — likely from source, needs runtime/visual confirmation |
| **[R]** | Recommendation (opinion, not a fact about the current code) |
| **[?]** | Cannot be verified from the repo — needs input from you |

---

# 0. Quick Audit Summary

## The five biggest problems

1. **Credibility: unverifiable numbers and self-written reviews sit next to real, strong engineering evidence.** [V] The hero counters claim "12+ Completed Projects", "50+ Satisfied Clients / Users" and "90% Project Success Rate" ([constants/index.js:35-40](../src/constants/index.js#L35-L40)); the site only shows 7 projects. Each experience card (including the B.Tech degree) carries a third-person "review" of you with five star icons ([constants:211-254](../src/constants/index.js#L211-L254), [GlowCard.jsx:36-40](../src/components/GlowCard.jsx#L36-L40)). Eight testimonials are generic and identical in shape. Meanwhile your genuinely strong, specific evidence (70% fewer LLM calls, 6 min → 90 s, < $0.50/drawing, 21 read-only + 7 approval-gated tools) is buried in an Experience bullet and a non-featured project. A hiring manager will discount the whole page because of the soft claims.
2. **The homepage showcases the wrong projects.** [V] The three "featured" projects (Qruzine, SHRM, AI Medical Docs — [constants:49,73,96](../src/constants/index.js#L49)) are older full-stack work. Your strongest AI-engineering work (AI 3D Renderer, Atomic Player, AI Shopping Assistant, GatherrGo backend) is `featured: false` and only visible on `/projects`. Two of them (Atomic Player, GatherrGo) have **no image and no link**, so they render as a gradient box with a title ([ProjectCard.jsx:24-30](../src/components/ProjectCard.jsx#L24-L30)). The site's positioning ("AI Engineer") and its featured work disagree.
3. **No mobile/tablet navigation.** [V] The nav is `hidden lg:flex` ([index.css:159-160](../src/index.css#L159-L160)) and there is no hamburger/menu component ([NavBar.jsx:66-84](../src/components/NavBar.jsx#L66-L84)); `public/images/menu.svg` exists but is unreferenced. Below 1024px, visitors get only the logo and a "Contact me" button. The `/projects` page — your best content — is unreachable from the nav on phones/tablets except via the home-page "View All Projects" link far down the page.
4. **Projects are cards, not case studies — and the "stats" are unsupported.** [V] There are no per-project routes; each project is an image, a paragraph, a rainbow row of tech pills, and two external buttons. Stats like "Used by 10+ restaurants", "Serving 500+ customers daily", "Used by 5+ doctors" ([constants:53,100](../src/constants/index.js#L53)) have no evidence on the site. Nothing explains a decision, a trade-off, or an architecture.
5. **Generic template patterns dominate the visual language.** [V] Every section opens with the same pill badge + centered `h1` ([TitleHeader.jsx](../src/components/TitleHeader.jsx)); `h1` appears in 4 files and renders 12 times on the home page, including once per job in a loop ([Experience.jsx:128](../src/sections/Experience.jsx#L128)); a 12-item soft-skills marquee ("Empathy", "Goal Oriented"), four icon-in-circle feature cards, 30 icon "skills" at `text-5xl`, ~14 tech-pill colours that encode nothing, and "Quick Response / Collaboration Ready / Open to Ideas" pills. This is the template look the brief asks to avoid.

## What should be removed

- Hero stat counters (all four) — or replace with facts you can defend (§5).
- Soft-skills marquee (`LogoShowcase`) and the "Seamless Collaboration" feature card.
- All "review" text on Experience cards; all 5-star icons.
- The 8-card testimonials wall as it exists (replace with 2–3 attributed, linkable quotes or nothing).
- The "Quick Response / Collaboration Ready / Open to Ideas" pills and the pulsing "Currently Available" card.
- The "Terms & Conditions" footer text ([Footer.jsx:8](../src/sections/Footer.jsx#L8) — a `<p>` with no link or page).
- The rotating "Ideas / Concepts / Designs / Code" hero word-slider and its generic headline.
- The `ScrollHint` idle popup, the LightRays WebGL background (or heavily simplify), and the FuzzyText canvas "Zyntrix" treatment.
- Dead assets/deps/config (§14): shadcn tokens, `react-responsive`, `class-variance-authority`, `tw-animate-css`, 16 unreferenced images, the JSM-tutorial README.

## What should be retained

- **The experience bullets for Monkstack** ([constants:207-209](../src/constants/index.js#L207-L209)) — the best writing on the site; specific, technical, quantified. Promote them.
- **Atomic Player and GatherrGo descriptions** ([constants:122,145](../src/constants/index.js#L122)) — concrete architecture language. They need visuals and links/evidence, not rewrites.
- Dark theme + **Mona Sans** (a good, characterful variable font; keep, but self-host).
- Vite + React 19 + Tailwind v4 + React Router 7 stack; lazy-loaded `/projects` route; `ScrollToTop` hash handling; GSAP **where it earns its keep** (page-load stagger, scroll-reveal).
- Contact form via EmailJS (works without a backend), email/LinkedIn/GitHub links.
- Title and meta description in `index.html` ("AI Engineer & Full-Stack Developer") — the positioning is correct, the page just doesn't deliver on it yet.
- Zyntrix as a *line item* (it is a real credibility signal for initiative), just not a full viewport section.

## What the homepage should become

A short, text-led, evidence-first page: **Hero (positioning + 1 proof point) → 3 featured case studies (AI work) → "How I work" capability list in plain prose → Experience (compact) → Contact**. Roughly 5 sections instead of 10, with clear entry points to `/projects`, individual case-study pages, résumé and contact. Full wireframe in §5.

## Projects that deserve dedicated case studies

| Tier | Project | Why |
|---|---|---|
| **Full case study** | AI 3D Renderer (blueprint-to-3D pipeline) | Hybrid deterministic + LLM design, quantified results, multi-tenant infra |
| **Full case study** | Atomic Player AI assistant | Tool registry, approval gating, model routing — the clearest "agent engineering" story |
| **Full case study** | AI Shopping Assistant (RAG + MCP) | Embeddings/pgvector/tool-calling over 5,000+ variants |
| **Short project page** | GatherrGo backend | Strong AWS architecture; needs diagram + role clarity |
| **Short project page** | Qruzine | Live product; add evidence for usage claims |
| **Listing entry only (or short page)** | SHRM, AI Medical Docs | Older/generic scope; AI Medical needs role clarification (repo owner is a colleague name) |

## What the design system should feel like

A restrained, editorial, engineering-document feel: near-black neutral surface, one accent colour used sparingly, **hairline rules and whitespace instead of bordered cards**, a single type family (Mona Sans) plus a monospace for metadata (dates, stack, labels), tight reading widths (≈ 65ch) for prose, and motion limited to page-load and scroll-reveal. Think "well-set technical documentation", not "SaaS landing page".

## First five changes

1. **Truth pass on content** (remove/replace counters, self-reviews, unsupported stats; fix "1+ years"). *(WS1)*
2. **Add mobile navigation** and fix heading structure / semantic landmarks. *(WS2)*
3. **Re-curate featured projects** to the AI work; give every project an image or diagram and a link or "private / NDA" note. *(WS3/WS4)*
4. **Introduce project data model + `/projects/:slug` route** and write the first case study (AI 3D Renderer). *(WS4)*
5. **Compress/convert heavy media** (≈ 21 MiB of project images/GIFs; 208 KiB favicon) and fix `index.html` metadata (absolute `og:image`, canonical, correct favicon type). *(WS6)*

---

# 1. Executive Summary

The site is a heavily modified fork of the JavaScript Mastery "3D Portfolio" tutorial. The uncommitted working tree removes the original Three.js/R3F scenes and `.glb` models (69 files changed, +655/−3034 lines vs `HEAD`) and replaces them with a lighter GSAP/Tailwind page plus a new `/projects` route. The direction is right — the content is now AI-engineering-oriented and the heavy 3D is gone — but the **page structure, visual language and several pieces of copy are still the template's**, and the new, stronger content has been added *around* the old layout rather than reshaping it.

**What is working:** a clear job title in the `<title>`; a technically credible Experience section; real project links for three products; a sensible modern stack; lint is clean; the main bundle is moderate (≈ 205 KiB gzip, [V] from existing `dist/`).

**What is not:** the page reads as a template with new text pasted in. Positioning is generic ("Transforming Ideas into Real Projects that Deliver Experiences"); evidence is diluted by unverifiable metrics and self-authored-looking reviews; projects are shallow cards; the best AI work is hidden; mobile has no navigation; there is no About, no résumé link, no case studies; SEO basics (canonical, absolute OG image, sitemap, per-route meta) are incomplete; and ≈ 21 MiB of images are used.

**Recommended approach:** a focused refactor in seven workstreams (§17), not a rewrite. The dependency stack, routing skeleton and data-driven `constants` can all stay; the section set, design tokens, content and project architecture change.

---

# 2. Repository and Environment Findings

## 2.1 Stack [V]

| Area | Finding |
|---|---|
| Framework | React 19 (`react@^19.0.0`), Vite 6, plain JS/JSX (no TypeScript) |
| Routing | `react-router-dom@^7.18.1`, `BrowserRouter` client-side only ([App.jsx](../src/App.jsx)) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`; one global stylesheet [`src/index.css`](../src/index.css) (649 lines) mixing Tailwind `@theme`, `@layer components` BEM-like nested rules, raw CSS, and a full unused shadcn token set |
| Animation | GSAP + ScrollTrigger + `@gsap/react`; `framer-motion` (used in one file, [Skills.jsx](../src/sections/Skills.jsx)); `ogl` (WebGL, [LightRays.jsx](../src/components/LightRays.jsx), 399 lines); canvas 2D ([FuzzyText.jsx](../src/components/FuzzyText.jsx), 172 lines); CSS keyframes (word slider, marquee) |
| Icons | `lucide-react` (8 files), `react-icons` (Skills only), plus PNG/SVG in `public/images` |
| Forms | `@emailjs/browser` (client-side); env vars `VITE_APP_EMAILJS_*`; no `.env.example` |
| Hosting config | None found (`vercel.json`, `netlify.toml`, `_redirects` all absent) [V]. SPA deep-link fallback for `/projects` is therefore host-dependent [?] |
| Lint | `eslint .` → exit 0, no output [V] |
| Tests | None |
| Docs | `README.md` is the unmodified JavaScript Mastery tutorial README (Three.js tutorial, YouTube banner, Discord ad) — describes a project that no longer exists |

## 2.2 Working-tree state — important [V]

- `git status` shows **76 changed paths**: 16 modified, 7 untracked (new `src/pages/`, `ProjectCard`, `ScrollToTop`, `public/robots.txt`, `public/images/projects/`, `public/images/logos/monkstack.png`, stray `monkstack-logo.png` at repo root), and ~53 deleted tracked files (the whole 3D layer plus template images).
- **`HEAD` still contains the old 3D template.** Everything described in this report exists only in the uncommitted working tree. If the working tree is lost, so is the new site. Recommend committing a checkpoint before any refactor starts (not done here — audit is read-only).
- Empty stray directory `.dist/`; stray `monkstack-logo.png` at repo root (duplicate of `public/images/logos/monkstack.png`).
- `src/components.json` and root `components.json` — shadcn CLI config, unused (no `src/components/ui/`).

## 2.3 Dependency usage [V]

| Dependency | Used? | Note |
|---|---|---|
| `react-responsive` | **No** (zero imports) | Remove |
| `class-variance-authority` | **No** | Remove (only shadcn-related) |
| `tw-animate-css` | **No** (imported in CSS only: `@import "tw-animate-css"`, no animate-* utilities from it detected in use) | Verify then remove |
| `clsx`, `tailwind-merge` | Only via `src/lib/utils.js` `cn()`, which nothing imports | Remove or start using `cn()` deliberately |
| `framer-motion` | 1 file (Skills) | Duplicates GSAP's role; ≈ 50–100 KiB for one fade-in. Replace with GSAP/CSS |
| `react-icons` | 1 file (Skills) | Mixed with `lucide-react`; consolidate to one icon system |
| `ogl` | 1 file | Only for the hero light rays; heavy for a decorative effect |

## 2.4 Available tooling / skills in this environment [V]

See §15 for details. In short: no frontend-design, UI-audit, or accessibility skill is installed. The only third-party plugin is `seo-skills@seranking` v2.10.4 (installed 2026-10-18), whose SE Ranking MCP server **requires authentication that cannot be completed in this non-interactive session**. A Chrome browser MCP was exposed at the start of the session but **disconnected before any page could be inspected**.

---

# 3. Current Website Structure and Page Inventory

## 3.1 Routes [V] ([App.jsx:16-19](../src/App.jsx#L16-L19))

| Route | Component | Notes |
|---|---|---|
| `/` | `pages/Home.jsx` | 10 stacked sections |
| `/projects` | `pages/ProjectsPage.jsx` (lazy) | Filter + alternating full-viewport project rows |
| `*` | **none** | No 404 route — unknown paths render `NavBar` + empty content + `Footer` |

Persistent: `NavBar` (fixed), `ScrollToTop`, `Footer`.

## 3.2 Home page section inventory [V]

Order from [Home.jsx](../src/pages/Home.jsx):

| # | Section | File | Anchor | In nav? |
|---|---|---|---|---|
| 1 | Hero (+ stat counters inside it) | `sections/Hero.jsx`, `components/AnimatedCounter.jsx` | `#hero`, `#counter` | Logo link only |
| – | ScrollHint (fixed idle popup, 10 s) | `components/ScrollHint.jsx` | – | – |
| 2 | Projects showcase (3 featured) | `sections/ShowcaseSection.jsx` | `#work` | "Work" **and** "Projects" (duplicate intents) |
| 3 | Soft-skills marquee | `sections/LogoShowcase.jsx` | – | – |
| 4 | Ability cards (4) | `sections/FeatureCards.jsx` | – | – |
| 5 | Experience timeline | `sections/Experience.jsx` | `#experience` | Yes |
| 6 | Skills (30 icons) | `sections/Skills.jsx` | `#skills` | Yes |
| 7 | Testimonials (8) | `sections/Testimonials.jsx` | `#testimonials` | Yes |
| 8 | Zyntrix (agency promo) | `sections/Zyntrix.jsx` | `#zyntrix` | **No** |
| 9 | Contact | `sections/Contact.jsx` | `#contact` | "Contact me" button |
| – | Footer | `sections/Footer.jsx` | – | – |

There is **no About section, no résumé/CV link, no location/availability statement for full-time roles, no writing/blog**.

## 3.3 Component inventory [V]

| Component | Role | Used by | Comment |
|---|---|---|---|
| `NavBar` | Fixed nav, hidden until hero anim fires | `App` | No mobile menu; 3 s opacity-0 on direct `/projects` load (§13) |
| `Button` | "See My Work" CTA | `Hero` | `<a>` with no `href` — not keyboard-focusable; scrolls to `#counter` (the stats), not the projects |
| `TitleHeader` | Pill + `h1` | 5 sections | The repeated section intro |
| `GlowCard` | Review card with 5 stars + mouse-angle border glow | `Experience`, `Testimonials` | Reused for two unrelated purposes; `imgPath` data never rendered |
| `AnimatedCounter` | 4 stat tiles | `Hero` | Unsupported claims |
| `ProjectCard` | Full-viewport alternating project row | `ProjectsPage` | `min-h-screen` per project |
| `ScrollHint` | Idle "Scroll down" popup | `Home` | Listens to 6 global event types |
| `LightRays` | WebGL hero background | `Hero` | `ogl`, ≈ 400 lines |
| `FuzzyText` | Canvas-rendered "Zyntrix" | `Zyntrix` | Canvas without accessible text alternative |
| `ScrollToTop` | Route/hash scroll handling | `App` | Good |

## 3.4 Content data [V] ([constants/index.js](../src/constants/index.js))

`navLinks`, `words` (hero slider, 8 entries = 4 duplicated), `counterItems`, `projects` (7), `expCards` (4 incl. education), `testimonials` (8). Reasonable pattern (content separate from layout) — but **styling is embedded in content** (tech `color` classes per tech per project, lines 55-195) and some fields are dead (`expCards[].imgPath`, `testimonials[].imgPath`).

---

# 4. Content and Personal Branding Audit

## 4.1 Positioning

**What the page says today**

- `<title>`: "Vansh Ahuja — AI Engineer & Full-Stack Developer" [V] — accurate and good.
- Hero h1: "Transforming [Ideas | Concepts | Designs | Code] into Real Projects that Deliver Experiences" ([Hero.jsx:65-87](../src/sections/Hero.jsx#L65-L87)) [V].
- Hero sub: "I'm Vansh, an AI Engineer & full-stack developer turning ideas into intelligent, scalable products." ([Hero.jsx:91](../src/sections/Hero.jsx#L91)) [V].

**Assessment [R]**

- The headline says nothing a recruiter can act on. "Transforming X into Real Projects that Deliver Experiences" could be on any of ten thousand portfolios; "Ideas / Concepts / Designs / Code" are not what an AI engineer is hired for. The word slider is pure decoration and its `<img alt="person">` ([Hero.jsx:77](../src/sections/Hero.jsx#L77)) is incorrect alt text for what are idea/concept/design/code icons.
- The *job title* is the only specific thing, and it is in the small sub-line.
- "Intelligent, scalable products" is a buzzword pair with no proof attached. The page never says **what kind** of AI engineering (agents/tool-calling, RAG, document/vision pipelines, LLM infra) — which is precisely what your Experience and projects demonstrate.

**Recommended positioning (grounded in the repo)**

> AI engineer who builds production LLM systems — tool-calling agents with approval gating, RAG/semantic search, and document-to-structure pipelines — plus the multi-tenant backends and cloud deployments they run on (Python/FastAPI, Node/TypeScript, PostgreSQL/pgvector, AWS/Azure).

Why this and not "full-stack developer first": the strongest, most differentiated, most recent evidence (Monkstack, Atomic Player, AI Shopping Assistant, AI 3D Renderer) is AI + backend. Full-stack (Qruzine, SHRM) is supporting breadth. The second paragraph of the hero can say "Also ships full-stack products end to end" without leading with it.

**Example hero options** (illustrative — do not use any figure you cannot defend):

| Option | Headline | Supporting line |
|---|---|---|
| A (direct) | "I build production AI systems — and the backends they run on." | "AI engineer at Monkstack Solutions. LLM tool-calling, RAG, and document-to-3D pipelines on AWS/Azure." |
| B (outcome) | "AI features that work in production, not just in a demo." | "Agent tooling with approval gates, retrieval over 5,000+ product variants, a blueprint-to-3D pipeline that cut LLM calls by 70%." *(self-reported on your own site — confirm you're comfortable citing these)* |
| C (plain) | "Vansh Ahuja — AI engineer." | One sentence of what, one sentence of where, then three project links. |

Recommendation: A or C for the headline (restrained), with one proof line beneath it taken from B.

## 4.2 Writing quality

| Location | Current text | Issue | Direction |
|---|---|---|---|
| Hero h1 | "Transforming Ideas into Real Projects that Deliver Experiences" | Generic; "Real Projects" implies others are fake; "Deliver Experiences" is filler | See §4.1 |
| Hero sub | "turning ideas into intelligent, scalable products" | Buzzwords; no proof | Name the domain |
| Projects intro ([ShowcaseSection.jsx:51-54](../src/sections/ShowcaseSection.jsx#L51-L54)) | "A selection of digital products I've designed and built with a focus on reliability, performance, and user experience." | Says nothing; any developer could claim it | "Three projects where the AI part was the hard part." (then show them) |
| Feature card 1 | "Building responsive, scalable web apps end-to-end — from pixel-perfect UI to robust backend APIs." | Stacked adjectives ("responsive, scalable, pixel-perfect, robust") | Cut the whole card (content is covered in Experience) |
| Feature card 4 | "Bridging ideas and execution through honest communication and a shared vision for success." | Pure filler | Remove |
| Skills heading | "How I Can Contribute & My Key Skills" / "What I Bring to the Table" | Cliché | "Stack" or fold into prose |
| Testimonials | "What People Say About Me?" / "Customer feedback highlights" | Grammar (“?” in a statement heading) and "Customer feedback" for colleagues | Remove or rewrite |
| Contact heading | "Get in Touch – Let's Connect" / "Have questions or ideas? Let's talk!" | Redundant, exclamation | "Contact" + one line about what to email you about |
| Contact CTA card | "Let's Build Something Amazing" … "be part of your visions" ([Contact.jsx:194-198](../src/sections/Contact.jsx#L194-L198)) | AI-sounding ("amazing", "visions"); two paragraphs of nothing | One sentence: roles you're open to, expected reply time you can honour |
| Qruzine description ([constants:52](../src/constants/index.js#L52)) | "comprehensive … transforms the dining experience … Built for enterprise-scale reliability … seamless … intuitive" | Marketing language; "enterprise-scale" unsupported | Describe the system: ordering flow, roles, payment integration, what you built |
| Zyntrix ([Zyntrix.jsx:10](../src/sections/Zyntrix.jsx#L10)) | "the complete digital solution a small to medium-sized business needs to grow reach, strengthen relationships, and turn visitors into loyal customers" | Agency boilerplate; and addressed to a different audience than the rest of the page | One line: "Zyntrix — a small web & app studio I run. zyntrix.in" |
| Experience bullets (Monkstack) | "Engineered an optimized blueprint-to-3D pipeline combining deterministic Python vector parsing … cutting LLM calls by 70%, processing time from 6 min to 90 sec …" | **Best copy on the site.** Slightly dense (single 60-word sentence); good evidence | Keep substance; split into problem / approach / result when moved into case studies |
| Experience bullets (Digital2Days) | "Gained hands-on experience in real-world software development workflows." | Filler; says nothing | Cut to the single most concrete bullet or collapse the internship to one line |

**Repeated phrases [V]:** "scalable" (hero, Qruzine, AI card, GatherrGo, Contact), "seamless/seamlessly" (Qruzine, Feature card 4), "real-time" (Qruzine, shopping), "end-to-end" (Feature card 1, SHRM, GatherrGo, Atomic).

**Date/number inconsistency [V]:** Counter says "**1+** Years of Experience", yet your timeline runs from June 2024 (internship) → Oct 2026, i.e. ≈ 2 years 4 months including the internship, ≈ 1 year 7 months full-time (Mar 2025 →). Either way "1+" undersells you and conflicts with your own timeline.

## 4.3 Professional credibility

**Currently the site mostly *lists* technology.** 30 icon "skills", ~45 tech pills across 7 projects, and a soft-skills marquee. It rarely explains a problem, a decision or a trade-off. The exceptions are the Monkstack bullets and the Atomic Player / GatherrGo paragraphs.

### Claims without evidence on the page [V]

| Claim | Location | Status |
|---|---|---|
| 12+ completed projects | `counterItems` | Site shows 7 |
| 50+ satisfied clients/users | `counterItems` | No evidence; ambiguous "clients / users" |
| 90% project success rate | `counterItems` | Undefined metric; very hard to defend in an interview |
| Used by 10+ restaurants / 500+ customers daily | Qruzine `stats` | [?] Needs evidence (analytics, client names, or reframed as "deployed for N restaurants") |
| Used by 2 organizations managing 200+ employees | SHRM `stats` | [?]; live link is `shrm-temp-wf5b.vercel.app/landing` — a temporary-looking URL |
| Used by 5+ doctors / 100+ consultations | AI Medical `stats` | [?] Medical context raises the stakes on any unverifiable claim; GitHub repo owner is `ShikharPandey123` (also listed as a colleague testimonial) so your contribution isn't clear |
| Third-person "reviews" on each experience card | `expCards[].review` | These read as self-written (they are not attributed to anyone and appear on the *degree* card too) |
| 8 testimonials | `testimonials` | Generic, no company/role/link; avatars (`imgPath`) are defined but never rendered; 5 stars on every one |

### What to emphasise / reduce / consolidate / remove [R]

| Action | Content |
|---|---|
| **Emphasise** | Monkstack bullets; Atomic Player tool registry + approval gating + model routing; GatherrGo containerised AWS architecture; multi-tenant RLS + SSE/Redis Streams; RAG pipeline details |
| **Reduce** | Tech lists (limit to the 4–6 that mattered per project, as plain text); Skills (group by what you use daily; no icons required); education to one line |
| **Consolidate** | "Work" + "Projects" nav items; Feature cards + Skills + Zyntrix capabilities into one short "What I do" statement |
| **Remove** | Counters, self-reviews, 5-star icons, soft-skills marquee, "Quick Response" pills |

### Evidence to add [R]/[?]

- For each AI project: the problem, the design decision that mattered, one trade-off, one result (only if you can stand behind the number), and one "what I'd change".
- For Monkstack work: whether you may show screenshots/GIFs (NDA / employer permission). The existing 14.7 MB GIF suggests yes, but confirm.
- Who the testimonial authors are, and whether they've agreed to be quoted. Prefer 2–3 real quotes with name, role, company and a LinkedIn link over 8 anonymous lines.

---

# 5. Recommended Homepage Structure

## 5.1 Section-by-section assessment of the current homepage

| # | Section | Current purpose | Works | Doesn't work | Verdict | Replacement |
|---|---|---|---|---|---|---|
| 1 | **Hero** ([Hero.jsx](../src/sections/Hero.jsx)) | Introduce + CTA | Staggered text intro is simple; role stated | Generic three-line h1 with a rotating word slider; centered layout; WebGL light rays + word slider + counters = three competing effects; CTA scrolls to stats not work; `Button` is a non-focusable `<a>`; three `<h1>`s | **Redesign** | Left-aligned positioning statement, one proof line, 2 CTAs (case studies, contact), résumé link |
| 1b | **Counters** ([AnimatedCounter.jsx](../src/components/AnimatedCounter.jsx)) | Social proof | Count-up animation works technically | Unsupported claims; "1+" years contradicts timeline; zinc tiles | **Remove** | Replace with one plain factual line of employer/role if desired |
| – | **ScrollHint** | Idle nudge | – | Fixed popup after 10 s idle, 6 global listeners, "Scroll down" on a page that visibly scrolls | **Remove** | – |
| 2 | **Showcase** ([ShowcaseSection.jsx](../src/sections/ShowcaseSection.jsx)) | Featured projects | One large + two small layout has a hierarchy; link to `/projects` | Features the wrong 3 projects; ≈ 3.9 MB eager images; links are only revealed on **hover** (inaccessible on touch/keyboard); markup for large vs small duplicated (≈ 90 lines); leftover refs `rydeRef/libraryRef/aiMedicalRef` from old template; `h1` heading | **Redesign** | "Selected work": 3 AI case-study entries linking to `/projects/:slug` |
| 3 | **Soft-skills marquee** ([LogoShowcase.jsx](../src/sections/LogoShowcase.jsx)) | Decorative | – | 12 soft skills with icons is the canonical template filler; infinite animation with no reduced-motion handling; no meaning | **Remove** | – |
| 4 | **Feature cards** ([FeatureCards.jsx](../src/sections/FeatureCards.jsx)) | Capabilities | Short | Four identical rounded cards with icon-in-circle; copy is generic; one card is "Seamless Collaboration" | **Merge → "What I do" prose** | 3–4 short lines (no cards/icons) or fold into hero sub-copy |
| 5 | **Experience** ([Experience.jsx](../src/sections/Experience.jsx)) | Career | Strong Monkstack content; chronological; logo per role | Card + timeline layout depends on `xl:left-[35.5vw]` magic number ([index.css:277](../src/index.css#L277)); each role renders its own timeline line; self-review card with stars; `h1` per job; every role has 2–4 long bullets at `text-lg`; education shown as a job | **Keep, restructure** | Compact list: role · company · dates · 2–3 bullets; education as one line; link Monkstack bullets to case studies |
| 6 | **Skills** ([Skills.jsx](../src/sections/Skills.jsx)) | Tech inventory | Grouped (AI / Cloud / Stack) — grouping is right | 30 items, each `text-5xl` icon + `text-xl` label (visually the loudest thing on the page); staggered 0.1 s delay up to ~1.1 s; some skills unevidenced on the site (LLM Evaluation, Azure Service Bus, Function Apps, Blob Storage, Flask, CI/CD) | **Reduce + move** | Three short text lines ("AI: …", "Backend/Cloud: …", "Languages: …"); mark only what you can discuss in depth |
| 7 | **Testimonials** ([Testimonials.jsx](../src/sections/Testimonials.jsx)) | Social proof | – | See §4.3: generic, unattributed, 5 stars each; 3 visible on mobile, 8 on desktop in a 4-column CSS-columns masonry | **Remove / replace** | 2–3 real, attributed quotes inline in Experience, or omit |
| 8 | **Zyntrix** ([Zyntrix.jsx](../src/sections/Zyntrix.jsx)) | Promote your agency | Shows initiative; real link | Full-viewport section with canvas-rendered "FuzzyText" at 7 rem; agency boilerplate speaks to SMB clients while the page otherwise targets employers; "Building" pill; not in nav | **Reduce** | One line in the footer or in "About": "I also run Zyntrix, a small studio — zyntrix.in" (decide whether freelance clients are a target audience, §18) |
| 9 | **Contact** ([Contact.jsx](../src/sections/Contact.jsx)) | Convert | Working form; direct email/social links | Redundant intro; two cards + three pills + availability card; "Currently Available — Open for freelance projects" conflicts with a full-time AI role; 4 identical contact tiles with `hover:scale-105`; form is a ~1:1 clone of template | **Simplify** | Email (copyable), LinkedIn, GitHub, résumé; form optional/secondary |
| – | **Footer** | Legal/social | Social links | "Terms & Conditions" is plain text with `cursor-pointer` and no destination | **Fix** | Copyright + 3 links; drop T&C |

## 5.2 Proposed homepage order [R]

1. **Hero / positioning** — who you are, what you build, one proof point, primary actions.
2. **Selected work** — three AI case studies, each with a real visual, one-sentence problem, one result, link to the case study.
3. **How I work / what I do** — 3–4 plain sentences (no cards): LLM tool-calling & RAG; backend & infra; shipping full-stack products; what kind of roles you want.
4. **Experience** — compact timeline, 2–3 bullets per role, links into case studies.
5. **Contact / hiring CTA** — email, LinkedIn, GitHub, résumé; short form optional.

*(Optional, only if you want a client audience: a single "Also: Zyntrix" line.)*

### Above the fold
Name + role, the positioning statement, the one-line proof, two actions ("Read case studies" → `#work`, "Email me" / "Résumé"). No counters, no rotating words, no WebGL required to read it. The nav must be visible and reachable on mobile.

### While scrolling
Work first (it's what a reviewer came for), then proof of seniority (experience), then a clear next step. Each section should end with a forward link: case studies → experience → contact.

### What guides visitors
- Hero CTA → `#work`
- Work → `/projects/:slug` (and "All projects" → `/projects`)
- Experience → relevant case studies
- Persistent nav → Work · Projects · Experience · Contact (+ Résumé)

### Which projects get homepage visibility
AI 3D Renderer, Atomic Player, AI Shopping Assistant (rationale in §6). Qruzine, GatherrGo, SHRM, AI Medical Docs live on `/projects`.

### What belongs on dedicated pages
All project detail; full experience bullets beyond 2–3 lines; skills matrix (if kept) — an `/about` page is optional.

## 5.3 Homepage wireframe (text)

```
┌─────────────────────────────────────────────────────────────┐
│ Vansh Ahuja          Work  Projects  Experience  Contact  ☰ │  ← nav; ☰ below lg
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AI engineer                                   (mono label) │
│                                                             │
│  I build production AI systems —                            │
│  and the backends they run on.                              │  ← display heading
│                                                             │
│  LLM tool-calling, RAG and document-to-3D pipelines on      │
│  AWS and Azure. Currently at Monkstack Solutions.           │  ← 1–2 lines max
│                                                             │
│  [ Read case studies ↓ ]   Email  ·  Résumé  ·  GitHub      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ SELECTED WORK                                        01–03  │  ← mono section label
│                                                             │
│ ┌──────────────┐  Blueprint-to-3D pipeline        2026     │
│ │  visual /    │  Floor-plan PDFs → navigable 3D models.     │
│ │  diagram     │  Hybrid deterministic + LLM parsing.        │
│ └──────────────┘  70% fewer LLM calls · 6 min → 90 s         │
│                   Read case study →                         │
│ ─────────────────────────────────────────────────────────── │
│  (repeat: Atomic Player AI assistant, AI Shopping Assistant)│
│                                                             │
│  All projects →                                             │
├─────────────────────────────────────────────────────────────┤
│ WHAT I DO                                                   │
│  3–4 short paragraphs / lines. No cards, no icons.          │
├─────────────────────────────────────────────────────────────┤
│ EXPERIENCE                                                  │
│  2026–   AI Engineer · Monkstack Solutions                  │
│          • 2–3 bullets                       → case studies │
│  2025–26 Software Developer · One Aim IT Solutions          │
│  2024–25 Software Developer Intern · Digital2Days           │
│  2021–25 B.Tech CSE · Graphic Era Hill University           │
├─────────────────────────────────────────────────────────────┤
│ CONTACT                                                     │
│  vanshahuja318@gmail.com   LinkedIn   GitHub   Résumé (PDF) │
│  (optional compact form)                                    │
├─────────────────────────────────────────────────────────────┤
│ © 2026 Vansh Ahuja                   GitHub · LinkedIn      │
└─────────────────────────────────────────────────────────────┘
```

---

# 6. Project Inventory and Prioritization

All 7 projects from [constants/index.js:43-197](../src/constants/index.js#L43-L197). Source repos for the projects are **not in this workspace** and were not inspected; "contribution" below is only what the site itself states [?].

| # | Project | What it does (per site) | Evidence on site | Links | Image | Contribution stated | AI-eng relevance | Currently | Recommendation |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **AI 3D Renderer** (`ai-3d-renderer`) | Floor-plan → interactive 3D model using vision ML | None in project entry; **numbers live in Monkstack bullet** (70% fewer LLM calls, 6 min → 90 s, < $0.50/drawing) | none | 14.7 MB GIF | Implied via Experience ("Engineered…") | **Very high** | Not featured | **Feature + full case study**; compress media; reconcile with Monkstack bullet so the two aren't presented as unrelated |
| 2 | **Atomic Player** (`atomic-player`) | Video analytics SaaS with LLM workspace assistant microservice; tool registry, approval gating, dynamic model routing, streaming | "21 read-only tools + 7 approval-gated action tools"; "dynamic model routing" | none | **none** | Not stated (who built what?) [?] | **Very high** | Not featured; blank placeholder | **Feature + full case study**; needs diagram/screenshot; clarify employer/role and whether it can be shown |
| 3 | **AI Shopping Assistant** (`ai-shopping-assistant`) | RAG shopping assistant: variant descriptions → embeddings → pgvector; GPT-4.1 tool calling via MCP; chat checkout | Numbers are in the Monkstack bullet (5,000+ variants, Azure Container Apps); project entry has `stats: []` | none | 3.8 MB GIF | Via Experience | **Very high** | Not featured | **Feature + full case study**; merge the project entry's vague copy ("understands what customers really want") with the technical bullet |
| 4 | **GatherrGo** (`gatherrgo`) | Group travel/social events platform; you built the backend | Architecture described (Docker/EC2/ALB/ECR/CloudFront/RDS); no usage numbers | none | **none** | **Explicit: "I designed and built the end-to-end backend"** | High (backend/infra), low (AI) | Not featured; blank placeholder | **Short project page** with an architecture diagram; good evidence of ownership |
| 5 | **Qruzine** (`qruzine`) | QR-based restaurant ordering | Usage claims (unverified); real live site + repo | live + GitHub | 1.7 MB PNG (`heroo.png` — generic name, probably a hero screenshot) | Not stated | Medium (product, not AI) | **Featured (main slot)** | Keep as a **short project page**; replace marketing copy with what you built; evidence for the traffic claims or remove |
| 6 | **SHRM** (`shrm`) | HRMS: hiring, onboarding, performance | Usage claim (unverified) | Vercel preview URL + GitHub | 795 KB | Not stated | Low | **Featured** | **Demote** to `/projects` secondary list; confirm the live URL is the production one; description is generic |
| 7 | **AI Medical Documentation** (`ai-medical-documentation`) | Records doctor-patient conversations, OpenAI summaries | Usage claims (unverified) | live (saramedico.com) + GitHub (repo owned by another account) | 1.35 MB PNG | **Unclear** | High (LLM + audio/WebSocket), but medical domain | **Featured** | Keep secondary; **clarify your contribution**; reconsider claims given the medical context; confirm domain ownership/permissions [?] |

### Observations

- **Misalignment [V]:** the three featured projects are items 5, 6, 7 — the three with the weakest fit to the "AI Engineer" positioning *except* #7. The three with the strongest fit are not featured.
- **Duplication [V]:** projects #1 and #3 are *the same work* as two Monkstack bullets. Presenting them once in Experience and again in Projects without cross-linking looks like padding; presenting them once each with links in both directions looks like depth.
- **Consistency problem [V]:** the data model makes some projects "rich" (stats, links, image) and others empty; the UI hides the gaps with a gradient placeholder instead of treating "no screenshots (private/NDA)" as a designed state.
- **Category filter [V]:** only two values ("AI" and "Full-Stack"), with 7 projects. A filter for 7 items is unnecessary (§7).
- **Category tag misuse [V]:** GatherrGo and Atomic Player are both partly "AI + Full-Stack/Backend" but are forced into one bucket each.

### Priority order

1. AI 3D Renderer · 2. Atomic Player · 3. AI Shopping Assistant · 4. GatherrGo · 5. Qruzine · 6. AI Medical Docs · 7. SHRM

---

# 7. Recommended Projects Listing Page (`/projects`)

## 7.1 Current state [V]

- `ProjectsPage` ([ProjectsPage.jsx](../src/pages/ProjectsPage.jsx)): h1-style "All Projects" header + pill filter ("All / AI / Full-Stack") + one `ProjectCard` per project, each `min-h-screen`, alternating image left/right, with GSAP fade-in.
- Effect: **7 near-full-screen rows = ~7 screens of scrolling** to see the portfolio, with a category badge on every image, ~5–7 coloured tech pills per project, and two buttons. Visual density is low; comparison between projects is hard; the three best projects (AI) are in positions 4–7 in data order behind the three weakest.
- Title/description set via `document.title` and a manual `<meta>` mutation in `useEffect` ([ProjectsPage.jsx:18-32](../src/pages/ProjectsPage.jsx#L18-L32)) — invisible to link-preview crawlers.

## 7.2 Recommended shape [R]

**An index, not a gallery.** One compact row per project, scannable on a single screen or two, linking to the case study or detail page.

**Page intro:** one sentence ("Selected systems I've built. Case studies first; older and smaller projects below.").

**Structure:**

1. **Case studies** (3) — larger entries: visual, title, one-line problem, one result/fact, year, role, link.
2. **Other projects** (4) — table-like rows: title · one-line description · stack (plain text) · year · links. No images required.

**Filters:** drop them. Seven items don't need filtering; the two sections above already create hierarchy. If the list grows past ~12, add a simple "AI / Full-stack" toggle then.

**Metadata per entry (and only this):** title, one-sentence summary, year, role, 3–5 stack words (plain text), status (Live / Private / Archived), link to case study. Drop category badges, colour-coded pills, and green bullet "stats" unless you can substantiate them.

**Previews/images:** one purposeful image per project (UI screenshot or architecture diagram), consistent aspect ratio (e.g. 16:10), compressed (< 200 KB, WebP/AVIF; short MP4/WebM instead of GIF).

**Discoverability:** the whole row is the link (with visible focus state); external links (live/GitHub) appear *inside* the case study.

## 7.3 Wireframe (text)

```
Projects
Selected systems I've built. Case studies first.

CASE STUDIES
──────────────────────────────────────────────────────────────
[ visual ]   Blueprint-to-3D pipeline                    2026
             Floor-plan PDFs → navigable 3D models.
             Python · FastAPI · AWS Bedrock · Postgres
             Private (Monkstack Solutions)     Read →
──────────────────────────────────────────────────────────────
[ visual ]   Atomic Player — AI workspace assistant      2025–26
             …
──────────────────────────────────────────────────────────────
[ visual ]   AI Shopping Assistant                       2026
             …

OTHER PROJECTS
──────────────────────────────────────────────────────────────
GatherrGo        Group-travel platform backend    Node · AWS       2025   →
Qruzine          QR ordering for restaurants      Next.js · Mongo  2025   Live ↗
AI Medical Docs  …                                                      Live ↗
SHRM             …                                                      Live ↗
──────────────────────────────────────────────────────────────
```

**On this page only:** summaries and metadata.
**Exclusively on case-study pages:** problem, decisions, architecture, trade-offs, results, learnings, diagrams, long descriptions, external links.

---

# 8. Case Study Strategy and Page Structures

## 8.1 Which projects get what

| Level | Projects | Length |
|---|---|---|
| **Full case study** | AI 3D Renderer · Atomic Player · AI Shopping Assistant | 800–1,500 words + 2–4 visuals |
| **Short project page** | GatherrGo · Qruzine | 250–500 words + 1–2 visuals |
| **Index entry only** | SHRM · AI Medical Docs (promote only if you can document your contribution) | 1–2 sentences |

Route proposal: `/projects/:slug` (reuse the existing `slug` field in `projects`). The data model needs to move beyond a flat card record (§14) — either MDX-like content modules or structured objects with a `sections` array.

## 8.2 Reusable case-study system [R]

A single `CaseStudyLayout` with **optional** blocks, so each page tells its own story rather than filling the same boxes:

| Block | Required? | Notes |
|---|---|---|
| Header (title, one-line summary, year, role, stack, status, links) | Always | The same compact metadata strip on every page |
| Context & problem | Always | 2–4 sentences; who is the user, what was failing |
| My role & constraints | Always | What *you* built vs team; constraints (latency, cost, tenancy) |
| Approach / architecture (+ diagram) | Full only | One diagram, not a gallery |
| Key decisions & trade-offs | Full only | 3–5 headed decisions: *options considered → choice → why → cost* |
| Hard problems | Optional | Only where something non-obvious was solved |
| Results | Only with evidence | Metrics you can defend; otherwise omit the section rather than soften it |
| What I'd do differently | Optional (encouraged) | Builds credibility more than any metric |
| Visual evidence | When it exists | Real UI, logs, diagrams; "Private — screenshots withheld" is acceptable and honest |
| Links | When they exist | Live, repo, related post |
| Prev / next | Always | Keeps readers in the portfolio |

**Layout rules:** reading column ≈ 65ch; full-bleed images allowed to break out of the column; sticky mini-TOC on desktop only if page > 4 sections; no decorative cards; diagrams as inline SVG (vector, accessible with `<title>`/`<desc>`).

## 8.3 Section outlines for the three full case studies

Content below uses **only facts already on your site**; items marked [?] must come from you.

### A. Blueprint-to-3D pipeline (AI 3D Renderer)

1. **Problem:** architects/teams need navigable 3D from flat AutoCAD-PDF floor plans without CAD skills. [?] who requested it, what "before" looked like.
2. **Approach:** deterministic Python vector parsing first; LLM (Claude Sonnet 4 on AWS Bedrock) only on targeted tiled crops; wall-graph polygon tracing; Three.js viewer.
3. **Decisions:** why deterministic-first (cost, speed, reproducibility) vs full-LLM; why tiled crops; why wall-graph tracing.
4. **Infra:** multi-tenant FastAPI on Docker/EC2; PostgreSQL row-level security for tenant isolation; cancellable long-running jobs; stage-wise progress via Redis Streams + SSE; per-stage S3 artifacts for debugging/replay.
5. **Results (self-reported):** −70% LLM calls; 6 min → 90 s; < $0.50/drawing. [?] how measured, over what sample.
6. **Visual:** the existing GIF → convert to MP4/WebM; add a pipeline diagram.
7. **Learned / next:** [?]

### B. Atomic Player — AI workspace assistant

1. **Problem:** users of a video-analytics/conversion SaaS need to query data and take workspace actions via natural language, safely.
2. **Approach:** dedicated LLM microservice; structured tool registry + execution harness; 21 read-only tools, 7 action tools with explicit approval gating; dynamic model routing (lightweight vs reasoning models); streaming responses.
3. **Decisions:** why a separate microservice; why approval-gating over autonomous actions; routing criteria and its failure modes; tool-schema design.
4. **Stack:** Node.js/TypeScript, PostgreSQL, Redis, Azure.
5. **Results:** only if you have them (latency, approval rate, cost). Otherwise omit.
6. **Visual:** sequence diagram of a request → routing → tool call → approval → execution. [?] whether UI screenshots may be shown.

### C. AI Shopping Assistant

1. **Problem:** keyword search fails to match shopper intent across thousands of product variants.
2. **Approach:** catalog variants → natural-language descriptions → Azure OpenAI embeddings → pgvector; GPT-4.1 tool calling via MCP; colour/size filters; in-chat checkout; Azure Container Apps.
3. **Decisions:** describe-then-embed vs embedding raw attributes; filter strategy (vector + structured); why MCP.
4. **Scale:** 5,000+ product variants (from Experience bullet).
5. **Results:** [?] relevance evaluation (your skills list mentions "LLM Evaluation"; if you did any, this is where it goes — otherwise remove that skill claim).
6. **Visual:** existing GIF → video; retrieval-flow diagram.

### Short project pages (GatherrGo, Qruzine)

One screen each: context → what I built (bulleted, concrete) → architecture diagram or screenshot → links → next/prev. GatherrGo's AWS diagram (ALB → Dockerized EC2 → RDS, ECR deploys, CloudFront) is a good fit for an inline SVG.

---

# 9. Design System Audit

All findings [V] from source; visual effect of each is [H].

## 9.1 Visual identity

| Aspect | Current | Assessment |
|---|---|---|
| Theme | `html, body { background: black; color: white }` ([index.css:43-51](../src/index.css#L43-L51)); Tailwind tokens `black-50…200`, `white-50` (#d9ecff), `blue-50/100` | A single dark theme is right for an engineer portfolio. Pure `#000` is harsh next to `#0e0e10` cards; consider using `black-100` as page background |
| Accent | **None defined.** Colour comes from: blue light rays (`#0080ff`), indigo/sky/emerald hover gradients (LogoShowcase), a 5-stop rainbow `.gradient-line` (cyan→blue→pink→purple) on the experience timeline, green dots, and ~14 tech-pill hues | Arbitrary accents; no single colour owns "interactive" or "emphasis" |
| Contrast | White/white-50 on black: high. `text-white/60` at `text-xs` on black ≈ 7:1; `text-white-50/70` ok; placeholder `#839cb5` on black ≈ 7:1 | No obvious failures [H — confirm with a contrast checker] |
| Distinctiveness | Template shape (centered hero, pill + h1 per section, card grids) | Low |

**Token name hazard [V]:** `--color-blue-50: #839cb5` and `--color-blue-100: #2d2d38` in `@theme` ([index.css:63-64](../src/index.css#L63-L64)) **override Tailwind's built-in `blue-50` and `blue-100`** (pale blues) with a grey-blue and a dark grey. Any future use of `bg-blue-100` for its usual meaning will be near-black. `black-*` names are also misleading (they aren't black).

## 9.2 Typography

| Aspect | Current [V] |
|---|---|
| Family | Mona Sans variable 200–900 incl. italics, loaded through a CSS `@import url(fonts.googleapis.com…)` at the top of `index.css` (render-blocking chain, no `preconnect`) |
| Scale | Ad hoc per component: hero 36/50 px; `TitleHeader` 30/48 px; project titles 24/30/36 px and `2xl–4xl`; skills `text-5xl` icons with `text-xl` labels; body `text-lg`/`md:text-xl` in places, `text-sm`/`text-xs` for pills |
| Weights | 300?–900 used: `font-semibold`, `font-bold`, `font-medium`; FuzzyText 900 |
| Heading hierarchy | **Broken.** `h1` appears in `Hero` (×3), `TitleHeader` (×1 per section → 4 on `/`), `Experience` (per role → 4), `ShowcaseSection` (1). Real count on `/` = 3 + 4 + 4 + 1 = 12 `h1`s. No `h2`s except card titles |
| Reading width | Body paragraphs are unconstrained inside `md:px-20` containers; Experience bullets at `text-lg` in a 4/6 column; Zyntrix uses `max-w-3xl`. No consistent measure |
| Responsive type | Mix of Tailwind breakpoints (`md:text-xl`) and one `clamp()` (Zyntrix). Fine but unsystematic |

**Recommendation [R]:** keep Mona Sans (self-host, subset weights ~300/400/500/600/700, drop italics if unused); add a mono (JetBrains Mono, Geist Mono or IBM Plex Mono) for labels/metadata; define the type roles in §11.

## 9.3 Spacing and layout [V]

- **Container strategy is inconsistent.** Horizontal padding is applied by at least five different recipes: `.padding-x` (px-5 md:px-10), `.padding-x-lg` (px-5 md:px-20), `.section-padding` (px-5 md:px-10 md:mt-40 mt-20), inline `md:px-20 px-5` / `md:px-10 px-5` inside already-padded sections (Experience, Testimonials, Contact — **double padding**: `section-padding` + inner `md:px-10`), and `.app-showcase` (px-5 md:px-20).
- **No max-width.** Except Zyntrix (`max-w-6xl`) and ProjectCard (`max-w-6xl`) nothing constrains width; on ultra-wide screens text and grids stretch to the viewport edge.
- **`100dvw` everywhere:** `html, body { width: 100dvw }` and `section { width: 100dvw }` ([index.css:43-55](../src/index.css#L43-L55)). `dvw` includes the scrollbar gutter on desktop, producing a few px of horizontal overflow that is then hidden by `overflow-x: hidden` on both `html` and `body`. [H] Likely cause of subtle horizontal-scroll/clipping bugs and of broken `position: sticky`.
- **Vertical rhythm:** section gaps are `md:mt-40 mt-20` (160 / 80 px) except ones with extra `mt-responsive`, `xl:mt-16 mt-12 md:mt-32` (hero), `mt-32` (Experience inner), `mt-16` (Skills/Testimonials/Contact inner), `mt-20` (showcase) — no scale.
- **Magic numbers:** `xl:left-[35.5vw]` timeline ([index.css:277](../src/index.css#L277)), `h-[110%] -top-10` timeline mask, `h-[56px] md:h-[78px]` word slider slot, `xl:h-[70vh]` showcase image, `min-h-screen` per project row.
- **Nested containers:** Experience: `section` → `div.w-full.md:px-20` → `div.mt-32.relative` → `div.relative.z-50` → `div.exp-card-wrapper` → 2 columns → `.timeline-wrapper` → `.expText` → logo + text. 9+ levels for a list of four items; `z-50`, `z-30`, `z-20` layering for a decorative line.

## 9.4 Component system — repetition audit [V]

| Pattern | Occurrences | Verdict |
|---|---|---|
| **Pill/badge** (`rounded-full` chip) | `TitleHeader` per section (5), hero badge on Zyntrix, filter buttons (3), category chip on every ProjectCard, 3 Contact pills, ScrollHint, Hero word icons | Over-used. Keep none as decoration; use pills only for the interactive filter (if kept) |
| **Tech tag** (rounded-md bordered coloured chip) | ~45 across 7 projects ×2 render sites (Showcase + ProjectCard) | Colour is not consistent per technology: MongoDB = green (Qruzine), indigo (SHRM), green (Medical); Next.js = blue-500 / sky-500 / blue-500; Node = emerald every time. Colours carry no meaning → remove colour, render as plain text (e.g., "Python · FastAPI · Postgres") |
| **Card** (`card-border rounded-xl`) | Feature cards (4), counters (4, different `bg-zinc-900 rounded-lg`), GlowCard (12), contact tiles (4), CTA card, availability card, form wrapper | Everything is a bordered rounded rectangle; three different radii (`rounded-lg`, `rounded-xl`, `rounded-2xl`) and two border colours |
| **Icon in circle** | Feature cards, contact tiles, timeline logos, footer socials, hero words | Decorative |
| **Gradient** | rainbow timeline line; hover gradients on soft skills; `from-violet-500/20 … to-sky-500/20` placeholder; `from-white-50/10` CTA card; conic-gradient glow on GlowCard (`.card::before`); LightRays | Five unrelated gradient treatments |
| **Buttons** | `.cta-button` (circle-wipe + arrow), `Link` outlined button (ShowcaseSection), solid white `rounded-lg` (ProjectCard), outlined (ProjectCard), `.contact-btn`, filter pills, hover-overlay buttons (`bg-white/10`) | **Six button styles** and no shared Button component with variants |
| **Section header** | `TitleHeader` (pill + centered `h1`) ×5; Projects uses a different left-aligned header; Skills groups use `h3` | One reusable but wrong pattern; inconsistent with Projects |
| **Hover effect** | `hover:scale-105` (contact tiles, logo), card glow, underline slide, circle-wipe CTA, overlay fade, opacity | Too many; none has a reduced-motion variant |

## 9.5 Existing design tokens [V]

`src/index.css` defines **two unrelated token systems**:

1. The shadcn "slate" set (`--background`, `--primary`, `--border`, `--chart-1…5`, `--sidebar-*`, `.dark {…}`) — ~60 variables, in `:root` and `.dark` ([index.css:7-41, 568-600](../src/index.css#L7-L41)). **Not used by any component** (no shadcn components exist; `.dark` is never applied; the rendered UI uses hard-coded `black-*`/`white-50`/`zinc-900`/`bg-white/5`). The only effect is `@layer base { * { @apply border-border outline-ring/50 } }`, so all borders/outlines inherit a light-mode slate colour.
2. The portfolio's own `@theme` ([index.css:57-65](../src/index.css#L57-L65)): `white-50`, `black-50/100/200`, `blue-50/100`, `font-sans`.

Plus hard-coded hex in components: `#2D3240` (leftover tech-card), `#839CB5`, `#FAF9F6` (timeline logo bg), `#0080ffff` (rays), `#62e0ff/#52aeff/#fd5c79/#6d45ce` (gradient-line), and `bg-zinc-900` (counter).

**Reuse/consolidate/redesign:** reuse the *idea* of `black-100/200` and `white-50` as the starting neutrals (they're sensible); delete the shadcn set unless you intend to adopt shadcn; rename tokens semantically (§11).

---

# 10. Proposed Visual Direction

**Principle:** one voice, one accent, one rule-based system for structure. Make the **content** the visual.

| Dimension | Direction |
|---|---|
| **Personality** | Quiet, precise, technical. Editorial rather than "product marketing". |
| **Theme** | Dark only (no theme toggle needed). Page `#0e0e10` (existing `black-100`), raised surface `#16161a` for the rare container, text `#e8eaed` primary / `#9aa3af` secondary. Avoid pure black/white extremes. |
| **Accent** | **One.** Suggest a single cool hue already close to the current brand (`#d9ecff` / `#0080ff` family): e.g. `#7cc4ff` for links/focus/active; used for text links, focus rings, a single marker on the active nav item. No gradients. |
| **Structure** | Hairline rules (`1px` at ~10% white) and generous whitespace instead of bordered cards. Cards reserved for genuinely distinct objects (e.g., the contact form). |
| **Type** | Mona Sans for headings/body; mono for labels (dates, "SELECTED WORK", stack lines, status). Left-aligned. Display sizes used once (hero). |
| **Imagery** | Real screenshots and diagrams, consistent aspect ratio, sharp corners or a single small radius (4–6 px). |
| **Motion** | Page-load fade/translate of the hero; subtle scroll-reveal for sections; link underline transitions; nothing looping; `prefers-reduced-motion` honoured. |
| **Layout** | 12-col grid, max content width ~1120 px, reading column ~65ch, asymmetric layouts (label column + content column) instead of centered stacks. |

**Why this fits your goals:** hiring managers and engineering leaders reward legibility and specificity; restrained design signals judgement. It also massively reduces the CSS and JS you maintain.

**Not recommended:** glassmorphism, glow, blur, neon gradients, 3D scenes (removed already), additional accent colours, parallax.

---

# 11. Design-Token Recommendations

Proposal only — nothing implemented. Values are examples grounded in the existing palette; adjust after a contrast check.

## 11.1 Color

| Semantic token | Example | Replaces |
|---|---|---|
| `--color-bg` | `#0e0e10` | `body` black, `black-100`, shadcn `--background` |
| `--color-surface` | `#16161a` | `bg-zinc-900`, `bg-white/5`, `black-200` for panels |
| `--color-rule` | `rgb(255 255 255 / 0.10)` | `border-black-50`, `border-white/15`, `border-white/20` |
| `--color-text` | `#e8eaed` | `text-white` |
| `--color-text-muted` | `#9aa3af` | `text-white-50`, `text-white/60`, `white-50/70` |
| `--color-accent` | `#7cc4ff` | rays blue, hover gradients, link colours |
| `--color-focus` | = accent | – |
| `--color-success / --color-danger` | `#4ade80` / `#f87171` | form feedback only |

**Delete** the 60 unused shadcn variables and the `.dark` block; **rename/remove** `blue-50/100` and `black-*`.

## 11.2 Typography

| Token | Example | Role |
|---|---|---|
| `--font-sans` | Mona Sans (self-hosted) | headings/body |
| `--font-mono` | JetBrains Mono / Geist Mono | labels, dates, stack |
| `--text-display` | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` / 1.05 / −0.02em / 600 | Hero (once) |
| `--text-title` | `clamp(2rem, 2.5vw + 1rem, 3rem)` / 1.1 / 600 | Page titles (`h1` on `/projects`, case studies) |
| `--text-heading` | `1.5rem–1.75rem` / 1.2 / 600 | Section headings (`h2`) |
| `--text-subheading` | `1.125rem` / 1.3 / 600 | `h3` |
| `--text-body` | `1rem–1.125rem` / 1.6 / 400 | Body, measure 65ch |
| `--text-caption` | `0.875rem` / 1.5 | Captions |
| `--text-label` | `0.75rem` mono / 1.4 / +0.08em / uppercase | Section labels, metadata |

## 11.3 Spacing and layout

| Token | Example |
|---|---|
| `--space-1…8` | 4, 8, 12, 16, 24, 32, 48, 64 px |
| `--space-section` | `clamp(4rem, 8vw, 8rem)` (replace `mt-20 md:mt-40` and variants) |
| `--gutter` | `clamp(1.25rem, 4vw, 2.5rem)` (single container padding) |
| `--w-content` | `70rem` (≈1120px) |
| `--w-prose` | `65ch` |
| Grid | 12 col, 24px gap ≥ lg; single column < md |

## 11.4 Shape, borders, elevation, motion, breakpoints

| Token | Example |
|---|---|
| `--radius-sm` / `--radius-md` | `4px` / `8px` (drop 10–16 px radii and `rounded-full` except avatars) |
| `--border` | `1px solid var(--color-rule)` |
| `--shadow-*` | None by default (rely on rules); optionally one `--shadow-pop` for menus |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` |
| `--dur-fast / --dur-base / --dur-slow` | 120 / 240 / 480 ms |
| Motion rule | all durations → `0ms` under `prefers-reduced-motion: reduce` |
| Breakpoints | keep Tailwind defaults (sm 640 / md 768 / lg 1024 / xl 1280); **add a mobile menu at < lg** |

In Tailwind v4 these map cleanly onto a single `@theme` block (no `tailwind.config`).

---

# 12. Anti-Generic Design Review

| # | Pattern | What currently exists [V] | Why it weakens | Action | More intentional alternative |
|---|---|---|---|---|---|
| 1 | Centered hero with generic tagline | Centered 3-line `h1` with rotating word, centered sub, centered CTA ([Hero.jsx:62-100](../src/sections/Hero.jsx#L62-L100)) | Looks like the template; says nothing | Redesign | Left-aligned positioning statement with a mono label and one proof line |
| 2 | Pill badges | `TitleHeader` pill above every section; chips on project images, filters, contact pills, hero badge | Makes everything look equally important; no information value | Remove most | Mono uppercase section labels (`SELECTED WORK`) |
| 3 | Identical cards | Feature cards, counters, contact tiles, CTA card, availability card, testimonial cards | Visual monotony; hierarchy lost | Reduce | Rules + whitespace; cards only for the form |
| 4 | Repeated grids across unrelated sections | `.grid-4-cols` for counters and feature cards; 4-col testimonial columns; 4-col skills; 4 contact tiles | Same grid for different content makes sections blur together | Redesign | Different layout per purpose (list for experience, 2-col label/content for "What I do", table for projects) |
| 5 | Gradients/glow/blur | LightRays WebGL; rainbow timeline; conic-gradient `.card::before` glow; hover gradient text on soft skills; `backdrop-blur` chips | Dated "effects" feel; costs CPU/GPU | Remove | Flat colour, hairlines |
| 6 | Excessive rounding | `rounded-full`, `rounded-2xl`, `rounded-xl`, `rounded-lg`, `rounded-md` across components | No system | Reduce | 2 radii max |
| 7 | Decorative icons | Icon-in-circle on 4 feature cards, 12 soft skills, 30 tech skills (`text-5xl`), 4 contact tiles, hero word icons | Icons carry no information beyond label | Remove most | Text labels; keep a logo only where a brand logo aids recognition (e.g., employer) |
| 8 | Arbitrary accent colours | ~14 tech-pill hues; violet/sky/orange/green skill icons; cyan→purple gradient | Colour with no meaning | Remove | Mono text for stack; single accent |
| 9 | Skill meters/percentages | None. **Good.** (But 30 uniform icons is the functional equivalent) | – | Keep absence | – |
| 10 | Unnecessary animation | Word slider (21 s loop), marquee (60 s loop), LightRays WebGL, FuzzyText canvas jitter, count-up counters, `animate-ping` availability dot, bouncing arrow, per-skill stagger, Experience slide-in from −100% | High motion load; no `prefers-reduced-motion` anywhere (0 matches in `src`) | Reduce | 1–2 purposeful transitions; honour reduced motion |
| 11 | Empty section intros | "A selection of digital products… reliability, performance, and user experience"; "What I Bring to the Table"; "Have questions or ideas?" | Filler | Remove/rewrite | Short, specific line or none |
| 12 | Oversized headings w/o hierarchy | `text-5xl` section titles, `text-5xl` skill icons, `text-5xl` counters, 7 rem Zyntrix | Everything shouts | Redesign | One display size (hero), then a clear scale |
| 13 | Empty space without composition | `md:mt-40`, `min-h-screen` per project row, `mt-32` timeline gap; section gaps vary | Large voids; inconsistent rhythm | Redesign | Token-based section spacing |
| 14 | Fake metrics/social proof | 12+/50+/90%; 5-star on every quote and on degree; unattributed "review" strings; testimonial avatars defined but unused | Credibility risk | **Remove** | Verifiable facts only |
| 15 | Template-like layout | Overall: pill+h1, cards, marquee, 4-card features, timeline w/ glow card, skills grid, testimonials wall, contact w/ pills | No identifiable identity | Redesign | §10 |
| 16 | Hover-only information | Project links appear only on hover over the image ([ShowcaseSection.jsx:71-94](../src/sections/ShowcaseSection.jsx#L71-L94)) | Not discoverable on touch; not keyboard accessible | Redesign | Visible text links |
| 17 | "Currently Available" with pulsing dot | [Contact.jsx:216-225](../src/sections/Contact.jsx#L216-L225) | Widely used status theatre; copy conflicts with employed/FT positioning | Remove or make factual | One sentence of what you're open to |

---

# 13. UX, Accessibility, Responsiveness, SEO and Performance Findings

## 13.1 UX

**Confirmed [V]**

- **UX-1 No mobile nav.** `nav.desktop` is `hidden lg:flex`; nothing replaces it (§0 #3).
- **UX-2 Nav duplicates and mismatches.** "Work" (`#work`) and "Projects" (`/projects`) both mean "projects". "Testimonials" is a nav item for a section recommended for removal. "Contact me" is the only CTA. Zyntrix isn't reachable.
- **UX-3 Primary CTA lands on the stats.** "See My Work" runs `Button`'s hard-coded handler that scrolls to `#counter` (the stats tiles), not to the projects ([Button.jsx:13](../src/components/Button.jsx#L13)). The `id` prop only toggles whether to scroll.
- **UX-4 Nav hidden for 3 s on `/projects` direct load.** Nav starts `opacity-0 pointer-events-none` until `heroAnimationComplete` fires (only emitted by `Hero`, which isn't mounted on `/projects`) or a 3 s fallback ([NavBar.jsx:37-40, 53](../src/components/NavBar.jsx#L37-L40)). Direct landing on `/projects` shows no navigation for 3 s.
- **UX-5 Hover-only project links** (Showcase).
- **UX-6 Project rows are not links.** The title/image aren't clickable; only two small buttons are. No internal detail page exists; projects without links (4 of 7) are dead ends.
- **UX-7 No 404 route.** Unknown URL → blank page with nav/footer.
- **UX-8 Missing essentials.** No résumé link, no About, no location, no "what I'm looking for".
- **UX-9 Footer "Terms & Conditions"** is not a link.
- **UX-10 `ScrollHint`** adds six global listeners and a popup after 10 s idle; not needed.
- **UX-11 Projects filter/animation reset.** `useGSAP` re-runs on filter change with scroll-triggered `fromTo(opacity 0, y 60)`; items below the fold are invisible until scrolled. [H] On short lists this can leave content "popping" in unexpectedly.
- **UX-12 Experience reading flow.** Left card (review) before the text that matters; the page's best evidence is in the right column at `text-lg`, 3 bullets × 60 words.

## 13.2 Responsive design

| Item | Finding | Tag |
|---|---|---|
| Mobile nav | Missing (above) | V |
| Hero height | `h-[75vh]` mobile / `md:h-dvh` plus `md:mt-32` and `xl:mt-16`; counters inside hero add `mt-32` on < xl | H |
| Word slider | Fixed slot heights `h-[56px] md:h-[78px]` with `translateY` percentages; breaks if font/line-height change or text wraps | H |
| Experience timeline | `.timeline-wrapper` positions with `xl:left-[35.5vw] md:left-10 left-5`; `.timeline` `w-14 md:w-28`; hard-coded offsets | H — most likely layout defect on md→xl |
| Project showcase images | `object-contain md:object-cover` — different crop behaviour at breakpoints; `xl:h-[70vh]` | H |
| Project rows | Each `min-h-screen`; on phones the image is stacked above the text with large vertical padding | H |
| Horizontal overflow | `100dvw` on html/body/section + `overflow-x: hidden`; `xPercent: -100` initial offset on experience cards | H |
| Touch targets | Footer icons `size-10` (40px) OK; filter pills `px-4 py-2` (~36px tall); hover-only links; nav items rely on hover underline | H |
| Marquee | Absolutely-positioned `.marquee-box` at 200% width inside a `h-48` container with `overflow: hidden` | H |
| Testimonials | `lg:columns-4 md:columns-3 columns-1`, items ≥ 3 `hidden md:block` | V (behaviour), H (look) |

## 13.3 Accessibility

**Confirmed [V]**

| # | Issue | Where |
|---|---|---|
| A1 | **No `<main>` landmark**; no skip link | Whole app (`<main` grep: 0 hits) |
| A2 | **Heading structure broken:** 12 `h1`s on `/`; `h1` inside a `.map()` per job; `h3` used for skill groups with no `h2` | Hero, TitleHeader, Experience, ShowcaseSection |
| A3 | **CTA is an `<a>` without `href`** → not focusable, not announced as a button/link | [Button.jsx:9-28](../src/components/Button.jsx#L9-L28) |
| A4 | **Hover-only controls** (project links) | ShowcaseSection |
| A5 | **No `prefers-reduced-motion` handling anywhere** (0 matches for `prefers-reduced-motion`/`useReducedMotion`/`matchMedia` in `src`) while the page runs infinite marquee, 21 s word slider, WebGL rays, canvas jitter, ping animation, and GSAP scroll animations | Global |
| A6 | **Incorrect/non-descriptive alt text:** hero word icons `alt="person"` ([Hero.jsx:77](../src/sections/Hero.jsx#L77)); timeline logos `alt="logo"` for every employer ([Experience.jsx:123](../src/sections/Experience.jsx#L123)); star images `alt="star"` ×5 per card (60 announcements on the page); nav logo `alt="Logo"`; arrow image `alt="arrow"`; decorative images should have `alt=""` | Multiple |
| A7 | **Canvas text without alternative:** "Zyntrix" heading is rendered inside a `<canvas>` ([FuzzyText.jsx:169](../src/components/FuzzyText.jsx#L169)); screen readers get nothing (the adjacent link has an `aria-label`, the word itself isn't exposed) | Zyntrix |
| A8 | **Focus visibility:** only `focus:border-white-50` on form inputs (with `focus:outline-none`); nav underline is `group-hover` only; no `:focus-visible` styling elsewhere; `@layer base` sets `outline-ring/50` from an unused light-theme token | Global |
| A9 | **Skills/stat meaning conveyed by colour & icon only** (tech pills) — minor | Skills/Cards |
| A10 | **Form:** labels present and associated (good); error/success messages are plain `div`s without `role="alert"`/`aria-live` | Contact |
| A11 | **Footer "Terms & Conditions"** is a `<p>` styled as interactive | Footer |
| A12 | Count-up counter initial DOM text is `0 +`, animated via `innerText`; screen readers can read intermediate/incorrect values | AnimatedCounter |

**Hypotheses [H]:** colour contrast of `text-white/60` and `text-white-50/70` small text, tech-pill text (`text-*-300` on 15% tinted backgrounds), and the nav underline on scroll; tab order through `GlowCard`/marquee.

## 13.4 Performance

**Confirmed [V]** (sizes from `public/` and the existing `dist/` build; no rebuild was performed)

| Item | Finding |
|---|---|
| Main JS | `dist/assets/index-*.js` **616,670 B raw / 210,261 B gzip**; `ProjectsPage` chunk 3.9 KB / 1.7 KB gz (lazy). Mostly GSAP+ScrollTrigger, framer-motion, react-icons (SI/FA), lucide, ogl, emailjs, router |
| CSS | 63 KB raw / 10.6 KB gz |
| Homepage image weight | Featured projects: `heroo.png` 1.76 MB + `ai.png` 1.35 MB + `shrm.png` 0.79 MB = **3.91 MB**, all `<img>` without `loading="lazy"` in `ShowcaseSection` (eager) |
| `/projects` image weight | + `ai-3d-renderer.gif` **14.77 MB** + `ai-shopping.gif` **3.78 MB** → ≈ **22.5 MB** total for 5 images (lazy in `ProjectCard`, but huge once they scroll in) |
| Favicon/OG/logo | `imagee.png` is **213,550 B**, used as favicon, nav logo (rendered 30×30) and `og:image` |
| Other heavy | `gehu.png` 157 KB, `one_aim.png` 105 KB logo PNGs |
| Unreferenced assets | 16 files, ≈ 420 KB (`bg.png`, `fav.png`, `person.png`, `Github.png`, `screen.mp4` 317 KB, `jsm-logo.png`, …) |
| Fonts | `@import url("https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900…")` — CSS-in-CSS import (render-blocking chain, no preconnect, full variable axes + italics) |
| Always-on animation | WebGL rays (rAF loop) starts after the hero animation and keeps running; FuzzyText canvas rAF loop; CSS word slider and marquee loop forever; `ScrollHint` registers 6 listeners; `will-change` + `translateZ(0)` hacks duplicated in CSS (lines 380-386 vs 632-641, 374-378 vs 643-649) |
| No prefetch / code-splitting beyond `/projects` | Hero rays/`ogl`, framer-motion, react-icons are in the main bundle |

**Hypotheses [H]:** LCP is the hero text (fast) unless fonts delay; low-end mobile GPU cost for LightRays; main-thread jank from ScrollTrigger on a 10-section page + Experience's per-update `gsap.to` inside `onUpdate` ([Experience.jsx:55-61](../src/sections/Experience.jsx#L55-L61)). Needs Lighthouse/Performance panel to confirm.

## 13.5 SEO and metadata

| Item | Finding | Tag |
|---|---|---|
| Title/description | Good, specific ([index.html:7-11](../index.html#L7-L11)) | V |
| Rendering | Pure client-side SPA; **no prerender/SSG**. Per-route metadata is set with `document.title` in a `useEffect` ([ProjectsPage.jsx:19-32](../src/pages/ProjectsPage.jsx#L19-L32)), invisible to social-link crawlers and unreliable for others | V |
| `og:image` | **Relative path** `/images/logos/imagee.png` ([index.html:20](../index.html#L20)); OG/Twitter crawlers require absolute URLs; image is a 213 KB logo, not a 1200×630 card; `twitter:card="summary"` | V |
| `og:url`, canonical | Absent (TODO comment in file) | V |
| Favicon | `type="image/svg+xml"` declared for a PNG file | V |
| `robots.txt` | Present; "Allow all"; `Sitemap:` TODO | V |
| Sitemap | None | V |
| Structured data | None (no `Person`/`WebSite` JSON-LD) | V |
| `lang` | `en` set | V |
| 404 handling | None in router; host fallback unknown | V/? |
| `theme-color`, `manifest` | None | V |
| Domain | No live domain configured; every item above depends on choosing one | ? |

## 13.6 Confirmed vs. needs-runtime summary

| Confirmed from source | Needs runtime/visual verification |
|---|---|
| No mobile nav; heading/landmark issues; missing reduced-motion handling; asset sizes; SEO tags; unused deps; unsupported claims; Button is non-focusable | Actual layout at 360/768/1024/1440; horizontal overflow; Experience timeline alignment; marquee behaviour; Lighthouse scores; contrast ratios; real tab order; GPU/CPU cost of effects; whether live project links still work |

---

# 14. Frontend Architecture Review

| Area | Finding [V] | Recommendation [R] |
|---|---|---|
| **Component responsibilities** | Section components own layout, animation, and content; `ShowcaseSection` contains project-card markup duplicated for "main" and "list" variants (~90 lines) while `ProjectCard` re-implements the same card again for `/projects` | One `ProjectEntry` component with `variant` prop; data-driven |
| **Stale identifiers** | `rydeRef`, `libraryRef`, `aiMedicalRef` in `ShowcaseSection` ([lines 13-25](../src/sections/ShowcaseSection.jsx#L13-L25)) are leftovers from the tutorial template; `refs` array is indexed by position and breaks if featured count ≠ 3 (`cards` list is hard-coded to 3 refs, `gsap.fromTo(null,…)` risk if fewer) | Use `gsap.utils.toArray` on a class like `ProjectsPage` does |
| **Content/data** | Styling classes inside data (`tech[].color`); dead fields (`imgPath` in exp/testimonials); `words` has 4 duplicates for the loop; `expCards[0].imgPath` and `logoPath` identical; education modelled as a job with a "review" | Separate content from style; typed content schema (`projects`, `experience`, `education`) |
| **Reusable primitives** | None for Button, Section, Container, Heading, Tag, Link. Six button looks, five padding recipes, `h1` everywhere | Introduce `Container`, `Section`, `Heading(level)`, `Button` (variants), `TextLink`, `Meta` |
| **CSS** | 649-line global file mixing Tailwind `@layer components` BEM-ish nesting (`.navbar .inner .contact-btn .inner`…), duplicated `.wrapper`/`.slide` rules, two `filter` declarations in `.glow` (second overrides the first; `.glow` is an empty div), leftover template classes (`.tech-card-*`, `.tech-grid`, `.tech-icon-wrapper`, `.timeline-*`, `.gradient-edge`, `.hero-3d-layout`, `.marquee`), global `form a`, `form input` selectors, shadcn tokens | Delete dead rules; keep Tailwind utilities + a small `@theme`; move component CSS next to components if still needed |
| **Dead code/deps** | `react-responsive`, `class-variance-authority`, `tw-animate-css`, `clsx`/`tailwind-merge`/`cn()` (unused), `components.json` ×2, 16 unreferenced images, root `monkstack-logo.png`, empty `.dist/` | Remove after confirming |
| **Animation approach** | Three libraries/approaches (GSAP, framer-motion, CSS keyframes) + WebGL + canvas. Experience animates `.timeline` with `gsap.to` called inside an `onUpdate` callback on every scroll tick | Standardise on GSAP **or** CSS; drop framer-motion; delete WebGL/canvas effects |
| **Global events** | `heroAnimationComplete` CustomEvent couples `Hero` to `NavBar`; `ScrollHint` global listeners | Remove coupling (nav should not wait for hero) |
| **Route handling** | `NavBar` constructs `href={`/${link}`}` for hash links and manually navigates when off-home (works, but duplicative of `Link to="/#work"`); `ScrollToTop` handles hash | Use `<Link to="/#work">`; give section anchors `scroll-margin-top` for the fixed nav |
| **Env/config** | EmailJS env vars undocumented; no `.env.example` | Add `.env.example` + README section |
| **README / metadata** | JSM tutorial README; `package.json` name `three-d-portfolio-2025` | Replace README with a short project README |
| **Testing/CI** | None | At minimum: lint + build in CI; optional Playwright smoke test for routes (post-refactor) |

**Opportunities that improve maintainability:** a single `projects` content module with structured fields → listing, homepage entries, and case-study pages all derive from it; one `Section`/`Container` pair gives you consistent spacing; one token set removes ~300 lines of CSS.

---

# 15. Claude UI/Design Skills and Tooling Recommendations

## 15.1 What is actually installed/available here [V]

| Item | Status |
|---|---|
| **Frontend-design / UI-UX audit / design-system / accessibility skills** | **None installed.** Skills visible in this session: `artifact-design`, `artifact-diagramming`, `artifact-capabilities`, `dataviz` (for Claude artifacts/charts, not for editing this repo's UI); `code-review`, `simplify`, `security-review`, `run`, `init`, `loop`, `schedule`, `claude-api`, `update-config`, `fewer-permission-prompts`, `keybindings-help`, `plugin-authoring`; `anthropic-skills:*` (docx/pdf/pptx/xlsx/docs/skill-creator/…) |
| **Third-party plugin** | `seo-skills@seranking` v2.10.4 (user scope, installed 2026-10-18): skills including `seo-technical-audit`, `seo-schema`, `seo-images`, `seo-page`, `seo-firecrawl`, `seo-google`, `seo-drift`, `seo-sitemap`. Its SE Ranking MCP server **needs OAuth authentication** (not possible in this non-interactive session); `seo-google` needs Google API credentials; most analysis skills assume a **live public URL** — this site has no live domain yet |
| **Browser inspection** | A Chrome MCP (`claude-in-chrome`: navigate, read_page, computer/screenshot, resize_window, read_console, read_network_requests, javascript_tool, gif_creator) was listed at session start but **disconnected before use**; no screenshots could be captured |
| **Playwright/Lighthouse in repo** | Not installed (`package.json` devDependencies: eslint, vite, plugins only). No installation performed |

## 15.2 Recommended use during implementation [R]

| Stage | Tool | Purpose |
|---|---|---|
| Every workstream, before merge | Built-in **`/code-review`** and **`/simplify`** | Catch regressions; remove duplication after each refactor |
| After dependency/CSS removal | **`/run`** (launch dev server) + Chrome MCP (when connected) | Visual regression at 360/768/1024/1440 widths; console/network checks |
| WS6 (SEO) after a live domain exists | `seo-skills:seo-technical-audit`, `seo-schema`, `seo-images`, `seo-sitemap` | Validate metadata, JSON-LD, image SEO, sitemap — **only after** a deploy URL exists and (for SE Ranking-backed skills) OAuth is completed by you |
| Contact form hardening | **`/security-review`** | Review EmailJS config exposure, form abuse surface |
| Throughout | `/init` once after refactor | Generate a `CLAUDE.md` describing tokens/components so later sessions stay consistent |

## 15.3 Optional, missing tooling (not installed; do not assume available)

Keep this list small and non-overlapping. Official sources are given where I can state them with confidence; **verify before installing**.

| Need | Option | Purpose | Source |
|---|---|---|---|
| Browser-based visual QA & screenshots (reliable, scriptable) | **Playwright** (`@playwright/test`) as a dev dependency | Repeatable multi-viewport screenshots, route smoke tests, basic a11y assertions | https://playwright.dev |
| Accessibility automation | **axe-core** via `@axe-core/playwright` | Automated WCAG checks on rendered pages | https://github.com/dequelabs/axe-core-npm |
| Performance | **Lighthouse CLI** (or Chrome DevTools) | LCP/CLS/INP and image/font diagnostics | https://github.com/GoogleChrome/lighthouse |
| Claude "frontend design" skill | Anthropic has published a frontend-design skill in its public skills repository; I did not verify its current presence or contents in this environment | Anti-generic UI guidance during implementation | https://github.com/anthropics/skills (check before use) |

My recommendation: **Playwright + axe + Lighthouse** for verification (free, deterministic) rather than adding more Claude skills; use the built-in review skills for code quality.

---

# 16. Prioritised Issue Register

Priority: **P0** critical · **P1** high · **P2** medium · **P3** low. Effort: **S** (≤ ½ day) · **M** (~1–2 days) · **L** (3+ days). WS = workstream (§17).

### P0 — Critical

| ID | Area | Problem | Recommended change | Benefit | Effort | Deps | Verify |
|---|---|---|---|---|---|---|---|
| P0-01 | `constants/index.js:35-40`, `AnimatedCounter`, `Hero.jsx:103` | Unsupported counters; "1+ years" contradicts timeline | Remove counters (or replace with factual items you approve) | Removes the largest credibility risk | S | – | No counters in DOM; content sign-off |
| P0-02 | `constants:211-254`, `GlowCard`, `Experience.jsx:107` | Self-authored-looking reviews + 5 stars on every experience card, incl. degree | Delete `review` fields and star rendering on Experience | Credibility | S | – | No review text in Experience |
| P0-03 | `Testimonials.jsx`, `constants:260-318` | 8 generic, unattributed quotes with 5-star icons; unused avatars | Remove section, or replace with 2–3 verified, attributed quotes with consent | Credibility | S–M | Your input [?] | Section removed/replaced; each quote has name+role+org |
| P0-04 | `NavBar.jsx`, `index.css:159` | No navigation below `lg` | Add accessible mobile menu (button, `aria-expanded`, focus trap/Escape, links incl. Projects) | Core usability | M | – | At 360/768 px all nav targets reachable by touch & keyboard |
| P0-05 | `Button.jsx` | CTA is `<a>` without `href`; scrolls to stats | Real `<a href="#work">` or `<Link>`; focus-visible style | Keyboard/AT access; correct destination | S | – | Tab focuses it; Enter scrolls to Work |
| P0-06 | App-wide headings/landmarks | 12 `h1`s, no `<main>`, no skip link | One `h1` per page; `h2`/`h3` hierarchy; add `<main id>` + skip link | A11y + SEO | M | P2-01 helpful | axe: no heading/landmark violations |
| P0-07 | `constants` project stats (53, 77, 100) | Usage claims with no evidence (incl. medical product) | Substantiate or remove; label self-reported where kept | Credibility/legal prudence | S | Your input [?] | Each remaining stat has a source you can cite |
| P0-08 | App-wide motion | No `prefers-reduced-motion` support; infinite animations | Global reduced-motion rules; remove looping effects | A11y | M | P1 effects removal | OS reduced-motion → no looping/auto motion |

### P1 — High

| ID | Area | Problem | Change | Benefit | Effort | Deps | Verify |
|---|---|---|---|---|---|---|---|
| P1-01 | Hero | Generic headline; centered; word slider; WebGL | Rewrite hero per §4.1/§5.3 | Positioning | M | P0-01, P0-05 | Headline states role + domain; no word slider |
| P1-02 | Homepage IA | 10 sections, repeated patterns | Reorganise to 5 sections (§5.2); remove marquee, feature cards, ScrollHint, counters | Clarity, perf | M | P1-01 | Home has ≤ 5 sections; no removed components in tree |
| P1-03 | `projects` featured flags | Wrong projects featured | Feature AI 3D Renderer, Atomic Player, AI Shopping Assistant | Alignment w/ target roles | S | P1-05 media | Home shows the three |
| P1-04 | Project routing | No project detail pages | Add `/projects/:slug` + `CaseStudyLayout` | Depth of evidence | L | P1-06 | 3 full pages + 2 short pages render; prev/next works |
| P1-05 | Project media | Atomic Player & GatherrGo have no image/link; 14.7 MB & 3.8 MB GIFs; generic file names (`heroo.png`) | Add diagrams/screenshots (or "private" state); convert GIFs to MP4/WebM; rename files | Evidence + performance | M | Your input [?] | Every project has a visual; none > 300 KB (video < 3 MB) |
| P1-06 | Project data model | Flat card record; styling inside data | Structured content (summary, role, year, status, stack[], sections[]) | Single source for list/home/case study | M | – | One module feeds all three views |
| P1-07 | `ProjectsPage`/`ProjectCard` | 7 × `min-h-screen` rows, filter for 7 items, badges, rainbow pills | Replace with index layout (§7); drop filter; plain-text stack | Scannability | M | P1-06 | All projects visible in ≤ 2 screens (desktop) |
| P1-08 | Experience | Magic-number timeline, per-role `h1`, long bullets, degree-as-job | Simplify to compact list; split bullets; link to case studies | Readability, robustness | M | P0-02 | Renders correctly 360–1920 px w/o `35.5vw` offset |
| P1-09 | Contact | Pills, availability card, 4 tiles, generic copy | Simplify; add résumé; state what roles you want | Conversion | S–M | – | One primary CTA; no ping animation |
| P1-10 | Skills | 30 icons at `text-5xl`; unevidenced items | Text list; remove unsubstantiated items | Credibility | S | Your input [?] | Each skill listed is evidenced somewhere |
| P1-11 | Missing essentials | No About, résumé, location, intent | Add short "What I do / what I'm looking for" and résumé PDF link | Decision support | S–M | Your input [?] | Résumé downloads; intent stated |
| P1-12 | Design tokens | Two unrelated token systems; arbitrary colours; overriding `blue-*` | Define semantic `@theme` per §11; delete shadcn tokens | Consistency | M | – | No hard-coded hex in components; one accent |
| P1-13 | Page images | ≈ 3.9 MB eager on home; ≈ 22 MB on `/projects` | WebP/AVIF, `srcset`, `loading="lazy"`, dimensions | LCP, bandwidth | M | P1-05 | Home images < 500 KB total; Lighthouse image audits pass |
| P1-14 | SEO metadata | Relative `og:image`, no canonical/og:url, wrong favicon type, no sitemap, client-side per-route meta | Absolute OG image (1200×630), canonical, correct favicon, sitemap, per-route meta (prerender or head manager) | Link previews + indexing | M | Domain decision [?] | Preview validators show correct card; canonical present |
| P1-15 | README | JSM tutorial README | Replace with accurate README + `.env.example` | Repo credibility | S | – | README describes this site |

### P2 — Medium

| ID | Area | Problem | Change | Benefit | Effort | Deps | Verify |
|---|---|---|---|---|---|---|---|
| P2-01 | Global layout | 5 padding recipes, no max-width, `100dvw` | `Container`/`Section` primitives; `max-w` token; remove `100dvw` | Alignment, no overflow | M | P1-12 | No horizontal scroll at any width; consistent gutters |
| P2-02 | Buttons/links | 6 button styles | One `Button`/`TextLink` with variants | Consistency | S–M | P1-12 | Single source for buttons |
| P2-03 | Skills/tech colour | 14 inconsistent tech colours | Plain mono text | Calm, consistency | S | P1-06 | No colour tied to technology |
| P2-04 | Hover-only links | `ShowcaseSection` overlay | Visible links | Touch/keyboard | S | P1-02 | Links visible without hover |
| P2-05 | Alt text | `alt="person"`, `"logo"`, `"star"`, `"arrow"` | Meaningful or `alt=""` | A11y | S | – | axe: image-alt clean |
| P2-06 | Focus styles | None beyond inputs | Global `:focus-visible` ring using accent | Keyboard UX | S | P1-12 | Visible focus on every control |
| P2-07 | Form feedback | Messages not announced | `role="status"`/`alert`; disabled-state label | A11y | S | – | SR announces result |
| P2-08 | Nav behaviour | Hidden 3 s on `/projects`; Hero→Nav event coupling; anchors lack `scroll-margin` | Render nav immediately; use `Link to="/#id"`; `scroll-margin-top` | UX | S | – | Nav visible at first paint on all routes |
| P2-09 | 404 route | None | Add `*` route page | UX/SEO | S | – | Unknown URL shows 404 with link home |
| P2-10 | Fonts | CSS `@import` from Google | Self-host subset via `@font-face` + `preload` | LCP, privacy | S–M | – | No request to fonts.googleapis.com; swap OK |
| P2-11 | Dependencies | Unused/duplicate libs | Remove `react-responsive`, `cva`, `tw-animate-css`, (`clsx`, `tailwind-merge` if unused), `framer-motion`; replace `react-icons` | Bundle size | S–M | P1-10 | Build passes; bundle ↓ |
| P2-12 | Dead CSS/assets/config | ≈ 200+ lines of template CSS; 16 unreferenced images; `components.json` ×2; `.dist/`; root logo | Delete after confirming | Maintainability | S | P1-12 | Lint/build OK; no 404s in dev |
| P2-13 | Zyntrix | Full-viewport canvas promo | Reduce to a single line (decide audience first) | Focus | S | Audience decision [?] | Not a standalone section |
| P2-14 | Footer | Fake "Terms" | Remove; keep socials/copyright | Cleanliness | S | – | – |
| P2-15 | Structured data | None | Add `Person`/`WebSite` JSON-LD | SEO | S | P1-14 | Rich-result test passes |

### P3 — Low

| ID | Area | Problem | Change | Effort |
|---|---|---|---|---|
| P3-01 | Title casing/labels | Nav "Work" vs "Projects" | Single "Work" | S |
| P3-02 | Print stylesheet / résumé page | None | Optional print-friendly `/resume` | M |
| P3-03 | `theme-color`, manifest | None | Add basic metadata | S |
| P3-04 | Prerender | Client-side only | Consider `vite-plugin-ssr`/static prerender for the 3–6 routes | L |
| P3-05 | CI | None | Lint + build workflow | S |
| P3-06 | Playwright smoke + axe tests | None | After refactor | M |
| P3-07 | Case-study prev/next, TOC | – | Polish | S |
| P3-08 | Analytics (privacy-friendly) | None | Optional | S |

---

# 17. Suggested Refactoring Workstreams and Implementation Order

Each workstream is independently reviewable (one section at a time).

| Order | Workstream | Scope | Issue IDs | Effort |
|---|---|---|---|---|
| 0 | **Checkpoint** | Commit the current working tree to a branch so the new site isn't only uncommitted (you decide when/how) | – | S |
| 1 | **WS1 — Content truth pass** | Counters, reviews, testimonials, stats, skills, copy cleanup, résumé/About inputs | P0-01/02/03/07, P1-10, P1-11 | M |
| 2 | **WS2 — Navigation & accessibility foundation** | Mobile nav, `<main>`/skip link, heading levels, Button fix, focus styles, alt text, reduced motion, 404, nav behaviour | P0-04/05/06/08, P2-05/06/07/08/09 | M |
| 3 | **WS3 — Tokens & primitives** | `@theme` tokens, delete shadcn/template CSS, `Container`/`Section`/`Heading`/`Button`/`TextLink`, self-hosted fonts | P1-12, P2-01/02/10/12 | M–L |
| 4 | **WS4 — Project data model & case-study system** | Content schema, `ProjectEntry`, `/projects` index, `/projects/:slug`, `CaseStudyLayout`, write case study #1 (AI 3D Renderer), then #2, #3 | P1-03/04/05/06/07 | L |
| 5 | **WS5 — Homepage recomposition** | New hero, 5-section IA, Experience restructure, Contact simplification, Zyntrix reduction, footer | P1-01/02/08/09, P2-13/14 | M–L |
| 6 | **WS6 — Performance, SEO & metadata** | Image/video conversion, lazy-loading, dependency removal, OG/canonical/sitemap/JSON-LD, prerender decision | P1-13/14, P2-11/15, P3-04 | M |
| 7 | **WS7 — Hygiene & verification** | README/`.env.example`, CI, Playwright + axe + Lighthouse baselines | P1-15, P3-05/06 | S–M |

**Rationale for order:** content truth first (cheap, highest credibility impact, informs everything else); accessibility/navigation next (functional defects); tokens/primitives before building new pages so new work uses them; projects/case studies before the homepage so the homepage can link to real destinations; performance/SEO once content and assets are final.

**Suggested review cadence:** after each workstream, run lint/build, review desktop + mobile screenshots, then approve the next.

---

# 18. Open Questions, Missing Evidence, Assumptions and Limitations

## 18.1 Limitations of this audit

- **No visual or runtime inspection.** The browser tool disconnected; no screenshots exist. Every layout/responsive/contrast/performance-runtime finding marked [H] is inferred from source and must be confirmed.
- **Existing `dist/` build used** for bundle sizes; I did not rebuild (a build would write to disk). It is assumed to match the current source (it contains the lazy `ProjectsPage` chunk, consistent with the working tree).
- **Project source repositories and live sites were not inspected.** Only the portfolio repo is in the workspace; I did not fetch live URLs (qruzine.com, saramedico.com, Vercel preview, zyntrix.in) or GitHub repos. Contribution, scale, and usage claims are therefore unverified.
- **Link health not tested** (including GitHub/Vercel URLs and social profiles).
- **SE Ranking-backed SEO skills could not be used** (authentication required).
- `git status` indicates large uncommitted changes; findings describe the **working tree**, not `HEAD`.

## 18.2 Questions for you

1. **Primary audience:** full-time AI/software roles only, or also freelance/agency clients (Zyntrix)? This decides whether Zyntrix and "Open for freelance" stay.
2. **Which claims are real and provable?** Counters; "10+ restaurants / 500+ daily customers" (Qruzine); "2 orgs / 200+ employees" (SHRM); "5+ doctors / 100+ consultations" (AI Medical). If you can't back them, they should go.
3. **Testimonials:** are the 8 people real, did they write/approve these, and may they be named and linked? (Reviews inside Experience cards look self-written.)
4. **Atomic Player and GatherrGo:** which employer/client, what was your exact role, and may they be shown (screenshots, diagrams, names)?
5. **AI 3D Renderer / AI Shopping Assistant vs Monkstack:** are these the same work as the Monkstack bullets? May the GIFs be public?
6. **AI Medical Documentation:** the GitHub repo is under another account — what did *you* build? Is the medical-domain usage claim accurate and permitted to publish?
7. **SHRM live URL** is a Vercel preview-looking link — is there a production URL?
8. **Skills you can discuss in depth:** LLM evaluation, Azure Service Bus/Function Apps/Blob, Flask, CI/CD, Model routing — none of the first four appear in any project/experience text.
9. **Résumé:** do you have a PDF to link? Do you want a `/resume` page?
10. **Domain & hosting:** where will this live (affects canonical, OG, sitemap, SPA fallback, prerendering)?
11. **Contact:** keep the on-page form (EmailJS) or email/LinkedIn only? Keep Instagram?
12. **Identity:** is `vanshahuja318@gmail.com` the address you want public?

## 18.3 Assumptions made

- Target outcome: AI-engineering / backend-leaning software roles at product companies, with secondary freelance interest.
- Dates are interpreted as of 2026-10-20 (session date).
- Content on the site is yours and accurate as written, except where flagged.
- The dark theme remains the preferred direction.

---

*End of report. No implementation was started.*
