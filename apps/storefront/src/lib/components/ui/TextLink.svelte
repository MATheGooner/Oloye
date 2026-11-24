<script lang="ts">
	import Icon from './Icon.svelte';
	import type { Snippet } from 'svelte';
	let {
		href,
		children,
		light = false
	}: { href: string; children: Snippet; light?: boolean } = $props();
</script>

<a {href} class:light class="text-link">{@render children()}<Icon name="arrow" size={18} /></a>

<style>
	.text-link {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		border-bottom: 1px solid currentColor;
		padding: 0.65rem 0;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		transition:
			color 180ms ease,
			transform 220ms var(--ease-out);
	}
	.text-link :global(svg) {
		transition: transform 300ms var(--ease-out);
	}
	.text-link:is(:hover, :focus-visible) :global(svg) {
		transform: translateX(4px);
	}
	.text-link:active {
		transform: translateY(1px);
	}
	.light {
		color: var(--ivory);
	}
</style>
