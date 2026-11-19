# Current implementation ? start here

The website now includes a revised customer journey, shared indicative offers, a unified voice player and a local durable lead-capture service.

Build: `npm --prefix frontend run build`

Run: `node backend/server.mjs`

Open **http://127.0.0.1:8787/**.

Read [IMPLEMENTATION-HANDOFF.md](IMPLEMENTATION-HANDOFF.md) for the complete status, tests, pricing decisions and production deployment requirements. The older notes below describe the previous frontend-only version; the new form uses the lead API and offers WhatsApp separately. Static hosting alone does not run the lead service.

---

# Avyukta IntelliCall — Premium Website Redesign

Updated React/Vite website with a clean glassmorphism design, responsive layouts, motion effects, Jost typography, light/dark theme and brand logo variants.

## 1. View the finished website

The fully bundled, ready-to-host website is in **`frontend/dist/`**.

For a reliable local preview, start a local server from the dist folder:

```bash
cd frontend/dist
python -m http.server 8080
```

Then visit `http://localhost:8080`.

If Python is unavailable, you can serve the folder using any static HTTP server. On Vercel or Netlify, set the publish/output directory to `frontend/dist`. SPA route rewrites are included in `frontend/dist/vercel.json` and `_redirects`.

## 2. Continue React development

```bash
cd frontend
npm install
npm run dev
```

For a fresh production build on your machine:

```bash
npm run build
```

The supplied `dist/` was separately built and browser-tested, so you can deploy it without running npm. We excluded the OS-specific `node_modules` bundled in the original ZIP. You will need internet to install dependencies.

## What changed

- Premium minimalist design, modern hero, spacious content sections and glass-style navigation.
- Mobile-first responsive layouts, sticky header, improved mobile navigation.
- Jost font, refined brand colors, light/dark logos and contrast improvements.
- Hover animation, smooth interactions, reduced-motion accessibility support.
- Redesigned Home, Services, Features, Pricing, About and Contact pages.
- Essential AI voice, SIP / telephony and CRM information retained while reducing clutter.
- Modular / all-in-one pricing tabs, plan comparisons, volume calculator and voice demos preserved.
- Technical breakdowns and comprehensive audio libraries placed in expandable details on Pricing.
- Contact form validation preserved: clicking submit **opens a pre-filled WhatsApp draft**. User must press Send in WhatsApp; this is not a database submission.
- Existing legal-policy routes and functional links maintained.

## Branding and content

The header uses existing Avyukta IntelliCall transparent artwork supplied in the original project, with new theme-specific assets:

`frontend/public/avyukta-premium-light.png` and `frontend/public/avyukta-premium-dark.png`.

Commercials, rates, eligibility and legal copy should be reviewed by your sales team before launching. Some pricing is labelled as illustrative in the UI. Jost is served through Google Fonts, requiring an internet connection; appropriate system font fallback is provided.

## Original archive layout

`backend/` and `database/` were only readme placeholders in the uploaded ZIP; no application backend/database was present or added. The React site is frontend-only.
