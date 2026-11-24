# OLOYE motion & interaction polish

Prompt 3.5 adds motion to the existing storefront while retaining its layout, imagery, catalogue and shopping interactions. No dependencies were added.

- The homepage hero introduces its two headline lines, supporting copy, CTA and image in a staggered entrance. The desktop image moves by at most 18px with scrolling; the scroll cue runs twice and stops.
- Homepage headings, collection tiles, editorial/campaign imagery and product cards reveal once as they enter the viewport. A shared IntersectionObserver handles the reveals; content is visible without enhancement and keyboard focus reveals a target immediately.
- Desktop dropdowns fade/slide in and out, with staggered navigation entries and moving underlines/arrows. The mobile menu and filter drawer slide with a fading backdrop and retain their content through dismissal.
- Product cards use eased image zoom, alternate-image transitions and a short heart/button response when a wishlist item is added or removed. Buttons and links respond to hover, press and keyboard focus.
- Active filter chips enter/leave smoothly. Keyed product-grid updates use Svelte FLIP movement and short entrances/exits while URL state, sorting, filtering and wishlist behaviour stay intact.
- Collection/search route changes use the browser View Transition API when available. Query-only filter and sort updates use the grid motion. Unsupported browsers continue with normal navigation.

CSS provides entrances and hover states. Existing Svelte transitions/animations handle dropdowns and catalogue changes. The small shared helper at `apps/storefront/src/lib/motion/motion.ts` manages reveal observation, desktop scroll movement, native dialog animation and wishlist feedback. Scroll work is scheduled only while the desktop hero is visible; no animation loop runs continuously. Permanent animation hints are avoided for product cards.

Reduced-motion preferences disable entrances, scroll movement, wishlist animation and page transitions, and make drawer/grid changes immediate. Changing the preference also exposes pending reveals and finishes active dialog/feedback animations.

The first interaction run found a search focus race: a drawer finishing its exit could restore focus after route navigation. Navigation now closes the native dialog before changing routes; ordinary dismissal retains the short exit animation and focus restoration. This keeps the next page ready for typing.

Run from `apps/storefront`:

```sh
pnpm.cmd check
pnpm.cmd build
```

Verified on 24 November 2026:

| Check | Result |
| --- | --- |
| `pnpm.cmd check` | Pass: 0 errors, 0 warnings |
| `pnpm.cmd build` | Pass: production client/server and Node adapter |
| Production browsing | All 14 catalogue scenarios verified, including a targeted browser-history recheck |
| Motion checks | All 6 pass: hero/reveals, card feedback, route changes/history, mobile dismissal/focus, reduced motion and reveal fallback |
| Responsive layouts | 320, 390, 768, 1024 and 1440px; no horizontal overflow; homepage layout and catalogue images retained |
| Accessibility | Zero axe WCAG 2/2.1 A/AA findings on homepage, catalogue, search and mobile filters |
| Browser runtime | Zero production browser exceptions |

Production verification used `node .cache/motion/production-test.mjs` and the targeted `node .cache/motion/production-test.mjs history`. A history assertion was adjusted to wait for restored controls because the address bar can update before Svelte finishes its DOM update; the controls, products and sort order then passed the back/forward check. The preview server is stopped automatically after each run.

Browser scripts, screenshots and results are kept under ignored `.cache/motion/`, using the existing temporary Playwright/Chrome tools. No outstanding implementation issues remain. Native page transitions depend on browser support; browsing works with normal navigation otherwise. This milestone does not implement Prompt 4 or 3D functionality.
