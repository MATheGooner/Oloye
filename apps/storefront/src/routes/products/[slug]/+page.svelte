<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import TextLink from '#lib/components/ui/TextLink.svelte';
	import { categories, formatPrice, sellingPrice } from '#lib/catalogue/categories.js';
	import { collectionHref } from '#lib/catalogue/collections.js';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let image = $derived(data.product.images[0]);
	let department = $derived(categories[data.product.category].department);
</script>

<svelte:head>
	<title>{data.product.name} — OLOYE</title><meta
		name="description"
		content={data.product.description}
	/><meta name="robots" content="noindex" />
</svelte:head>

<main id="main-content" class="product-preview shell">
	<div class="preview-copy">
		<a class="back" href={collectionHref(department, [data.product.category])}>
			← Back to {categories[data.product.category].label.toLowerCase()}
		</a>
		<p class="eyebrow">{data.product.brand} · {categories[data.product.category].label}</p>
		<h1 class="editorial">{data.product.name}</h1>
		<p class="price">
			{formatPrice(sellingPrice(data.product))}{#if data.product.salePrice !== undefined}<del>
					{formatPrice(data.product.price)}
				</del>{/if}
		</p>
		<p class="description">{data.product.description}</p>
		<p class="preview-note">A first look at the OLOYE wardrobe.<br />More on this piece, soon.</p>
		<TextLink href={collectionHref(department)}>Continue exploring</TextLink>
	</div>
	<div class="preview-image">
		<CampaignImage
			image={image.key}
			alt={image.alt}
			position={image.position}
			fit={image.fit}
			eager
			sizes="(min-width: 761px) 50vw, 100vw"
		/>
	</div>
</main>

<style>
	.product-preview {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 4rem;
		padding-block: 3.5rem;
		min-height: 670px;
	}
	.preview-copy {
		padding-top: 1rem;
	}
	.back {
		font-size: 0.7rem;
		display: inline-block;
		margin-bottom: 3rem;
	}
	.preview-copy > .eyebrow {
		color: var(--muted);
		margin-bottom: 1.5rem;
	}
	h1 {
		font-size: clamp(3.5rem, 5.5vw, 5.5rem);
	}
	.price {
		display: flex;
		gap: 0.75rem;
		font-size: 0.92rem;
		margin-top: 1.5rem;
	}
	del {
		color: var(--muted);
	}
	.description {
		font-size: 0.88rem;
		line-height: 1.9;
		margin-top: 1.5rem;
		max-width: 400px;
	}
	.preview-note {
		max-width: 400px;
		border-top: 1px solid var(--line);
		margin-top: 2rem;
		padding-top: 1.5rem;
		font-size: 0.77rem;
		line-height: 1.9;
		color: var(--muted);
	}
	.preview-copy > :global(a:last-child) {
		margin-top: 1.5rem;
	}
	.preview-image {
		max-height: 680px;
		min-height: 460px;
		background: var(--ivory);
		overflow: hidden;
	}
	@media (max-width: 760px) {
		.product-preview {
			grid-template-columns: minmax(0, 1fr);
			gap: 2rem;
			padding-block: 2rem;
		}
		.back {
			margin-bottom: 2rem;
		}
		h1 {
			font-size: 3.25rem;
		}
		.preview-image {
			height: 480px;
		}
	}
</style>
