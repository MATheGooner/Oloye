<script lang="ts">
	import ProductCard from '#lib/components/ui/ProductCard.svelte';
	import TextLink from '#lib/components/ui/TextLink.svelte';
	import { products, productCaptions } from '#lib/content/home.js';
</script>

<section id="new-arrivals" class="arrivals shell" aria-labelledby="arrivals-title">
	<div class="section-heading">
		<div>
			<p class="eyebrow">Just arrived</p>
			<h2 id="arrivals-title" class="editorial">The next favourites.</h2>
		</div>
		<TextLink href="/collections/new-arrivals">View the edit</TextLink>
	</div>
	<div class="product-grid">
		{#each products as product, index}<ProductCard
				{product}
				variant="home"
				categoryLabel={productCaptions[product.id]}
				revealDelay={index * 55}
			/>{/each}
	</div>
</section>

<style>
	.arrivals {
		padding-block: 1.5rem 5rem;
	}
	.product-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1.25rem;
	}
	@media (max-width: 760px) {
		.arrivals {
			padding-block: 0.5rem 3.5rem;
		}
		.product-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2rem 0.85rem;
		}
		.section-heading {
			flex-wrap: wrap;
			gap: 0.75rem;
		}
	}
</style>
