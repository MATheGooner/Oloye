# OLOYE visual identity & homepage

This document records the completed Prompt 2 milestone and its original verification. Commerce, infrastructure, application dependencies and workspace configuration were preserved.

Prompt 3 preserves this homepage design and connects its navigation, search and wishlist to the shared catalogue. Wishlist selections now persist on the current device. Current catalogue behaviour and verification are recorded in [CATALOGUE.md](CATALOGUE.md); the sections below describe the original Prompt 2 delivery.

## Visual identity

Obsidian `#171817`, ivory `#E9E5DC` and a warm paper surface form the foundation. Oxblood `#572B32` accents italic campaign type and the occasion edit; stone and antique gold are used selectively. Bodoni Moda provides editorial headings and the OLOYE wordmark; DM Sans provides the shopping interface. Tokens are centralised in `apps/storefront/src/app.css` and fonts are self-hosted.

Real, predominantly Black-led fashion photography presents contemporary tailoring, relaxed separates and modern footwear. The Yoruba inspiration is expressed through the brand statement, without traditional clothing motifs. Credits and licensing considerations are in [PHOTOGRAPHY.md](PHOTOGRAPHY.md).

## Implemented sections and components

| Homepage section | Component |
| --- | --- |
| Announcement, wordmark, navigation and utilities | `layout/Header.svelte` |
| The art of presence campaign | `home/Hero.svelte` |
| Menswear, womenswear, footwear and accessories | `home/Collections.svelte` |
| Four new-arrival style references | `home/NewArrivals.svelte` |
| Trainers, sneakers, brogues and loafers | `home/Footwear.svelte` |
| Fashion journal and styling stories | `home/Editorial.svelte` |
| Oxblood occasion promotion | `home/Promotion.svelte` |
| Brand heritage and point of view | `home/BrandStatement.svelte` |
| Newsletter, service links, social destinations and payment indicators | `layout/Footer.svelte` |

Reusable components are `ui/Icon`, `ui/CampaignImage`, `ui/TextLink` and `ui/ProductCard`. `layout/Overlays` owns search, mobile navigation, wishlist, account and bag dialogs. Sample content is in `lib/content/home.ts`; the source manifest is `lib/content/photography.json`.

## Interactions and destinations

- Desktop categories open accessible dropdowns and support Escape and outside dismissal.
- Mobile navigation has expandable category groups and search, account and wishlist controls.
- Search filters the four sample styles and displays results and an empty state.
- Wishlist hearts toggle per-visit state. The header count and wishlist drawer update together; individual entries can be removed.
- Native dialogs support keyboard navigation, focus wrapping, Escape, backdrop dismissal and restoration to the trigger.
- Newsletter submission validates empty/invalid addresses and provides honest launch feedback for a valid address. It does not collect or subscribe emails.
- Product, collection, editorial and promotional links open curated `/preview/[slug]` destinations. Footer pages use `/information/[slug]`.
- Account and bag dialogs show launch information; the bag count is zero. Social destinations explain that verified profiles will be published at launch. Payment labels identify planned options.

Presentation state is created per layout using Svelte context, never as a server-global mutable singleton. It is separate from the existing private Medusa transport and does not persist after reload.

## Run and validate

From the repository root:

```sh
pnpm dev:storefront
pnpm --filter @oloye/storefront check
pnpm --filter @oloye/storefront build
```

On Windows, use `pnpm.cmd` if needed. If nested commands fail on the host, run `pnpm.cmd dev`, `pnpm.cmd check` or `pnpm.cmd build` directly from `apps/storefront`.

Open <http://127.0.0.1:5173/>. No additional environment variables or services are required for this homepage. Preserve the existing ignored `.env` files. Storefront `/health` retains real backend readiness behaviour and can report degraded while the standalone homepage is available.

## Verification

Verified on 23 November 2026 using the existing Node/pnpm/SvelteKit stack and installed Chrome through Playwright. Browser, axe and image-processing tools were installed in a temporary directory outside the workspace; no app dependencies were added.

| Check | Result |
| --- | --- |
| Storefront development server | HTTP 200; homepage works without commerce running |
| Responsive layouts | Desktop 1440px, tablet 1024px/768px and mobile 390px/320px; no horizontal page overflow |
| Images | All 13 rendered homepage images load; all four footwear styles and alternate images load |
| Desktop and mobile navigation | Dropdowns, category links, mobile groups and utility dialogs pass |
| Search | Filtering, empty results, clearing, keyboard wrapping and focus restoration pass |
| Wishlist | Toggle, removal, header count, client navigation retention and reload reset pass |
| Newsletter | Empty, invalid and valid email feedback pass |
| Links and 404s | Every distinct homepage destination returns HTTP 200; unknown previews, information pages and routes return HTTP 404 |
| Accessibility scans | Zero axe WCAG A/AA findings on desktop/mobile homepage, search, wishlist and mobile menu dialogs |
| Reduced motion | Smooth scrolling and transitions are disabled when requested |
| Browser runtime | No page exceptions during the interaction suite |
| TypeScript / Svelte check | 0 errors, 0 warnings |
| Production build | Pass; standalone SvelteKit Node adapter output |

Screenshots and browser verification output are retained locally under ignored `.cache/homepage/`. Automated scans supplement keyboard and visual inspection; they do not establish complete accessibility conformance.

## Scope and remaining work

No known implementation blockers remain in Prompt 2. Styles, prices and colours remain sample presentation content. Live product photography/specifications, commerce, account creation, permanent wishlist, email subscriptions, store policies and verified social profiles belong to their later milestones. Static footwear photographs are not described as interactive 3D. No commit or push was made.
