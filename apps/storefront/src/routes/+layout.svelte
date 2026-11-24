<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { navigating } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { reducedMotion } from '#lib/motion/motion.js';
	import LoadingIndicator from '#lib/components/LoadingIndicator.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import Overlays from '#lib/components/layout/Overlays.svelte';
	import { createPresentation } from '#lib/state/presentation.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	const presentation = createPresentation();
	onNavigate((navigation) => {
		const from = navigation.from?.url.pathname;
		const to = navigation.to?.url.pathname;
		const discovery = (path: string) => /^\/(collections|search)(\/|$)/.test(path);
		if (
			!from ||
			!to ||
			from === to ||
			!discovery(from) ||
			!discovery(to) ||
			reducedMotion() ||
			!document.startViewTransition
		)
			return;
		return new Promise<void>((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			transition.ready.catch(() => {});
			transition.finished.catch(() => {});
		});
	});
	onMount(() => {
		presentation.restoreWishlist();
		const sync = (event: StorageEvent) => presentation.handleStorage(event);
		window.addEventListener('storage', sync);
		return () => window.removeEventListener('storage', sync);
	});
</script>

<LoadingIndicator active={navigating.to !== null} />
<a class="skip-link" href="#main-content">Skip to content</a>
<Header />
{@render children()}
<Footer />
<Overlays />
<div class="sr-only" role="status" aria-live="polite">{presentation.announcement}</div>
