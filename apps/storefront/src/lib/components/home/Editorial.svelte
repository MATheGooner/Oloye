<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import TextLink from '#lib/components/ui/TextLink.svelte';
</script>

<section class="journal shell" aria-labelledby="journal-title">
	<div class="section-heading">
		<div>
			<p class="eyebrow">The OLOYE journal</p>
			<h2 id="journal-title" class="editorial">Beyond the wardrobe.</h2>
		</div>
		<span class="journal-note">Ideas to wear. Stories to live.</span>
	</div>
	<div class="editorial-grid">
		<a class="feature-story" href="/preview/after-hours">
			<div class="feature-image">
				<CampaignImage
					image="after-hours"
					alt="Black female model in a black evening dress, reclining across a pale studio plinth"
					sizes="(min-width: 900px) 65vw, 100vw"
				/>
			</div>
			<div class="story-caption">
				<div>
					<p class="eyebrow">Style notes / 01</p>
					<h3 class="editorial">When the evening is yours.</h3>
				</div>
				<span class="read-story">Read the story ↗</span>
			</div>
		</a>
		<article class="side-story">
			<a href="/preview/ease-in-motion" class="side-image">
				<CampaignImage
					image="menswear"
					alt="Black male model in a contemporary patterned shirt and light shorts"
					sizes="(min-width: 900px) 30vw, 50vw"
					position="center top"
				/>
			</a>
			<div>
				<p class="eyebrow">In conversation / 02</p>
				<h3 class="editorial">Ease in motion.</h3>
				<p class="story-description">The new rules of getting dressed?<br />Make them your own.</p>
				<TextLink href="/preview/ease-in-motion">Explore the story</TextLink>
			</div>
		</article>
	</div>
</section>

<style>
	.journal {
		padding-block: 5rem;
	}
	.journal-note {
		font-size: 0.72rem;
		color: var(--muted);
		margin-bottom: 0.4rem;
	}
	.editorial-grid {
		display: grid;
		grid-template-columns: 1.9fr 1fr;
		gap: 2.5rem;
	}
	.feature-image {
		aspect-ratio: 1.5;
		overflow: hidden;
		background: #d1d1cf;
	}
	.feature-image :global(img),
	.side-image :global(img) {
		transition: transform 0.5s;
	}
	a:hover :global(img) {
		transform: scale(1.025);
	}
	.story-caption {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 1.4rem;
	}
	.story-caption .eyebrow {
		color: var(--muted);
		margin-bottom: 0.65rem;
	}
	h3 {
		font-size: clamp(2rem, 3vw, 3.2rem);
	}
	.read-story {
		font-size: 0.65rem;
		white-space: nowrap;
		margin-bottom: 0.3rem;
	}
	.side-story {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}
	.side-image {
		display: block;
		aspect-ratio: 1.5;
		overflow: hidden;
	}
	.side-story .eyebrow {
		margin-bottom: 0.8rem;
		color: var(--muted);
	}
	.story-description {
		font-size: 0.76rem;
		color: var(--muted);
		line-height: 1.7;
		margin: 1rem 0 0.75rem;
	}
	@media (max-width: 760px) {
		.journal {
			padding-block: 3.5rem;
		}
		.journal-note {
			display: none;
		}
		.editorial-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.story-caption {
			align-items: start;
		}
		.read-story {
			display: none;
		}
		.side-story {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			align-items: center;
		}
		.side-image {
			aspect-ratio: 0.75;
		}
		.side-story h3 {
			font-size: 2rem;
		}
		.story-description {
			font-size: 0.7rem;
		}
	}
</style>
