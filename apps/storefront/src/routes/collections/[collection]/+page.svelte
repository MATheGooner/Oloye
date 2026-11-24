<script lang="ts">
	import { page } from '$app/state';
	import CatalogueListing from '#lib/components/catalogue/CatalogueListing.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.collection.label} — OLOYE</title>
	<meta name="description" content={data.collection.description} />
	<link rel="canonical" href={`${page.url.origin}${page.url.pathname}`} />
</svelte:head>

<CatalogueListing collection={data.collection} />
