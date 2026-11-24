<script lang="ts">
	import TextLink from '#lib/components/ui/TextLink.svelte';
</script>

<section class="brand shell" aria-labelledby="brand-title">
	<p class="eyebrow">A name. A point of view.</p>
	<h2 id="brand-title" class="editorial">Distinction is a way<br />of <em>being.</em></h2>
	<p class="brand-copy">
		Inspired by Olóyè — a name of honour and distinction.<br />Contemporary style for those who move
		through the world on their own terms.
	</p>
	<TextLink href="/information/about">Our story</TextLink>
</section>

<style>
	.brand {
		text-align: center;
		padding-block: 5.5rem;
	}
	.brand .eyebrow {
		color: var(--muted);
		margin-bottom: 1.8rem;
	}
	h2 {
		font-size: clamp(3.5rem, 6vw, 6.5rem);
	}
	h2 em {
		font-weight: 400;
		color: var(--oxblood);
	}
	.brand-copy {
		font-size: 0.8rem;
		line-height: 1.9;
		max-width: 550px;
		margin: 1.5rem auto 1.1rem;
		color: var(--muted);
	}
	@media (max-width: 760px) {
		.brand {
			padding-block: 3.5rem;
		}
		h2 {
			font-size: 3.6rem;
		}
		.brand-copy {
			font-size: 0.73rem;
		}
	}
</style>
