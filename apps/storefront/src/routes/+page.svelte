<script lang="ts">
	import Hero from '#lib/components/home/Hero.svelte';
	import Collections from '#lib/components/home/Collections.svelte';
	import NewArrivals from '#lib/components/home/NewArrivals.svelte';
	import Footwear from '#lib/components/home/Footwear.svelte';
	import Editorial from '#lib/components/home/Editorial.svelte';
	import Promotion from '#lib/components/home/Promotion.svelte';
	import BrandStatement from '#lib/components/home/BrandStatement.svelte';
	import { site } from '#lib/config/site.js';
	import { reveal } from '#lib/motion/motion.js';
</script>

<svelte:head>
	<title>OLOYE — The art of presence</title><meta
		name="description"
		content={site.description}
	/><meta property="og:title" content="OLOYE — The art of presence" /><meta
		property="og:description"
		content={site.description}
	/><meta name="theme-color" content="#171817" />
</svelte:head>

<main
	id="main-content"
	use:reveal={{
		targets:
			'.section-heading, .collection, .footwear-copy, .footwear-visual, .feature-story, .side-story, .promotion-copy, .promotion-image, .brand > *'
	}}
>
	<Hero /><Collections /><NewArrivals /><Footwear /><Editorial /><Promotion /><BrandStatement />
</main>
