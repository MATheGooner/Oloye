<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { motionDuration } from '#lib/motion/motion.js';
	import { categories, colors, formatPrice } from '#lib/catalogue/categories.js';
	import { filterCount } from '#lib/catalogue/discovery.js';
	import type { DiscoveryState, FilterKey } from '#lib/catalogue/types.js';
	let {
		filters,
		onRemove,
		onClear,
		onClearPrice
	}: {
		filters: DiscoveryState;
		onRemove: (key: FilterKey, value: string) => void;
		onClear: () => void;
		onClearPrice: () => void;
	} = $props();
	let priceLabel = $derived(
		filters.minPrice !== undefined && filters.maxPrice !== undefined
			? `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`
			: filters.minPrice !== undefined
				? `From ${formatPrice(filters.minPrice)}`
				: filters.maxPrice !== undefined
					? `Up to ${formatPrice(filters.maxPrice)}`
					: ''
	);
</script>

{#if filterCount(filters)}
	<div
		class="active-filters"
		aria-label="Active filters"
		in:fly={{ y: 6, duration: motionDuration(180) }}
		out:fade={{ duration: motionDuration(100) }}
	>
		{#each filters.category as value (value)}<button
				class="filter-chip"
				transition:scale={{ start: 0.94, duration: motionDuration(160) }}
				aria-label={`Remove category: ${categories[value].label}`}
				onclick={() => onRemove('category', value)}
			>
				{categories[value].label}<Icon name="close" size={12} />
			</button>{/each}
		{#each filters.size as value (value)}<button
				class="filter-chip"
				transition:scale={{ start: 0.94, duration: motionDuration(160) }}
				aria-label={`Remove size: ${value}`}
				onclick={() => onRemove('size', value)}
			>
				{value}<Icon name="close" size={12} />
			</button>{/each}
		{#each filters.colour as value (value)}<button
				class="filter-chip"
				transition:scale={{ start: 0.94, duration: motionDuration(160) }}
				aria-label={`Remove colour: ${colors[value].name}`}
				onclick={() => onRemove('colour', value)}
			>
				{colors[value].name}<Icon name="close" size={12} />
			</button>{/each}
		{#if priceLabel}<button
				class="filter-chip"
				transition:scale={{ start: 0.94, duration: motionDuration(160) }}
				aria-label={`Remove price: ${priceLabel}`}
				onclick={onClearPrice}
			>
				{priceLabel}<Icon name="close" size={12} />
			</button>{/if}
		<button class="clear-filters" aria-label="Clear all filters" onclick={onClear}>
			Clear all
		</button>
	</div>
{/if}

<style>
	.active-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 1.4rem;
	}
	.filter-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		min-height: 35px;
		border: 1px solid var(--line);
		padding: 0.5rem 0.65rem;
		font-size: 0.65rem;
	}
	.filter-chip:hover {
		border-color: var(--obsidian);
		background: var(--ivory);
	}
	.clear-filters {
		font-size: 0.65rem;
		text-decoration: underline;
		text-underline-offset: 4px;
		padding: 0.6rem;
	}
	@media (max-width: 760px) {
		.active-filters {
			gap: 0.4rem;
		}
		.filter-chip {
			min-height: 40px;
		}
	}
</style>
