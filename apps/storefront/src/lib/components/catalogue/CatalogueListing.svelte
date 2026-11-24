<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { motionDuration, reveal } from '#lib/motion/motion.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	import ProductCard from '#lib/components/ui/ProductCard.svelte';
	import CollectionHeader from './CollectionHeader.svelte';
	import FilterPanel from './FilterPanel.svelte';
	import FilterDrawer from './FilterDrawer.svelte';
	import ActiveFilters from './ActiveFilters.svelte';
	import SearchForm from './SearchForm.svelte';
	import { categories, sortOptions } from '#lib/catalogue/categories.js';
	import { collectionHref } from '#lib/catalogue/collections.js';
	import {
		clearFilters,
		collectionProducts,
		filterCount,
		filterOptions,
		filterProducts,
		readDiscoveryState,
		searchProducts,
		sortProducts,
		toggleFilter,
		writeDiscoveryState
	} from '#lib/catalogue/discovery.js';
	import type {
		CategorySlug,
		Collection,
		DiscoveryState,
		FilterKey,
		SortOrder
	} from '#lib/catalogue/types.js';

	let { collection, search = false }: { collection: Collection; search?: boolean } = $props();
	let filters = $derived(readDiscoveryState(page.url.searchParams));
	let source = $derived(collectionProducts(collection.slug));
	let matching = $derived(searchProducts(source, filters.query));
	let displayed = $derived(sortProducts(filterProducts(matching, filters), filters.sort));
	let options = $derived(filterOptions(matching));
	let selectedCount = $derived(filterCount(filters));
	let drawerOpen = $state(false);
	let showSidebar = $state(true);
	let query = $state('');
	let desktopPanel: { resetPrice: () => void } | undefined = $state();
	let pendingUrl: URL | undefined;

	$effect(() => {
		query = filters.query;
	});
	afterNavigate(() => {
		drawerOpen = false;
	});

	async function updateState(update: (filters: DiscoveryState) => DiscoveryState) {
		const next = new URL(pendingUrl ?? page.url.href);
		writeDiscoveryState(next.searchParams, update(readDiscoveryState(next.searchParams)));
		next.hash = '';
		pendingUrl = next;
		try {
			await goto(next, { reset: false });
		} finally {
			if (pendingUrl === next) pendingUrl = undefined;
		}
	}

	const toggle = (key: FilterKey, value: string) =>
		updateState((current) => toggleFilter(current, key, value));
	const clear = () => {
		desktopPanel?.resetPrice();
		return updateState(clearFilters);
	};
	const price = (minPrice?: number, maxPrice?: number) =>
		updateState((current) => ({ ...current, minPrice, maxPrice }));
	const searchFor = (value: string) =>
		goto(`/search${value ? `?${new URLSearchParams({ q: value })}` : ''}`, {
			reset: false
		});

	function categoryHref(category?: CategorySlug) {
		const params = new URLSearchParams(page.url.search);
		writeDiscoveryState(params, { ...filters, category: category ? [category] : [] });
		return `${page.url.pathname}${params.size ? `?${params}` : ''}`;
	}
</script>

<main
	id="main-content"
	class="catalogue-page"
	use:reveal={{ targets: '.search-heading > *', stagger: 45 }}
>
	{#if search}
		<section class="search-heading shell" aria-labelledby="search-title">
			<nav class="breadcrumbs" aria-label="Breadcrumb">
				<a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Search</span>
			</nav>
			<p class="eyebrow">The OLOYE wardrobe</p>
			<h1 id="search-title" class="editorial">Find your next favourite.</h1>
			<div class="page-search">
				<SearchForm
					id="catalogue-search"
					bind:value={query}
					onSubmit={searchFor}
					onClear={() => searchFor('')}
				/>
			</div>
			<p class="search-context">
				{filters.query
					? `The search for “${filters.query}”`
					: 'Search by piece, collection or category. A world of possibility awaits.'}
			</p>
		</section>
	{:else}<CollectionHeader {collection} />{/if}
	<section
		class="listing shell"
		aria-label={search ? 'Search results' : `${collection.label} products`}
	>
		{#if options.category.length > 1}
			<nav class="category-links" aria-label="Browse by category">
				<a href={categoryHref()} aria-current={!filters.category.length ? 'true' : undefined}>
					All pieces
				</a>{#each options.category as option}<a
						href={categoryHref(option.value as CategorySlug)}
						aria-current={filters.category.length === 1 && filters.category[0] === option.value
							? 'true'
							: undefined}
					>
						{option.label}
					</a>{/each}
			</nav>
		{/if}
		<div class="listing-toolbar">
			<div class="toolbar-left">
				<button
					class="desktop-filter-toggle"
					aria-expanded={showSidebar}
					aria-controls="catalogue-filters"
					onclick={() => (showSidebar = !showSidebar)}
				>
					<Icon name="filter" size={17} />{showSidebar
						? 'Hide filters'
						: 'Show filters'}{#if selectedCount}<span class="filter-count">
							{selectedCount}
						</span>{/if}
				</button>
				<button
					class="mobile-filter-toggle"
					aria-haspopup="dialog"
					onclick={() => (drawerOpen = true)}
				>
					<Icon name="filter" size={17} />Filters{#if selectedCount}<span class="filter-count">
							{selectedCount}
						</span>{/if}
				</button>
				<p class="product-count" role="status" aria-live="polite">
					{`${displayed.length}${selectedCount ? ` of ${matching.length}` : ''} ${(selectedCount ? matching.length : displayed.length) === 1 ? 'piece' : 'pieces'}`}
				</p>
			</div>
			<div class="sort-control">
				<label for="catalogue-sort">Sort by</label><select
					id="catalogue-sort"
					name="sort"
					value={filters.sort}
					onchange={(event) =>
						updateState((current) => ({
							...current,
							sort: event.currentTarget.value as SortOrder
						}))}
				>
					{#each sortOptions as option}<option value={option.value}>{option.label}</option>{/each}
				</select><Icon name="chevron" size={13} />
			</div>
		</div>
		<ActiveFilters
			{filters}
			onRemove={toggle}
			onClear={clear}
			onClearPrice={() => {
				desktopPanel?.resetPrice();
				price();
			}}
		/>
		<div class="listing-layout" class:with-sidebar={showSidebar}>
			<aside id="catalogue-filters" class:hidden={!showSidebar} aria-label="Product filters">
				<FilterPanel
					bind:this={desktopPanel}
					{filters}
					{options}
					onToggle={toggle}
					onPrice={price}
				/>
			</aside>
			<div class="listing-results">
				{#if displayed.length}
					<ul class="product-grid" aria-label="Products">
						{#each displayed as product, index (product.id)}<li
								animate:flip={{ duration: motionDuration(260), easing: cubicOut }}
								in:fly={{ y: 10, duration: motionDuration(240), easing: cubicOut }}
								out:fade={{ duration: motionDuration(110) }}
							>
								<ProductCard {product} revealDelay={(index % 3) * 45} />
							</li>{/each}
					</ul>
					<div class="end-note">
						<p>
							You've seen all {displayed.length}
							{displayed.length === 1 ? 'piece' : 'pieces'} in this view.
						</p>
						<a href="#main-content">Back to top ↑</a>
					</div>
				{:else}
					<div
						class="empty-state"
						in:fly={{ y: 8, duration: motionDuration(220), easing: cubicOut }}
					>
						<Icon name={search && !selectedCount ? 'search' : 'filter'} size={29} />
						<p class="eyebrow">A fresh perspective</p>
						<h2 class="editorial">
							{selectedCount
								? 'No pieces match your filters.'
								: filters.query
									? 'No matches. More possibilities.'
									: 'The edit is taking shape.'}
						</h2>
						<p class="empty-description">
							{selectedCount
								? 'Try removing a size or colour, or widening your price range.'
								: filters.query
									? `We couldn't find a piece for “${filters.query}”. Try a name or category, such as “knitwear” or “loafers”.`
									: 'Discover something new in the complete OLOYE wardrobe.'}
						</p>
						<div class="empty-actions">
							{#if selectedCount}<button class="button-link" onclick={clear}>
									Clear all filters<Icon name="arrow" size={17} />
								</button>{:else if filters.query}<button
									class="button-link"
									onclick={() => searchFor('')}
								>
									Clear search<Icon name="arrow" size={17} />
								</button>{/if}<a class="browse-link" href={collectionHref('all')}>
								Explore the complete edit →
							</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>
	<FilterDrawer
		open={drawerOpen}
		{filters}
		{options}
		products={matching}
		onApply={(draft) => updateState(() => draft)}
		onClose={() => (drawerOpen = false)}
	/>
</main>

<style>
	.catalogue-page {
		view-transition-name: oloye-discovery;
	}
	.listing {
		padding-bottom: 4rem;
	}
	.category-links {
		display: flex;
		gap: 0.65rem;
		overflow-x: auto;
		scrollbar-width: thin;
		padding-block: 1.6rem 0.25rem;
	}
	.category-links a {
		flex-shrink: 0;
		border: 1px solid var(--line);
		padding: 0.5rem 0.85rem;
		min-height: 35px;
		font-size: 0.63rem;
		color: var(--muted);
	}
	.category-links a[aria-current='true'] {
		border-color: var(--obsidian);
		background: var(--obsidian);
		color: var(--paper);
	}
	.category-links a:hover {
		border-color: var(--obsidian);
		background: var(--ivory);
	}
	.category-links a[aria-current='true']:hover {
		background: var(--obsidian);
	}
	.listing-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 1.5rem;
	}
	.toolbar-left {
		display: flex;
		align-items: center;
		gap: 1.6rem;
	}
	.desktop-filter-toggle,
	.mobile-filter-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-height: 44px;
		font-size: 0.72rem;
	}
	.mobile-filter-toggle {
		display: none;
	}
	.filter-count {
		font-size: 0.59rem;
		background: var(--obsidian);
		color: var(--paper);
		min-width: 19px;
		height: 19px;
		display: grid;
		place-items: center;
		border-radius: 50%;
	}
	.product-count {
		font-size: 0.67rem;
		color: var(--muted);
	}
	.sort-control {
		position: relative;
		display: flex;
		gap: 0.8rem;
		align-items: center;
		font-size: 0.7rem;
	}
	.sort-control label {
		color: var(--muted);
	}
	.sort-control select {
		font: inherit;
		background: transparent;
		min-height: 44px;
		border: 0;
		border-bottom: 1px solid var(--line);
		padding: 0.5rem 1.5rem 0.5rem 0.25rem;
		width: 150px;
		appearance: none;
		cursor: pointer;
		color: var(--obsidian);
	}
	.sort-control :global(svg) {
		pointer-events: none;
		position: absolute;
		right: 0.25rem;
	}
	.listing-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2.25rem;
		align-items: start;
	}
	.listing-layout.with-sidebar {
		grid-template-columns: 200px minmax(0, 1fr);
	}
	aside {
		min-width: 0;
		border-top: 1px solid var(--line);
	}
	aside.hidden {
		display: none;
	}
	.listing-results {
		min-width: 0;
	}
	.product-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 2.8rem 1.15rem;
	}
	.with-sidebar .product-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.product-grid li {
		min-width: 0;
	}
	.end-note {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		border-top: 1px solid var(--line);
		margin-top: 3rem;
		padding-top: 1.5rem;
		font-size: 0.65rem;
		color: var(--muted);
	}
	.end-note a {
		color: var(--obsidian);
	}
	.empty-state {
		padding: 5rem 1rem;
		min-height: 450px;
		max-width: 550px;
		margin-inline: auto;
		text-align: center;
	}
	.empty-state > :global(svg) {
		margin: 0 auto 1.6rem;
	}
	.empty-state .eyebrow {
		color: var(--muted);
		margin-bottom: 1rem;
	}
	.empty-state h2 {
		font-size: clamp(2.8rem, 4vw, 4rem);
	}
	.empty-description {
		font-size: 0.83rem;
		line-height: 1.9;
		margin: 1.25rem auto 1.75rem;
		max-width: 380px;
		color: var(--muted);
		overflow-wrap: anywhere;
	}
	.empty-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.4rem;
	}
	.browse-link {
		font-size: 0.72rem;
		text-decoration: underline;
		text-underline-offset: 5px;
	}
	.search-heading {
		padding-bottom: 1.5rem;
	}
	.breadcrumbs {
		display: flex;
		gap: 0.75rem;
		padding-block: 1.5rem 2rem;
		font-size: 0.64rem;
		color: var(--muted);
	}
	.search-heading > .eyebrow {
		color: var(--muted);
		margin-bottom: 1rem;
	}
	.search-heading h1 {
		font-size: clamp(3rem, 5vw, 5rem);
		max-width: 850px;
	}
	.page-search {
		max-width: 620px;
		margin-top: 2rem;
	}
	.search-context {
		color: var(--muted);
		font-size: 0.76rem;
		line-height: 1.8;
		margin-top: 1rem;
		overflow-wrap: anywhere;
	}
	@media (max-width: 1000px) {
		.listing-layout.with-sidebar {
			grid-template-columns: minmax(0, 1fr);
		}
		aside,
		.desktop-filter-toggle {
			display: none;
		}
		.mobile-filter-toggle {
			display: inline-flex;
		}
		.product-grid,
		.with-sidebar .product-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (max-width: 760px) {
		.product-grid,
		.with-sidebar .product-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2rem 0.85rem;
		}
		.category-links {
			padding-top: 1.25rem;
		}
		.category-links a {
			min-height: 40px;
			display: flex;
			align-items: center;
		}
		.listing-toolbar {
			gap: 0.5rem;
			flex-wrap: wrap;
			padding-block: 1.15rem;
		}
		.toolbar-left {
			gap: 1rem;
		}
		.sort-control label {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
		}
		.sort-control select {
			width: 144px;
			font-size: 0.67rem;
		}
		.product-count {
			font-size: 0.61rem;
		}
		.mobile-filter-toggle {
			font-size: 0.7rem;
			gap: 0.45rem;
		}
		.listing {
			padding-bottom: 3rem;
		}
		.end-note {
			flex-wrap: wrap;
			margin-top: 2.5rem;
			line-height: 1.7;
		}
		.empty-state {
			padding-block: 3.5rem;
		}
		.breadcrumbs {
			padding-block: 1.2rem 1.8rem;
		}
		.search-heading h1 {
			font-size: 3rem;
		}
		.page-search {
			margin-top: 1.5rem;
		}
	}
	@media (max-width: 370px) {
		.product-count {
			width: 100%;
		}
		.toolbar-left {
			flex-wrap: wrap;
			row-gap: 0.25rem;
		}
		.listing-toolbar {
			align-items: start;
		}
		.sort-control select {
			width: 140px;
		}
	}
</style>
