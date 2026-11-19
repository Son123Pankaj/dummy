# Product navigation and network marquee update

## Scope and analysis

The existing React/Vite showcase used a fixed-width sidebar, with descriptions, highlights, diagrams and imagery inside the selected panel. The latest request requires a percentage split and a heading-only panel, so that content was removed from this component. Existing pricing, audio demos, forms, routes and other homepage sections were preserved.

The older pasted full-site brief is superseded here by the latest bounded navigation/marquee instructions. Supplied dashboard screenshots were not placed in the panel because it must contain only one heading.

## Implementation

- `ProductShowcase.jsx`: five accessible product tabs; Voice replaced by Command Center; selection updates exactly one panel heading. Arrow keys, Home/End and roving focus preserved.
- Desktop grid uses 1fr/3fr columns without a gap: approximately 25%/75%. Tablet retains the proportional split; below 768px a labeled select replaces the sidebar.
- Dark navy surfaces, restrained blue-purple tint, white text, quiet hover/selected states and rounded borders are scoped to these sections.
- Tailwind Vite integration added. Prefixed `tw:` utilities and theme/utility imports avoid preflight resets and clashes with the existing site's global CSS. Custom scoped CSS handles artwork, motion and theme overrides.
- Our Global Network replaces the mixed relationship heading. The supplied `clients-strip.png` was inspected and reused; no companies or logos were invented. Its presentation is monochrome on the navy background.
- Two identical logo groups each include equal spacing; translating half the combined track yields an exact loop. Duplicate content is hidden from assistive technology.
- Marquee has edge masks, hover/focus pause and a persistent pause/resume button. Reduced-motion disables animation and provides a keyboard-focusable, horizontally scrollable static logo strip, keeping logos legible without page-level overflow.
- Obsolete showcase styles removed from `premium.css`.

## Verification

Production build, all seven existing backend/pricing regression tests and focused component lint passed. These regression tests do not establish visual correctness. No browser/mobile visual or console verification was completed for this change; earlier native browser attempts in this session were blocked by URL-confidence enforcement.

Manual checks remaining: desktop 25/75 proportions, each tab/select heading, keyboard focus, small-screen wrapping, logo-loop seam, pause/resume, reduced motion and no page-level overflow. Run `npm --prefix frontend run dev` to view the current source. No deployment was performed.

## Expansive canvas revision

The showcase now uses a separate wide container (up to 1800px, 48px desktop gutters) and a 12-column grid. The left three columns contain the heading and navigation; the right nine columns form a rounded navy-to-charcoal canvas, 520–820px tall on desktop. The surrounding grid has no border, background box or shadow. The latest heading-only requirement supersedes the earlier CRM/Command Center image slots in this panel. Other homepage sections remain unchanged. Mobile uses the compact select and a 360px canvas. Marquee fades, pause controls and reduced-motion handling remain intact.

Validation: production build and focused component lint pass. No new browser visual verification was performed.

## Dashboard restoration and verified layout fix

The image was absent because the prior heading-only revision removed its JSX. This revision restores the existing, visually inspected `/avyukta-communications-dashboard.png` and the existing BPA workflow asset. No absent attachment filenames are referenced. The requested heading appears once; Dialer is initially selected.

A second underlying issue was confirmed visually: unlayered legacy `* { margin:0; padding:0 }` rules outranked Tailwind utilities in a named layer. The prefixed utilities now import unlayered, so their class specificity restores spacing while remaining scoped by the `tw:` prefix. The desktop layout uses explicit gap-free 25%/75% grid tracks; sidebar padding provides separation inside its allocation. The container is capped at 1400px. The image uses natural aspect ratio without cropping.

Browser verification succeeded in Chrome on the local Vite preview at http://127.0.0.1:5188/#products. At the inspected 1536px-wide window, screenshot bounds showed approximately 326px sidebar and 979px panel (25%/75%). Dashboard, single heading, navigation active state and the lower network marquee were visually present. A roughly 698px-wide restored window showed the compact selector, corrected gutters and responsive image. Exact phone/tablet sizes, DOM bounding-box measurements, reduced-motion emulation and a browser-console audit were not completed. These observations supersede earlier notes saying browser inspection was blocked.
