<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import TextLink from '#lib/components/ui/TextLink.svelte';
</script>

<section class="promotion" aria-labelledby="occasion-title">
	<div class="promotion-copy">
		<p class="eyebrow">The occasion edit</p>
		<h2 id="occasion-title" class="editorial">Dress for<br /><em>the feeling.</em></h2>
		<p>Some nights deserve something exceptional.</p>
		<TextLink href="/collections/clothing?category=suits&category=dresses" light>
			Discover after hours
		</TextLink><span class="occasion-number"> OLOYE / AFTER HOURS </span>
	</div>
	<div class="promotion-image">
		<CampaignImage
			image="tailoring"
			alt="Black male model in an ivory suit holding a black bag, photographed in a grey studio"
			sizes="(min-width: 761px) 50vw, 100vw"
			position="center 30%"
		/>
	</div>
</section>

<style>
	.promotion {
		max-width: 1680px;
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 540px;
		background: var(--oxblood);
		color: var(--ivory);
	}
	.promotion-copy {
		padding: 3rem var(--gutter);
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	h2 {
		font-size: clamp(3.5rem, 6vw, 6.5rem);
		margin-top: auto;
		margin-bottom: 1.2rem;
	}
	h2 em {
		font-weight: 400;
	}
	.promotion-copy > p:not(.eyebrow) {
		font-size: 0.76rem;
		margin-bottom: 1.3rem;
		line-height: 1.7;
	}
	.occasion-number {
		margin-top: auto;
		padding-top: 2rem;
		font-size: 0.54rem;
		letter-spacing: 0.12em;
		color: #d4bec2;
	}
	.promotion-image {
		overflow: hidden;
	}
	@media (max-width: 760px) {
		.promotion {
			height: auto;
			grid-template-columns: 1fr;
		}
		.promotion-copy {
			padding-block: 2.4rem;
		}
		h2 {
			margin-top: 2rem;
			font-size: 4.5rem;
		}
		.occasion-number {
			padding-top: 2rem;
		}
		.promotion-image {
			height: 450px;
		}
		.promotion-image :global(img) {
			object-position: center 25% !important;
		}
	}
</style>
