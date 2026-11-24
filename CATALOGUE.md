# OLOYE catalogue & product discovery

Prompt 3 extends the existing SvelteKit storefront with a reusable catalogue and functional product discovery. The Prompt 2 homepage, visual identity, header, footer and mobile navigation are retained. No application dependencies or commerce infrastructure were added.

## Routes and components

| Route | Experience |
| --- | --- |
| `/collections/all` | Complete 38-piece edit |
| `/collections/men`, `/collections/women` | Audience collections, including shared styles |
| `/collections/new-arrivals` | Latest additions |
| `/collections/clothing`, `/collections/footwear`, `/collections/accessories` | Department collections |
| `/collections/sale` | Reduced-price styles |
| `/collections` | Redirect to the complete edit |
| `/search?q=knitwear` | Search results using the shared listing and filters |
| `/products/[slug]` | Lightweight first-look destination for each card; full product details remain a later milestone |

Collection pages share `CatalogueListing.svelte`, `CollectionHeader.svelte`, `FilterPanel.svelte`, `FilterDrawer.svelte`, `ActiveFilters.svelte` and `SearchForm.svelte`. The existing `ProductCard.svelte` is reused on the homepage and listings, with catalogue labels, sale prices, colour indicators, wishlist buttons and alternate photographs where available. Unknown collections and product slugs return HTTP 404. Legacy collection and product preview links redirect to their current routes; editorial previews remain available.

Typed data is separate from presentation under `apps/storefront/src/lib/catalogue`: `types.ts` defines the contracts, `categories.ts` defines category and colour metadata, `collections.ts` defines campaign copy and navigation, `products.ts` holds the products, and `discovery.ts` handles matching, filtering, sorting and URL state. Brand, category, collections, regular and optional sale price, colours, sizes, images, description, arrival status and date are represented for every product.

## Catalogue coverage

The catalogue contains **38 products** across **19 subcategories**: all 18 requested subcategories plus dresses.

| Collection | Products |
| --- | ---: |
| Complete edit | 38 |
| Men | 27 |
| Women | 28 |
| New Arrivals | 12 |
| Clothing | 25 |
| Footwear | 8 |
| Accessories | 5 |
| Sale | 10 |

Audience counts overlap because selected pieces are shared. Clothing includes suits, shirts, trousers, denim, knitwear, jackets, coats, tracksuits, streetwear and dresses. Footwear includes trainers, sneakers, brogues, loafers and boots. Accessories include bags, watches, belts and eyewear. Prices are displayed in EUR and remain illustrative.

The image manifest contains **40 photographs** and **120 local WebP variants**, including 27 photographs added for this milestone. Every product has a distinct primary photograph. The models are predominantly contemporary Black men and women across varied complexions. Matching alternate sneaker and brogue photographs are available on hover or keyboard focus. [PHOTOGRAPHY.md](PHOTOGRAPHY.md) contains credits and licensing; the same source credits are available at `/information/photography`.

## Search, filters, sorting and wishlist

Search matches product names, brand names, category names and category synonyms. Matching ignores case and accents and requires every search word to appear in the searchable text. The existing search dialog previews up to six matching products and submits to `/search`; clear controls, keyboard submission and useful no-results states are provided.

Category, size, colour and minimum/maximum price filters update the product grid and count. Multiple values within one filter are combined with OR; different filters are combined with AND. Price boundaries are inclusive and use the selling price after any sale reduction. Invalid price input shows an accessible error. Active chips remove individual selections; clear-all preserves the current search and sort. On mobile, a native modal drawer previews a draft selection and applies it with the result-count button; dismissal discards unapplied changes.

Sort choices are `featured`, `newest`, `price-asc` and `price-desc`. Featured retains catalogue order, newest uses arrival date, and price sorts use the selling price. State is encoded in URL query parameters and works on direct visits, reload and browser back/forward:

```text
/collections/all?category=suits&category=shirts&size=M&colour=black&min=100&max=400&sort=price-asc
/search?q=knitwear&size=M&sort=newest
```

Updates use SvelteKit navigation with `reset: false` to retain scroll and focus. A normal navigation updates the reactive `page.url`; in the installed SvelteKit 3 release, shallow navigation retains the loaded page URL and exposes its destination separately. Duplicate and unrecognised filter values are ignored; malformed query prices are discarded, and reversed valid query bounds are normalised.

Wishlist state is created per layout and saved on the current device under `oloye.wishlist.v1`. It persists through navigation and reload, synchronises across tabs, ignores invalid product IDs, and falls back to the current visit when storage is unavailable. Product hearts, the header count and the wishlist drawer stay in sync. No account or backend service is involved.

Images have responsive sources, intrinsic dimensions and asynchronous decoding. Product grids load lazily and alternate views load on interaction. Native dialogs support Escape, focus wrapping, focus restoration and scroll locking. Responsive layouts and reduced-motion rules use the existing design tokens and typography.

## Verification

Run from `apps/storefront`:

```sh
pnpm.cmd check
pnpm.cmd build
```

Verified on 23 November 2026 with Node 24.20.0, pnpm 10.34.9, SvelteKit 3.4.0 and installed Chrome.

| Check | Result |
| --- | --- |
| `pnpm.cmd check` | Pass: 0 errors, 0 warnings |
| `pnpm.cmd build` | Pass: production client/server output and SvelteKit Node adapter |
| Production interaction suite | 14 checks passed; 0 failed; 0 browser exceptions |
| Collection routes and product links | All eight listing routes, all 38 product destinations, redirects and unknown-route 404s pass |
| Search and navigation | Desktop/mobile collection navigation, name/category matching, keyboard submission, clearing and empty states pass |
| Filters and sorting | All four sorts, combined filters, individual removal, clear-all, inclusive sale-price limits and invalid price input pass |
| URL history | Direct visits, reload, browser back/forward and control-state restoration pass |
| Wishlist | Toggle/removal, reload persistence, tab synchronisation, malformed values and unavailable-storage fallback pass |
| Mobile filter drawer | Draft preview, cancel, apply, clear, validation, Escape, keyboard focus wrapping/restoration and resize dismissal pass |
| Responsive layouts | 320, 390, 768, 1024 and 1440px checked; no horizontal page overflow; consistent product image proportions |
| Photography | All 120 WebP variants exist with valid format and dimensions; rendered catalogue/homepage images decode successfully; alternate footwear views pass |
| Accessibility | Zero axe WCAG 2/2.1 A/AA findings on catalogue, search empty state, homepage and mobile filter drawer |
| Reduced motion | Smooth scrolling and image transitions are disabled when requested |
| Homepage regression | Original four featured products, images, prices, captions, sections and visual design retained; desktop/mobile rendering and navigation pass |

Local browser commands were `node .cache/catalogue/inspect.mjs`, `node .cache/catalogue/visuals.mjs` and `node .cache/catalogue/production-test.mjs`. The last command starts the built Node application on port 4173, runs the complete Playwright suite and stops its preview server. Browser scripts, JSON results and screenshots are retained under ignored `.cache/catalogue/`, using Playwright, axe, Chrome and image-processing tools installed outside the workspace. No browser-test dependencies were added to the application. Automated scans supplement visual and keyboard inspection.

## Limits of this milestone

The frontend catalogue contains illustrative inventory and prices; photographs are licensed fashion references. Verified inventory photography, specifications and stock will accompany the later Medusa integration. Product links currently open a first-look preview. Full product details, account-synchronised wishlist, checkout, payments and 3D functionality are outside Prompt 3. The existing account, bag and newsletter launch states remain as designed in Prompt 2.
