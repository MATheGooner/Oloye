<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import TextLink from '#lib/components/ui/TextLink.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.preview.title} — OLOYE</title><meta
		name="description"
		content={data.preview.description}
	/><meta name="robots" content="noindex" />
</svelte:head>
<main id="main-content" class="preview shell">
	<div class="preview-copy">
		<a href="/" class="back">← Back to OLOYE</a>
		<p class="eyebrow">{data.preview.eyebrow}</p>
		<h1 class="editorial">{data.preview.title}</h1>
		<p class="description">{data.preview.description}</p>
		<div class="launch-note">
			<span class="eyebrow">A first look</span>
			<p>
				The OLOYE collection is taking shape. This is a style preview; shopping opens at launch.
			</p>
			<p>
				Photography is an editorial reference. Names, prices and colour options are illustrative.
			</p>
		</div>
		<TextLink href="/#new-arrivals">Continue exploring</TextLink>
	</div>
	<div class="preview-image">
		<CampaignImage
			image={data.preview.image}
			alt={data.preview.alt}
			eager
			sizes="(min-width: 761px) 50vw, 100vw"
		/>
	</div>
</main>

<style>
	.preview {
		display: grid;
		grid-template-columns: 1fr 1fr;
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
		font-size: clamp(3.5rem, 6vw, 6rem);
	}
	.description {
		font-size: 0.95rem;
		line-height: 1.8;
		margin-top: 1.5rem;
		max-width: 400px;
	}
	.launch-note {
		max-width: 400px;
		border-top: 1px solid var(--line);
		margin-top: 2rem;
		padding-top: 1.5rem;
	}
	.launch-note p {
		font-size: 0.75rem;
		line-height: 1.8;
		color: var(--muted);
		margin-top: 0.75rem;
	}
	.launch-note + :global(a) {
		margin-top: 1.5rem;
	}
	.preview-image {
		max-height: 680px;
		min-height: 460px;
	}
	@media (max-width: 760px) {
		.preview {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding-block: 2rem;
		}
		.back {
			margin-bottom: 2rem;
		}
		h1 {
			font-size: 3.7rem;
		}
		.preview-image {
			height: 480px;
		}
	}
</style>
