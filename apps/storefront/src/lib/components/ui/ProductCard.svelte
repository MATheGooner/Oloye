<script lang="ts">
	import CampaignImage from './CampaignImage.svelte';
	import Icon from './Icon.svelte';
	import { categories, formatPrice, sellingPrice } from '#lib/catalogue/categories.js';
	import type { Product } from '#lib/catalogue/types.js';
	import { usePresentation } from '#lib/state/presentation.svelte.js';
	import { reveal, wishlistFeedback } from '#lib/motion/motion.js';
	let {
		product,
		variant = 'catalogue',
		categoryLabel,
		revealDelay = 0
	}: {
		product: Product;
		variant?: 'catalogue' | 'home';
		categoryLabel?: string;
		revealDelay?: number;
	} = $props();
	const presentation = usePresentation();
	let saved = $derived(presentation.wishlist.includes(product.id));
	let loadAlternate = $state(false);
	let primary = $derived(product.images[0]);
	let alternate = $derived(product.images[1]);
	let href = $derived(`/products/${product.id}`);
</script>

<article
	class="product-card"
	class:catalogue-card={variant === 'catalogue'}
	data-product-id={product.id}
	data-price={sellingPrice(product)}
	data-category={product.category}
	use:reveal={{ delay: revealDelay }}
>
	<div class="product-image">
		<a
			{href}
			aria-label={`View ${product.name}`}
			onpointerenter={() => (loadAlternate = true)}
			onfocus={() => (loadAlternate = true)}
		>
			<CampaignImage
				image={primary.key}
				alt={primary.alt}
				position={primary.position}
				fit={primary.fit}
				sizes="(min-width: 1440px) 340px, (min-width: 1001px) 28vw, (min-width: 761px) 30vw, 46vw"
			/>
			{#if alternate && loadAlternate}<div class="alternate-image" aria-hidden="true">
					<CampaignImage
						image={alternate.key}
						alt=""
						position={alternate.position}
						fit={alternate.fit}
						sizes="(min-width: 1440px) 340px, (min-width: 761px) 30vw, 46vw"
					/>
				</div>{/if}
		</a>
		{#if variant === 'catalogue'}
			{#if product.salePrice !== undefined}<span class="badge sale-badge">
					Sale · {Math.round((1 - product.salePrice / product.price) * 100)}% off
				</span>{:else if product.isNew}<span class="badge">New</span>{/if}
		{/if}
		<button
			class="save"
			class:saved
			aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} wishlist`}
			aria-pressed={saved}
			onclick={(event) => {
				const added = !saved;
				presentation.toggleWishlist(product.id, product.name);
				wishlistFeedback(event.currentTarget, added);
			}}
		>
			<Icon name="heart" size={18} filled={saved} />
		</button>
	</div>
	<div class="product-details">
		<p class="category">
			{categoryLabel ??
				(variant === 'catalogue'
					? `${product.brand} · ${categories[product.category].label}`
					: categories[product.category].label)}
		</p>
		<div class="product-name">
			<h3><a {href}>{product.name}</a></h3>
			<span class="pricing">
				<span class:sale-price={product.salePrice !== undefined}>
					{#if product.salePrice !== undefined}<span class="sr-only">
							Sale price
						</span>{/if}{formatPrice(sellingPrice(product))}
				</span>{#if product.salePrice !== undefined}<del>
						<span class="sr-only">Original price </span>{formatPrice(product.price)}
					</del>{/if}
			</span>
		</div>
		<ul class="colors" aria-label="Available colours">
			{#each product.colors as color}<li title={color.name}>
					<span style:background={color.value}></span><span class="sr-only">{color.name}</span>
				</li>{/each}
		</ul>
	</div>
</article>

<style>
	.product-card {
		min-width: 0;
	}
	.product-image {
		position: relative;
		aspect-ratio: 3/4;
		overflow: hidden;
		background: #dedbd4;
	}
	.product-image a {
		display: block;
		height: 100%;
	}
	.product-image :global(img) {
		transition:
			transform 700ms var(--ease-out),
			opacity 320ms ease;
	}
	.product-image a:focus-visible {
		outline-offset: -5px;
		outline: 2px solid var(--paper);
	}
	.alternate-image {
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 320ms ease,
			transform 500ms var(--ease-out);
	}
	.product-image a:focus-visible .alternate-image {
		opacity: 1;
		transform: translateY(0);
	}
	@media (hover: hover) {
		.product-image:hover :global(img) {
			transform: scale(1.05);
		}
		.product-image:hover .alternate-image {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.badge {
		position: absolute;
		top: 0.85rem;
		left: 0.8rem;
		padding: 0.35rem 0.55rem;
		background: var(--paper);
		font-size: 0.58rem;
		font-weight: 500;
		letter-spacing: 0.04em;
	}
	.sale-badge {
		color: var(--oxblood);
	}
	.save {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		background: var(--paper);
		border-radius: 50%;
		transition:
			background-color 180ms ease,
			color 180ms ease,
			transform 220ms var(--ease-out);
	}
	.saved {
		color: var(--oxblood);
	}
	.save:hover {
		background: var(--ivory);
		transform: translateY(-1px);
	}
	.save:active {
		transform: scale(0.92);
	}
	@media (prefers-reduced-motion: reduce) {
		.product-image:hover :global(img),
		.alternate-image,
		.save:hover,
		.save:active {
			transform: none;
		}
	}
	.product-details {
		padding-top: 1.1rem;
	}
	.category {
		font-size: 0.67rem;
		color: var(--muted);
		margin-bottom: 0.5rem;
	}
	.catalogue-card .category {
		font-size: 0.61rem;
		line-height: 1.5;
	}
	.product-name {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.8rem;
	}
	h3 {
		font-weight: 500;
		line-height: 1.5;
	}
	h3 a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.pricing {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		justify-content: flex-end;
	}
	del {
		color: var(--muted);
		font-size: 0.72rem;
	}
	.sale-price {
		color: var(--oxblood);
	}
	.product-name span {
		white-space: nowrap;
	}
	.colors {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.85rem;
	}
	.colors li {
		display: flex;
	}
	.colors li > span:first-child {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1px solid #0002;
	}
	@media (max-width: 600px) {
		.product-name {
			display: block;
		}
		.pricing {
			justify-content: flex-start;
			margin-top: 0.35rem;
		}
		.badge {
			top: 0.55rem;
			left: 0.5rem;
			font-size: 0.53rem;
			padding: 0.3rem 0.4rem;
		}
		.category {
			font-size: 0.62rem;
		}
		.save {
			top: 0.4rem;
			right: 0.4rem;
			width: 36px;
			height: 36px;
		}
	}
</style>
