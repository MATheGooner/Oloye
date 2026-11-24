<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { collections } from '#lib/content/home.js';
</script>

<section class="collections shell" aria-labelledby="collections-title">
	<div class="section-heading">
		<div>
			<p class="eyebrow">Your wardrobe, reimagined</p>
			<h2 id="collections-title" class="editorial">A world of OLOYE.</h2>
		</div>
		<p class="section-note">New proportions.<br />Endless possibility.</p>
	</div>
	<div class="collection-grid">
		{#each collections as collection, index}<a
				class="collection"
				class:compact={index > 1}
				href={`/collections/${collection.id}`}
			>
				<div
					class="collection-image"
					class:accessory-image={collection.id === 'accessories'}
					class:footwear-image={collection.id === 'footwear'}
				>
					<CampaignImage
						image={collection.image}
						alt={collection.alt}
						sizes={index > 1 ? '(min-width: 900px) 25vw, 50vw' : '(min-width: 900px) 33vw, 50vw'}
						position={collection.id === 'accessories' ? 'center 55%' : 'center'}
					/><span class="number">{collection.number}</span>
				</div>
				<div class="collection-caption">
					<div>
						<h3 class="editorial">{collection.label}</h3>
						<p>{collection.line}</p>
					</div>
					<Icon name="arrow" size={22} />
				</div>
			</a>{/each}
	</div>
</section>

<style>
	.collections {
		padding-block: 5rem 4.5rem;
	}
	.section-note {
		font-size: 0.75rem;
		line-height: 1.7;
		color: var(--muted);
		margin-bottom: 0.4rem;
	}
	.collection-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 0.8fr;
		gap: 1.5rem;
	}
	.collection {
		min-width: 0;
		grid-row: span 2;
	}
	.collection.compact {
		grid-row: span 1;
		grid-column: 3;
	}
	.collection.compact:last-child {
		grid-row: 2;
	}
	.collection-image {
		position: relative;
		overflow: hidden;
		aspect-ratio: 0.69;
	}
	.compact .collection-image {
		aspect-ratio: 1.54;
	}
	.collection-image :global(img) {
		transition: transform 0.55s;
	}
	.collection:hover :global(img) {
		transform: scale(1.03);
	}
	.compact .accessory-image {
		aspect-ratio: 1;
	}
	.footwear-image {
		background: #00050a;
	}
	.footwear-image :global(img) {
		object-fit: contain;
	}
	.number {
		position: absolute;
		left: 0.8rem;
		top: 0.8rem;
		width: 28px;
		height: 28px;
		border: 1px solid #ffffffa6;
		color: white;
		display: grid;
		place-items: center;
		font-size: 0.56rem;
		border-radius: 50%;
		mix-blend-mode: difference;
	}
	.collection-caption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-block: 1rem 0.15rem;
	}
	h3 {
		font-size: 2.25rem;
	}
	.collection-caption p {
		font-size: 0.66rem;
		line-height: 1.5;
		color: var(--muted);
		margin-top: 0.5rem;
	}
	.compact h3 {
		font-size: 1.8rem;
	}
	.compact .collection-caption p {
		font-size: 0.62rem;
	}
	@media (max-width: 1000px) {
		.collection-grid {
			gap: 1rem;
		}
		h3 {
			font-size: 1.8rem;
		}
		.collection-caption p {
			font-size: 0.61rem;
		}
		.compact h3 {
			font-size: 1.5rem;
		}
	}
	@media (max-width: 760px) {
		.collections {
			padding-block: 3.5rem;
		}
		.collection-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.75rem 0.85rem;
		}
		.collection,
		.collection.compact,
		.collection.compact:last-child {
			grid-row: auto;
			grid-column: auto;
		}
		.collection-image {
			aspect-ratio: 0.73;
		}
		.compact .collection-image {
			aspect-ratio: 0.9;
		}
		.collection-caption {
			align-items: start;
			padding-top: 0.85rem;
		}
		.collection-caption :global(svg) {
			width: 17px;
			flex-shrink: 0;
			margin-top: 0.3rem;
		}
		.collection-caption p {
			font-size: 0.6rem;
		}
		h3,
		.compact h3 {
			font-size: 1.65rem;
		}
		.section-note {
			display: none;
		}
	}
	@media (max-width: 420px) {
		h3,
		.compact h3 {
			font-size: clamp(1.25rem, 5.5vw, 1.4rem);
		}
		.collection-caption :global(svg) {
			display: none;
		}
	}
</style>
