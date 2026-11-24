<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import TextLink from '#lib/components/ui/TextLink.svelte';
	import { footwear } from '#lib/content/home.js';
	let selected = $state(0);
	let angle = $state(0);
	let shoe = $derived(footwear[selected]!);
	let photo = $derived(shoe.images[angle] ?? shoe.images[0]);
	function select(index: number) {
		selected = index;
		angle = 0;
	}
</script>

<section class="footwear" aria-labelledby="footwear-title">
	<div class="footwear-inner shell">
		<div class="footwear-copy">
			<p class="eyebrow">The footwear edit</p>
			<h2 id="footwear-title" class="editorial">Good style.<br /><em>From the ground up.</em></h2>
			<div class="selectors" role="group" aria-label="Footwear styles">
				{#each footwear as item, index}<button
						aria-pressed={selected === index}
						class:chosen={selected === index}
						onclick={() => select(index)}
					>
						{item.label}
					</button>{/each}
			</div>
			<div class="shoe-copy" aria-live="polite">
				<h3>{shoe.title}</h3>
				<p>{shoe.description}</p>
			</div>
			<TextLink href="/collections/footwear" light>Explore footwear</TextLink><span
				class="photo-note"
			>
				A closer look, through photography.
			</span>
		</div>
		<div class="footwear-visual">
			<div class="shoe-image">
				<CampaignImage image={photo.key} alt={photo.alt} sizes="(min-width: 900px) 55vw, 100vw" />
			</div>
			<div class="image-footer">
				<span class="eyebrow">{shoe.label} / {String(selected + 1).padStart(2, '0')}</span>
				<div class="angles" role="group" aria-label="Photographic views">
					{#each shoe.images as item, index}<button
							class:chosen={angle === index}
							aria-pressed={angle === index}
							onclick={() => (angle = index)}
						>
							{item.label}
						</button>{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.footwear {
		background: var(--obsidian);
		color: var(--ivory);
	}
	.footwear-inner {
		display: grid;
		grid-template-columns: minmax(0, 0.43fr) minmax(0, 0.57fr);
		padding-block: 4rem;
		align-items: center;
		gap: 2rem;
	}
	.footwear-copy {
		padding-right: 1rem;
	}
	.footwear-copy > .eyebrow {
		color: #c2b39a;
		margin-bottom: 1.7rem;
	}
	h2 {
		font-size: clamp(3rem, 4.9vw, 5rem);
	}
	h2 em {
		font-weight: 400;
	}
	.selectors {
		display: flex;
		flex-wrap: wrap;
		gap: 1.4rem;
		margin-top: 2rem;
		border-bottom: 1px solid #e9e5dc40;
	}
	.selectors button {
		font-size: 0.7rem;
		padding-block: 0.65rem;
		color: #b3b0a8;
		border-bottom: 1px solid transparent;
	}
	.selectors .chosen {
		color: var(--ivory);
		border-color: var(--ivory);
	}
	.shoe-copy {
		margin-block: 1.8rem 1.2rem;
		min-height: 115px;
	}
	.shoe-copy h3 {
		font-size: 0.86rem;
		font-weight: 500;
		margin-bottom: 0.65rem;
	}
	.shoe-copy p {
		font-size: 0.76rem;
		line-height: 1.8;
		color: #bcb9b1;
		max-width: 335px;
	}
	.photo-note {
		display: block;
		font-size: 0.56rem;
		color: #aaa69e;
		margin-top: 1.75rem;
	}
	.footwear-visual {
		min-width: 0;
	}
	.shoe-image {
		height: 525px;
		background: #111;
	}
	.shoe-image :global(img) {
		object-fit: contain;
	}
	.image-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1.4rem;
	}
	.image-footer .eyebrow {
		font-size: 0.57rem;
	}
	.angles {
		display: flex;
		gap: 0.75rem;
	}
	.angles button {
		font-size: 0.6rem;
		min-height: 32px;
		padding-block: 0.35rem;
		border-bottom: 1px solid transparent;
		color: #bcb9b1;
	}
	.angles button.chosen {
		border-color: var(--ivory);
		color: var(--ivory);
	}
	@media (max-width: 1100px) {
		.footwear-inner {
			grid-template-columns: minmax(0, 0.45fr) minmax(0, 0.55fr);
			gap: 1rem;
		}
		.shoe-image {
			height: 470px;
		}
		.selectors {
			gap: 0.9rem;
		}
	}
	@media (max-width: 760px) {
		.footwear-inner {
			grid-template-columns: 1fr;
			padding-block: 3rem;
			gap: 2rem;
		}
		.footwear-copy {
			padding: 0;
		}
		h2 {
			font-size: clamp(3rem, 11vw, 4.5rem);
		}
		.footwear-copy > .eyebrow {
			margin-bottom: 1.2rem;
		}
		.selectors {
			gap: 1.5rem;
			margin-top: 1.6rem;
		}
		.selectors button {
			min-height: 44px;
		}
		.shoe-copy {
			min-height: 0;
		}
		.photo-note {
			margin-top: 1.2rem;
		}
		.shoe-image {
			height: 400px;
		}
		.image-footer {
			align-items: start;
		}
		.angles {
			flex-wrap: wrap;
		}
	}
</style>
