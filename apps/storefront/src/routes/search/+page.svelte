<script lang="ts">
	import { page } from '$app/state';
	import CatalogueListing from '#lib/components/catalogue/CatalogueListing.svelte';
	import { collections } from '#lib/catalogue/collections.js';
	let query = $derived((page.url.searchParams.get('q') ?? '').trim().slice(0, 120));
</script>

<svelte:head>
	<title>{query ? `Search “${query}”` : 'Search the catalogue'} — OLOYE</title><meta
		name="description"
		content="Find your next favourite in the OLOYE wardrobe. Search tailoring, clothing, footwear and accessories."
	/><meta name="robots" content="noindex" />
</svelte:head>

<CatalogueListing collection={collections.all} search />
