# Website implementation and handoff

Updated: 17 November 2026.

## Implemented

- Customer-focused homepage with an immediately available voice player, practical jobs, a clearly labeled illustrative workflow and three setup steps.
- Silver, Gold and Platinum plans backed by shared offer data. Existing source rates are retained as **indicative**, not approved commercials.
- A single reusable player with all 24 bundled voices, explicit prerecorded labels, play/pause, seeking, elapsed time, selection without autoplay, error/retry handling and cross-player pause coordination.
- Voice/plan selections carried into a shorter demo-request form. Unicode names and phone or email contact are accepted; optional details remain optional.
- Durable enquiry storage in a local Node service. Validation, permission checks, payload limits, a honeypot, an IP rate limit, persisted request identifiers and duplicate retry protection are included.
- Clear save/failure states. Opening WhatsApp is a separate optional draft action and is not counted as a submitted lead.
- Shared customer FAQs, updated navigation, route/hash handling, a not-found view, skip link, focus management and simpler privacy/terms/refund explanations.
- Removed stale fallback marketing, unsupported ratings and conflicting offers from HTML metadata. Images no longer open a lightbox unless explicitly marked for zoom.

## Run the complete local website

From the repository root:

```powershell
npm --prefix frontend run build
node backend/server.mjs
```

Visit **http://127.0.0.1:8787/**. This serves the production build and `/api/leads` from the same origin. Requires a current Node runtime with built-in `fetch`, `node:test` and ES modules. No backend dependency installation is needed.

For frontend development, leave the backend running and run:

```powershell
npm --prefix frontend run dev
```

Vite proxies `/api` to `http://127.0.0.1:8787`. Its base is now `/`, consistent with existing root-relative routes and assets.

## Where leads go

By default, accepted requests are appended and flushed to **`backend/data/leads.jsonl`**, outside the public static directory and ignored by Git. The response includes a reference only after the record is persisted. The log contains contact details; keep it private, back it up and set a retention/deletion policy.

There is **no public listing/admin endpoint**, automatic email, CRM synchronization or sales notification yet. A saved request is not a confirmed appointment. Sales must have a defined retrieval process before traffic is sent to production. The form's receipt deliberately says the request is saved and provides direct contact options.

This is a single-process, single-writer service using a private append-only log. It is appropriate for local validation and a small controlled deployment with persistent disk. It is not a distributed lead database. For multiple instances or higher volume, replace the store with a managed database that enforces unique request identifiers and add operational monitoring.

## Deployment configuration

- `PORT`: defaults to `8787`.
- `HOST`: defaults to `127.0.0.1` for a local-only listener. Set an appropriate bind address when deploying behind an HTTPS reverse proxy.
- `LEAD_DATA_DIR`: absolute directory on **persistent private storage** for the log. Do not point it into `frontend/dist` or any public asset directory.
- `LEAD_ALLOWED_ORIGINS`: comma-separated exact origins if the frontend and API are on different origins. Same-origin requests work without this setting. Default dev origins are localhost/127.0.0.1 on port 5173.
- `VITE_LEAD_ENDPOINT`: optional frontend build-time endpoint; defaults to `/api/leads`. Changing a Vite variable requires rebuilding.
- `VITE_KOMMUNICATE_APP_ID`: optional chat widget. Leave blank if chat is not configured; phone/email/form remain available.

The existing Vercel configuration deploys a **static frontend only**. It does not run this Node service or provide a durable disk. Do not assume the demo form is production-connected merely because static deployment succeeds. Either deploy the Node service with persistent storage and proxy `/api/leads` to it, or connect a managed lead API and configure `VITE_LEAD_ENDPOINT`. Do not place private records in a serverless ephemeral filesystem.

The service does not trust forwarded IP headers. Behind a reverse proxy, its basic rate limit may group visitors by proxy address. Configure proper edge spam protection/rate limiting and a trusted-proxy policy before public scale. Serve through HTTPS, restrict filesystem access, run one writer and arrange backups. No production hosting or external account has been modified in this task.

## Commercial and content decisions still needed

1. Approve the actual rates. Source default AI-only rates remain Silver ₹3.00, Gold ₹5.80, Platinum ₹10.00; package figures remain ₹5.00/₹7.00/₹11.00. These are explicitly indicative.
2. Reconcile the separate legacy volume schedule with plan rates; it is deliberately not presented as a discount on those plans.
3. Confirm recharge, commitment, fixed fees, deposits, phone charges, GST, trials, cancellation and refund terms.
4. Review every recording with a native speaker, approve language/scenario labels and supply accurate transcripts. No transcript or language has been invented. Voice names currently come from the supplied manifest.
5. Supply genuine case studies, product screenshots and permissioned testimonials. The illustrated workflow is not presented as a measured customer result.
6. Approve final privacy/service terms and retention. The previous unverified encryption, uptime and unconditional refund promises were removed from active pages.
7. Choose the real sales delivery destination and production data store.

## Verification

```powershell
npm --prefix frontend test
npm --prefix frontend run build
npm --prefix frontend run lint
```

Automated tests cover durable receipt, concurrent/restart duplicate protection, Unicode data, invalid/oversized/spam requests, origin checks, rate limits, private-data non-exposure, nested routes, audio byte ranges and pricing boundaries/pulse rounding.

Production build passes. Lint exits successfully, with warnings remaining in legacy components that are not used by the new main journey.

Native browser verification was attempted but Computer Use stopped because it could not establish the browser URL confidently enough to enforce policy. No attempt was made to bypass that protection. Consequently the new visual layout, real mobile devices, audible quality, screen-reader behaviour and completed UI submission still need manual verification. Backend submission behaviour is covered by automated tests using synthetic enquiries in temporary directories.

## Suggested next checks

Open the local URL, play and switch voices, use a tier's demo link, test a synthetic enquiry and verify its reference in the private log. Check 360/390-pixel phones, desktop, both themes, keyboard focus, zoom and reduced motion. Confirm the service destination and approved pricing before publishing or starting paid campaigns.
