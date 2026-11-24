<script lang="ts">
	import CampaignImage from '#lib/components/ui/CampaignImage.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { parallax } from '#lib/motion/motion.js';
</script>

<section class="hero" aria-labelledby="campaign-title">
	<div class="hero-copy">
		<div class="hero-kicker">
			<span class="eyebrow">The new collection</span><span class="edition">O / 01</span>
		</div>
		<h1 id="campaign-title" class="editorial"><span>The art of</span>{' '}<em>presence.</em></h1>
		<p>For the moments you step into.<br />And the impression you leave behind.</p>
		<a class="button-link" href="/collections/new-arrivals">
			Discover the collection<Icon name="arrow" size={19} />
		</a>
		<div class="hero-footnote">
			<span class="eyebrow">Distinctly you. Unmistakably OLOYE.</span><span
				class="scroll-cue"
				aria-hidden="true"
			>
				↓
			</span>
		</div>
	</div>
	<div class="hero-image" use:parallax>
		<div class="hero-frame">
			<CampaignImage
				image="presence"
				alt="Contemporary Black male model walking in a tan jacket, white trousers and black boots"
				sizes="(min-width: 761px) 52vw, 100vw"
				eager
				position="center bottom"
			/>
		</div>
		<span class="image-note">A new perspective — OLOYE</span>
	</div>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: 48% 52%;
		max-width: 1680px;
		margin: auto;
		min-height: 620px;
		height: clamp(620px, 48vw, 740px);
	}
	.hero-copy {
		background: var(--ivory);
		padding: 2.5rem var(--gutter) 1.65rem;
		position: relative;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
	}
	.hero-kicker {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.edition {
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		color: var(--muted);
	}
	h1 {
		font-size: clamp(4.3rem, 7.6vw, 8rem);
		margin-top: auto;
		margin-bottom: 1.5rem;
		width: 115%;
		position: relative;
		z-index: 1;
	}
	h1 span,
	h1 em {
		display: block;
	}
	h1 em {
		color: var(--oxblood);
		font-weight: 400;
	}
	.hero-copy > p {
		font-size: 0.85rem;
		line-height: 1.8;
		color: #494942;
		margin-bottom: 1.7rem;
	}
	.hero-footnote {
		margin-top: auto;
		padding-top: 3rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.hero-footnote .eyebrow {
		font-size: 0.54rem;
		letter-spacing: 0.13em;
	}
	.scroll-cue {
		font-size: 1.25rem;
	}
	.hero-image {
		position: relative;
		overflow: hidden;
		background: #faf9fc;
	}
	.hero-image :global(img) {
		object-fit: contain;
	}
	.hero-frame {
		height: 100%;
	}
	@media (prefers-reduced-motion: no-preference) {
		.hero-kicker {
			animation: hero-enter 650ms var(--ease-out) both;
		}
		h1 span {
			animation: hero-enter 850ms var(--ease-out) 70ms both;
		}
		h1 em {
			animation: hero-enter 950ms var(--ease-out) 190ms both;
		}
		.hero-copy > p {
			animation: hero-enter 700ms var(--ease-out) 280ms both;
		}
		.hero-copy > .button-link {
			animation: hero-enter 700ms var(--ease-out) 380ms backwards;
		}
		.hero-footnote,
		.image-note {
			animation: hero-enter 700ms var(--ease-out) 460ms both;
		}
		.hero-frame {
			animation: campaign-enter 1100ms var(--ease-out) 120ms both;
		}
		.scroll-cue {
			animation: scroll-hint 900ms var(--ease-out) 1100ms 2;
		}
	}
	@media (min-width: 1001px) and (prefers-reduced-motion: no-preference) {
		.hero-frame :global(img) {
			transform: translate3d(0, var(--campaign-offset, 0px), 0) scale(1.02);
		}
		:global(.parallax-active) .hero-frame :global(img) {
			will-change: transform;
		}
	}
	@keyframes hero-enter {
		from {
			opacity: 0;
			transform: translate3d(0, 26px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}
	@keyframes campaign-enter {
		from {
			opacity: 0;
			transform: translate3d(18px, 0, 0) scale(1.035);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
	@keyframes scroll-hint {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}
	.image-note {
		position: absolute;
		bottom: 1.9rem;
		left: 2rem;
		font-size: 0.58rem;
		letter-spacing: 0.06em;
	}
	@media (min-width: 1500px) {
		h1 {
			margin-bottom: 2rem;
		}
	}
	@media (max-width: 1000px) and (min-width: 761px) {
		.hero {
			min-height: 560px;
			height: 560px;
		}
		h1 {
			font-size: 5rem;
		}
		.hero-copy {
			padding-top: 2rem;
		}
		.hero-footnote {
			padding-top: 2rem;
		}
	}
	@media (max-width: 760px) {
		.hero {
			display: flex;
			flex-direction: column;
			height: auto;
			min-height: 0;
		}
		.hero-copy {
			padding: 1.65rem var(--gutter) 2rem;
		}
		h1 {
			margin-top: 2.4rem;
			font-size: clamp(4.3rem, 15.5vw, 7rem);
			width: 100%;
			margin-bottom: 1.2rem;
		}
		h1 span,
		h1 em {
			display: block;
		}
		.hero-copy > p {
			font-size: 0.78rem;
			margin-bottom: 1.25rem;
		}
		.hero-footnote {
			display: none;
		}
		.hero-image {
			height: 480px;
		}
		.hero-image :global(img) {
			object-fit: contain;
		}
		.image-note {
			left: var(--gutter);
			bottom: 1.2rem;
		}
	}
	@media (max-width: 420px) {
		.hero-image {
			height: 420px;
		}
	}
</style>
