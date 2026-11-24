<script lang="ts">
	import { untrack } from 'svelte';
	import { animateDialog } from '#lib/motion/motion.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { clickedBackdrop, trapDialogFocus } from '#lib/components/ui/dialog.js';
	import FilterPanel from './FilterPanel.svelte';
	import {
		clearFilters,
		copyDiscoveryState,
		filterCount,
		filterProducts,
		toggleFilter
	} from '#lib/catalogue/discovery.js';
	import type { DiscoveryState, FilterOptions, Product } from '#lib/catalogue/types.js';
	let {
		open,
		filters,
		options,
		products,
		onApply,
		onClose
	}: {
		open: boolean;
		filters: DiscoveryState;
		options: FilterOptions;
		products: readonly Product[];
		onApply: (filters: DiscoveryState) => void;
		onClose: () => void;
	} = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let visible = $state(false);
	let panel: { applyPrice: () => boolean; resetPrice: () => void } | undefined = $state();
	let draft = $state<DiscoveryState>({
		query: '',
		sort: 'featured',
		category: [],
		size: [],
		colour: []
	});
	let count = $derived(filterProducts(products, draft).length);

	$effect(() => {
		if (!dialog) return;
		const element = dialog;
		let stopped = false;
		if (open) {
			untrack(() => {
				draft = copyDiscoveryState(filters);
			});
			visible = true;
			if (!element.open) element.showModal();
			animateDialog(element, true, 'right');
		} else if (element.open) {
			const finish = () => {
				if (!stopped && !open) {
					element.close();
					visible = false;
				}
			};
			const animation = animateDialog(element, false);
			if (animation) animation.finished.then(finish).catch(() => {});
			else finish();
		}
		return () => {
			stopped = true;
		};
	});
	$effect(() => {
		if (!visible) return;
		const overflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = overflow;
		};
	});
</script>

<svelte:window
	onresize={() => {
		if (open && window.innerWidth > 1000) onClose();
	}}
/>

<dialog
	bind:this={dialog}
	aria-labelledby="filter-drawer-title"
	oncancel={(event) => {
		event.preventDefault();
		onClose();
	}}
	onclose={(event) => {
		if (!event.currentTarget.open) onClose();
	}}
	onkeydown={(event) => {
		if (dialog) trapDialogFocus(dialog, event);
	}}
	onclick={(event) => {
		if (dialog && clickedBackdrop(dialog, event)) onClose();
	}}
>
	<div class="drawer-top">
		<div>
			<span class="eyebrow">The OLOYE edit</span>
			<h2 id="filter-drawer-title" class="editorial">Refine your view.</h2>
		</div>
		<button class="close" aria-label="Close filters" onclick={onClose}>
			<Icon name="close" />
		</button>
	</div>
	{#if visible}
		<div class="drawer-body">
			<div class="drawer-summary">
				<p role="status">
					{`${count} ${count === 1 ? 'piece matches' : 'pieces match'} your selection`}
				</p>
				<button
					aria-label="Clear all filters"
					disabled={!filterCount(draft)}
					onclick={() => {
						draft = clearFilters(draft);
						panel?.resetPrice();
					}}
				>
					Clear all
				</button>
			</div>
			<FilterPanel
				bind:this={panel}
				filters={draft}
				{options}
				prefix="mobile"
				mobile
				onToggle={(key, value) => {
					draft = toggleFilter(draft, key, value);
				}}
				onPrice={(minPrice, maxPrice) => {
					draft = { ...draft, minPrice, maxPrice };
				}}
			/>
		</div>
		<div class="drawer-bottom">
			<button
				class="button-link"
				onclick={() => {
					if (panel?.applyPrice() === false) return;
					onApply(copyDiscoveryState(draft));
					onClose();
				}}
			>
				Show {count}
				{count === 1 ? 'piece' : 'pieces'}<Icon name="arrow" size={18} />
			</button>
		</div>
	{/if}
</dialog>

<style>
	dialog {
		margin: 0 0 0 auto;
		padding: 0;
		border: 0;
		width: min(440px, 100%);
		height: 100dvh;
		max-height: 100dvh;
		max-width: 100%;
		background: var(--paper);
		color: var(--obsidian);
		overflow-y: auto;
	}
	dialog::backdrop {
		background: #17181780;
	}
	.drawer-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.5rem 1.5rem 1.25rem;
		border-bottom: 1px solid var(--line);
	}
	h2 {
		font-size: 2.45rem;
		margin-top: 0.7rem;
	}
	.close {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
	}
	.drawer-body {
		padding: 0.75rem 1.5rem 1.5rem;
	}
	.drawer-summary {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		justify-content: space-between;
		padding-block: 0.65rem;
	}
	.drawer-summary p {
		font-size: 0.65rem;
		color: var(--muted);
	}
	.drawer-summary button {
		font-size: 0.67rem;
		text-decoration: underline;
		text-underline-offset: 4px;
		padding: 0.5rem 0;
		flex-shrink: 0;
	}
	.drawer-summary button:disabled {
		opacity: 0.4;
	}
	.drawer-bottom {
		position: sticky;
		bottom: 0;
		padding: 1rem 1.5rem max(1rem, env(safe-area-inset-bottom));
		background: var(--paper);
		border-top: 1px solid var(--line);
	}
	.drawer-bottom button {
		width: 100%;
	}
	@media (max-width: 360px) {
		.drawer-top,
		.drawer-body,
		.drawer-bottom {
			padding-inline: 1.25rem;
		}
		h2 {
			font-size: 2.15rem;
		}
	}
</style>
