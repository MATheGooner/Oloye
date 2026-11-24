<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '#lib/components/ui/Icon.svelte';
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import { navigation } from '#lib/content/home.js';
	import { products, homepageProducts } from '#lib/catalogue/products.js';
	import { categories, formatPrice, sellingPrice } from '#lib/catalogue/categories.js';
	import { searchProducts } from '#lib/catalogue/discovery.js';
	import SearchForm from '#lib/components/catalogue/SearchForm.svelte';
	import { clickedBackdrop, trapDialogFocus } from '#lib/components/ui/dialog.js';
	import { usePresentation } from '#lib/state/presentation.svelte.js';
	import type { Overlay } from '#lib/state/presentation.svelte.js';
	import { animateDialog } from '#lib/motion/motion.js';
	const presentation = usePresentation();
	let dialog: HTMLDialogElement | undefined = $state();
	let shownOverlay = $state<Overlay>(null);
	let query = $state('');
	let searchInput: HTMLInputElement | undefined = $state();
	let found = $derived(searchProducts(products, query));
	let results = $derived(query.trim() ? found.slice(0, 6) : homepageProducts);
	let saved = $derived(products.filter((product) => presentation.wishlist.includes(product.id)));
	let title = $derived(
		shownOverlay === 'menu'
			? 'Explore OLOYE'
			: shownOverlay === 'search'
				? 'Find your next favourite'
				: shownOverlay === 'account'
					? 'Your OLOYE'
					: shownOverlay === 'wishlist'
						? 'Your wishlist'
						: 'Your shopping bag'
	);
	const close = () => (presentation.overlay = null);
	const closeForNavigation = () => {
		dialog?.getAnimations().forEach((animation) => animation.cancel());
		dialog?.close();
		shownOverlay = null;
		close();
	};

	function submitSearch(value: string) {
		closeForNavigation();
		goto(`/search${value ? `?${new URLSearchParams({ q: value })}` : ''}`);
	}

	$effect(() => {
		const overlay = presentation.overlay;
		if (!dialog) return;
		const element = dialog;
		let stopped = false;
		if (overlay) {
			shownOverlay = overlay;
			if (!element.open) element.showModal();
			animateDialog(element, true, overlay === 'menu' ? 'left' : 'right');
			if (overlay === 'search')
				tick().then(() => {
					if (!stopped) searchInput?.focus();
				});
		} else if (element.open) {
			const finish = () => {
				if (!stopped && presentation.overlay === null) {
					element.close();
					shownOverlay = null;
				}
			};
			const animation = animateDialog(element, false);
			if (animation) animation.finished.then(finish).catch(() => {});
			else finish();
		}
		return () => {
			stopped = true;
		};
	});
	$effect(() => {
		if (!shownOverlay) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="overlay-title"
	class:mobile-menu={shownOverlay === 'menu'}
	oncancel={(event) => {
		event.preventDefault();
		close();
	}}
	onclose={(event) => {
		if (!event.currentTarget.open) close();
	}}
	onkeydown={(event) => {
		if (dialog) trapDialogFocus(dialog, event);
	}}
	onclick={(event) => {
		if (dialog && clickedBackdrop(dialog, event)) close();
	}}
>
	<div class="dialog-inner">
		<div class="dialog-top">
			<span class="eyebrow">OLOYE</span><button
				class="close-button"
				aria-label="Close dialog"
				onclick={close}
			>
				<Icon name="close" />
			</button>
		</div>
		<h2 id="overlay-title" class="editorial">{title}</h2>
		{#if shownOverlay === 'search'}
			<SearchForm
				id="site-search"
				bind:value={query}
				bind:input={searchInput}
				onSubmit={submitSearch}
			/>
			<p class="small-note search-note" role="status">
				{query.trim()
					? `${found.length} ${found.length === 1 ? 'result' : 'results'} for “${query.trim()}”`
					: 'Explore the new arrivals'}
			</p>
			<div class="mini-products">
				{#each results as product}<a href={`/products/${product.id}`} onclick={closeForNavigation}>
						<div class="mini-image">
							<CampaignImage
								image={product.images[0].key}
								alt={product.images[0].alt}
								position={product.images[0].position}
								sizes="90px"
							/>
						</div>
						<div>
							<span class="small-note">{categories[product.category].label}</span>
							<h3>{product.name}</h3>
							<p>{formatPrice(sellingPrice(product))}</p>
						</div>
						<Icon name="arrow" size={18} />
					</a>{/each}
			</div>
			{#if results.length === 0}<p class="empty-note">
					No pieces match that search. Try “tailoring”, “denim” or “loafers”.
				</p>{/if}
			<a
				class="button-link search-all"
				href={`/search${query.trim() ? `?${new URLSearchParams({ q: query.trim() })}` : ''}`}
				onclick={closeForNavigation}
			>
				{query.trim() ? `View all ${found.length} results` : 'Explore the complete edit'}<Icon
					name="arrow"
					size={18}
				/>
			</a>
		{:else if shownOverlay === 'menu'}
			<nav aria-label="Mobile navigation">
				<div class="mobile-links">
					{#each navigation as item}<details>
							<summary>{item.label}<Icon name="plus" size={20} /></summary><a
								href={`/collections/${item.slug}`}
								onclick={closeForNavigation}
							>
								Explore all {item.label.toLowerCase()} →
							</a>{#each item.links as link}<a href={link.href} onclick={closeForNavigation}>
									{link.label}
								</a>{/each}
						</details>{/each}<a
						class="new-arrivals"
						href="/collections/new-arrivals"
						onclick={closeForNavigation}
					>
						New Arrivals<Icon name="arrow" />
					</a>
					<a class="new-arrivals sale-link" href="/collections/sale" onclick={closeForNavigation}>
						Sale<Icon name="arrow" />
					</a>
				</div>
				<div class="mobile-utilities">
					<button onclick={() => (presentation.overlay = 'search')}>
						<Icon name="search" />Search
					</button><button onclick={() => (presentation.overlay = 'account')}>
						<Icon name="user" />Account
					</button><button onclick={() => (presentation.overlay = 'wishlist')}>
						<Icon name="heart" />Wishlist ({presentation.wishlist.length})
					</button>
				</div>
			</nav>
		{:else if shownOverlay === 'wishlist'}
			<p class="small-note">
				{saved.length}
				{saved.length === 1 ? 'piece' : 'pieces'} to come back to.
			</p>
			{#if saved.length}<div class="mini-products">
					{#each saved as product}<div class="saved-product">
							<a href={`/products/${product.id}`} onclick={closeForNavigation}>
								<div class="mini-image">
									<CampaignImage
										image={product.images[0].key}
										alt={product.images[0].alt}
										position={product.images[0].position}
										sizes="90px"
									/>
								</div>
								<div>
									<h3>{product.name}</h3>
									<p>{formatPrice(sellingPrice(product))}</p>
								</div>
							</a><button
								class="remove"
								aria-label={`Remove ${product.name} from wishlist`}
								onclick={() => presentation.toggleWishlist(product.id, product.name)}
							>
								<Icon name="close" size={18} />
							</button>
						</div>{/each}
				</div>{:else}<div class="empty-state">
					<Icon name="heart" size={34} />
					<p>A little inspiration, saved.</p>
					<span>Tap the heart on a piece you love to keep it here.</span>
				</div>{/if}
			<p class="small-note state-note">
				{presentation.wishlistPersists ? 'Saved on this device.' : 'Saved for this visit.'}
			</p>
			<a href="/collections/new-arrivals" class="button-link" onclick={closeForNavigation}>
				Explore new arrivals<Icon name="arrow" size={18} />
			</a>
		{:else if shownOverlay === 'account'}
			<div class="empty-state">
				<Icon name="user" size={34} />
				<p>Your wardrobe. Your world.</p>
				<span>
					Personal accounts will open with the OLOYE store. For now, explore the collection and save
					your favourites.
				</span>
			</div>
			<a class="button-link" href="/collections/new-arrivals" onclick={closeForNavigation}>
				Discover the collection<Icon name="arrow" size={18} />
			</a>
		{:else if shownOverlay === 'bag'}
			<div class="empty-state">
				<Icon name="bag" size={34} />
				<p>Your bag is waiting.</p>
				<span>The collection is a first look. Shopping will open at launch.</span>
			</div>
			<a href="/collections/new-arrivals" class="button-link" onclick={closeForNavigation}>
				Find your inspiration<Icon name="arrow" size={18} />
			</a>
		{/if}
	</div>
</dialog>

<style>
	dialog {
		margin: 0 0 0 auto;
		padding: 0;
		border: 0;
		width: min(540px, 100%);
		height: 100dvh;
		max-height: 100dvh;
		max-width: 100%;
		background: var(--paper);
		color: var(--obsidian);
		overflow-y: auto;
	}
	dialog::backdrop {
		background: #17181780;
	}
	.dialog-inner {
		padding: 1.5rem clamp(1.25rem, 4vw, 2.5rem) 2.5rem;
	}
	.dialog-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2.5rem;
	}
	.close-button {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
	}
	h2 {
		font-size: clamp(2.6rem, 6vw, 3.6rem);
		max-width: 360px;
		margin-bottom: 1.75rem;
	}
	.small-note {
		overflow-wrap: anywhere;
		font-size: 0.69rem;
		color: var(--muted);
		line-height: 1.7;
	}
	.search-note {
		margin-top: 1.25rem;
	}
	.search-all {
		margin-top: 1.75rem;
	}
	.sale-link {
		color: var(--oxblood);
	}
	.mini-products {
		margin-top: 1.2rem;
	}
	.mini-products a {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding-block: 1rem;
		border-bottom: 1px solid var(--line);
		flex: 1;
	}
	.mini-products a > :global(svg) {
		margin-left: auto;
		transition: transform 260ms var(--ease-out);
	}
	.mini-products a:is(:hover, :focus-visible) > :global(svg) {
		transform: translateX(4px);
	}
	.mini-products a:hover {
		color: var(--oxblood);
	}
	.mini-image {
		width: 80px;
		aspect-ratio: 3/4;
		flex-shrink: 0;
	}
	.mini-products h3 {
		font-size: 0.85rem;
		font-weight: 500;
	}
	.mini-products p {
		font-size: 0.75rem;
		margin-top: 0.4rem;
	}
	.saved-product {
		display: flex;
		align-items: center;
	}
	.remove {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
	}
	.empty-state {
		padding-block: 2rem 3rem;
	}
	.empty-state p {
		font-size: 1rem;
		margin: 1.5rem 0 0.75rem;
	}
	.empty-state span {
		display: block;
		font-size: 0.82rem;
		line-height: 1.8;
		color: var(--muted);
		max-width: 360px;
	}
	.empty-note {
		font-size: 0.9rem;
		line-height: 1.7;
		margin-top: 2rem;
	}
	.state-note {
		margin: 1.5rem 0;
	}
	.mobile-links details {
		border-bottom: 1px solid var(--line);
	}
	.mobile-links summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1.2rem;
		font-family: var(--font-editorial);
		font-size: 2rem;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	details[open] summary :global(svg) {
		transform: rotate(45deg);
	}
	.mobile-links summary :global(svg) {
		transition: transform 220ms var(--ease-out);
	}
	.mobile-links details a {
		display: block;
		padding: 0.65rem 0.25rem;
		font-size: 0.82rem;
	}
	.mobile-links details a:last-child {
		margin-bottom: 1rem;
	}
	.mobile-links details a:hover {
		color: var(--oxblood);
		transform: translateX(3px);
	}
	.mobile-links details a {
		transition:
			color 160ms ease,
			transform 240ms var(--ease-out);
	}
	@media (prefers-reduced-motion: no-preference) {
		.mobile-menu .mobile-links > * {
			animation: menu-enter 340ms var(--ease-out) both;
		}
		.mobile-menu .mobile-links > :nth-child(2) {
			animation-delay: 35ms;
		}
		.mobile-menu .mobile-links > :nth-child(3) {
			animation-delay: 70ms;
		}
		.mobile-menu .mobile-links > :nth-child(4) {
			animation-delay: 105ms;
		}
		.mobile-menu .mobile-links > :nth-child(5) {
			animation-delay: 140ms;
		}
		.mobile-menu .mobile-links > :nth-child(6) {
			animation-delay: 175ms;
		}
		.mobile-menu .mobile-links > :nth-child(7) {
			animation-delay: 200ms;
		}
	}
	@keyframes menu-enter {
		from {
			opacity: 0;
			transform: translateY(9px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.new-arrivals {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1.4rem;
		font-family: var(--font-editorial);
		font-size: 2rem;
	}
	.mobile-utilities {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--line);
		padding-top: 1.25rem;
		gap: 0.25rem;
	}
	.mobile-utilities button {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-align: left;
		height: 44px;
		font-size: 0.85rem;
	}
</style>
