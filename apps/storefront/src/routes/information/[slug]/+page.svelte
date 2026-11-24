<script lang="ts">
	import photography from '#lib/content/photography.json';
	import TextLink from '#lib/components/ui/TextLink.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.content.title} — OLOYE</title><meta
		name="description"
		content={data.content.intro}
	/>
</svelte:head>
<main id="main-content" class="information shell">
	<a href="/" class="back">← Back to OLOYE</a>
	<div class="information-heading">
		<p class="eyebrow">The details</p>
		<h1 class="editorial">{data.content.title}</h1>
		<p class="intro">{data.content.intro}</p>
	</div>
	<div class="information-content">
		{#each data.content.sections as section}<section>
				<h2>{section.heading}</h2>
				<p>{section.text}</p>
			</section>{/each}{#if data.photography}<ul class="credits">
				{#each Object.values(photography) as photo}<li>
						<a href={photo.source} target="_blank" rel="noreferrer">
							{photo.photographer} — {photo.key.replaceAll('-', ' ')} ↗
						</a>
					</li>{/each}
			</ul>
			<a class="license" href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">
				Pexels licence ↗
			</a>{/if}
		<div class="related">
			<a href="/information/support">Client services</a><a href="/information/shipping-returns">
				Shipping & returns
			</a><a href="/information/contact">Contact</a>
		</div>
		<TextLink href="/">Return to the collection</TextLink>
	</div>
</main>

<style>
	.information {
		padding-block: 3rem 5rem;
		max-width: 1200px;
	}
	.back {
		font-size: 0.7rem;
	}
	.information-heading {
		margin-top: 3rem;
		max-width: 750px;
	}
	.information-heading .eyebrow {
		margin-bottom: 1.5rem;
		color: var(--muted);
	}
	h1 {
		font-size: clamp(3rem, 6vw, 5.5rem);
	}
	.intro {
		margin-top: 1.5rem;
		font-size: 1rem;
		line-height: 1.7;
	}
	.information-content {
		max-width: 680px;
		margin-top: 3rem;
	}
	section {
		margin-bottom: 2rem;
	}
	section h2 {
		font-size: 0.9rem;
		font-weight: 500;
		margin-bottom: 0.8rem;
	}
	section p {
		font-size: 0.85rem;
		line-height: 1.9;
		color: var(--muted);
	}
	.related {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		border-top: 1px solid var(--line);
		padding-top: 1.5rem;
		margin-block: 2rem;
		font-size: 0.7rem;
	}
	.related a,
	.credits a,
	.license {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.credits {
		font-size: 0.8rem;
		line-height: 2.3;
		margin-bottom: 1rem;
	}
	.license {
		font-size: 0.8rem;
	}
	@media (max-width: 760px) {
		.information {
			padding-block: 2rem 3rem;
		}
		.information-heading {
			margin-top: 2rem;
		}
		.intro {
			font-size: 0.9rem;
		}
	}
</style>
