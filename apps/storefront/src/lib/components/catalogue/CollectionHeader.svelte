<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import { collections, collectionNavigation, collectionHref } from '#lib/catalogue/collections.js';
	import type { Collection } from '#lib/catalogue/types.js';
	import { reveal } from '#lib/motion/motion.js';
	let { collection }: { collection: Collection } = $props();
</script>

<section
	class="collection-heading shell"
	aria-labelledby="collection-title"
	use:reveal={{ targets: '.heading-copy > *, .campaign-image' }}
>
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">
			{collection.label}
		</span>
	</nav>
	<div
		class="collection-hero"
		class:footwear={collection.slug === 'footwear'}
		class:sale={collection.slug === 'sale'}
	>
		<div class="heading-copy">
			<div class="heading-kicker">
				<span class="eyebrow">The OLOYE edit</span><span class="edition">
					O / {collection.edition}
				</span>
			</div>
			<h1 id="collection-title" class="editorial">{collection.title}</h1>
			<p class="statement editorial"><em>{collection.statement}</em></p>
			<p class="description">{collection.description}</p>
		</div>
		<div class="campaign-image">
			<CampaignImage
				image={collection.image.key}
				alt={collection.image.alt}
				position={collection.image.position}
				fit={collection.image.fit}
				eager
				sizes="(min-width: 1001px) 32vw, (min-width: 761px) 40vw, 100vw"
			/>
		</div>
	</div>
	<nav class="collection-tabs" aria-label="Collections">
		{#each collectionNavigation as slug}<a
				href={collectionHref(slug)}
				aria-current={collection.slug === slug ? 'page' : undefined}
				class:sale-link={slug === 'sale'}
			>
				{collections[slug].label}
			</a>{/each}
	</nav>
</section>

<style>
	.breadcrumbs {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		padding-block: 1.5rem;
		font-size: 0.64rem;
		color: var(--muted);
	}
	.breadcrumbs a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.collection-hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 34%;
		background: var(--ivory);
		min-height: 310px;
	}
	.heading-copy {
		padding: 2rem 2.5rem;
		min-width: 0;
	}
	.heading-kicker {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		color: var(--muted);
	}
	.edition {
		font-size: 0.62rem;
		letter-spacing: 0.1em;
	}
	h1 {
		font-size: clamp(3.25rem, 5.1vw, 5.25rem);
		margin-top: 1.4rem;
	}
	.statement {
		font-size: clamp(1.9rem, 2.9vw, 3rem);
		color: var(--oxblood);
		margin-top: 0.4rem;
	}
	.statement em {
		font-weight: 400;
	}
	.description {
		max-width: 450px;
		font-size: 0.79rem;
		line-height: 1.8;
		margin-top: 1.25rem;
		color: #494942;
	}
	.campaign-image {
		min-height: 310px;
		max-height: 380px;
		overflow: hidden;
	}
	.footwear .campaign-image {
		background: #00050a;
	}
	.sale {
		background: var(--oxblood);
		color: var(--paper);
	}
	.sale .statement {
		color: var(--ivory);
	}
	.sale .description,
	.sale .heading-kicker {
		color: #e9e5dccf;
	}
	.collection-tabs {
		display: flex;
		gap: 2.15rem;
		overflow-x: auto;
		border-bottom: 1px solid var(--line);
		scrollbar-width: thin;
	}
	.collection-tabs a {
		display: flex;
		align-items: center;
		min-height: 60px;
		flex-shrink: 0;
		border-bottom: 2px solid transparent;
		font-size: 0.72rem;
	}
	.collection-tabs a[aria-current='page'] {
		border-color: var(--obsidian);
		font-weight: 500;
	}
	.collection-tabs a:hover {
		border-color: var(--line);
	}
	.sale-link {
		color: var(--oxblood);
	}
	@media (max-width: 1000px) {
		.collection-hero {
			grid-template-columns: minmax(0, 1fr) 38%;
		}
		.heading-copy {
			padding: 1.75rem;
		}
	}
	@media (max-width: 760px) {
		.breadcrumbs {
			padding-block: 1.2rem;
		}
		.collection-hero {
			grid-template-columns: 1fr;
		}
		.heading-copy {
			padding: 1.5rem;
		}
		h1 {
			font-size: clamp(2.7rem, 10vw, 3.8rem);
			margin-top: 1.2rem;
		}
		.statement {
			font-size: 2.1rem;
		}
		.description {
			font-size: 0.75rem;
			margin-top: 1rem;
		}
		.campaign-image {
			height: 200px;
			min-height: 200px;
		}
		.collection-tabs {
			gap: 1.6rem;
		}
		.collection-tabs a {
			min-height: 56px;
			font-size: 0.68rem;
		}
	}
</style>
