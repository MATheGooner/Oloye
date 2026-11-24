<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { DiscoveryState, FilterKey, FilterOptions } from '#lib/catalogue/types.js';
	let {
		filters,
		options,
		onToggle,
		onPrice,
		prefix = 'desktop',
		mobile = false
	}: {
		filters: DiscoveryState;
		options: FilterOptions;
		onToggle: (key: FilterKey, value: string) => void;
		onPrice: (min?: number, max?: number) => void;
		prefix?: string;
		mobile?: boolean;
	} = $props();
	let minInput: HTMLInputElement | undefined = $state();
	let maxInput: HTMLInputElement | undefined = $state();
	let priceError = $state('');

	export function applyPrice(focusInvalid = true): boolean {
		if (!minInput || !maxInput) return true;
		const min = minInput.value === '' ? undefined : minInput.valueAsNumber;
		const max = maxInput.value === '' ? undefined : maxInput.valueAsNumber;
		if (
			[min, max].some(
				(value) => value !== undefined && (!Number.isFinite(value) || value < 0 || value > 100000)
			) ||
			minInput.validity.badInput ||
			maxInput.validity.badInput
		) {
			priceError = 'Enter a price between €0 and €100,000.';
			if (focusInvalid) minInput.focus();
			return false;
		}
		if (min !== undefined && max !== undefined && min > max) {
			priceError = 'The minimum price must be below the maximum.';
			if (focusInvalid) minInput.focus();
			return false;
		}
		priceError = '';
		onPrice(min, max);
		return true;
	}

	export function resetPrice() {
		if (minInput) minInput.value = '';
		if (maxInput) maxInput.value = '';
		priceError = '';
	}
</script>

<div class="filter-panel">
	<details open>
		<summary>Category<Icon name="plus" size={16} /></summary>
		<fieldset class="category-options">
			<legend class="sr-only">Category</legend>
			{#each options.category as option}<label class="checkbox-row">
					<input
						type="checkbox"
						name="category"
						value={option.value}
						aria-label={option.label}
						checked={filters.category.includes(option.value as DiscoveryState['category'][number])}
						onchange={() => onToggle('category', option.value)}
					/><span>{option.label}</span><span class="option-count" aria-hidden="true">
						{option.count}
					</span>
				</label>{/each}
		</fieldset>
	</details>
	<details open>
		<summary>Size<Icon name="plus" size={16} /></summary>
		<fieldset class="size-options">
			<legend class="sr-only">Size</legend>
			{#each options.size as option}<label
					class="size-option"
					class:selected={filters.size.includes(option.value)}
				>
					<input
						type="checkbox"
						name="size"
						value={option.value}
						aria-label={`Size ${option.label}`}
						checked={filters.size.includes(option.value)}
						onchange={() => onToggle('size', option.value)}
					/><span>{option.label}</span>
				</label>{/each}
		</fieldset>
	</details>
	<details open>
		<summary>Colour<Icon name="plus" size={16} /></summary>
		<fieldset class="color-options">
			<legend class="sr-only">Colour</legend>
			{#each options.colour as option}<label class="checkbox-row">
					<input
						type="checkbox"
						name="colour"
						value={option.value}
						aria-label={`Colour ${option.label}`}
						checked={(filters.colour as string[]).includes(option.value)}
						onchange={() => onToggle('colour', option.value)}
					/><span class="swatch" style:background={option.swatch}></span><span>{option.label}</span>
				</label>{/each}
		</fieldset>
	</details>
	<details open>
		<summary>Price<Icon name="plus" size={16} /></summary>
		<form
			class="price-form"
			onsubmit={(event) => {
				event.preventDefault();
				applyPrice();
			}}
			novalidate
		>
			<fieldset>
				<legend class="sr-only">Price in EUR</legend>
				<div class="price-inputs">
					<label for={`${prefix}-min`}>
						From (€)<input
							bind:this={minInput}
							id={`${prefix}-min`}
							type="number"
							inputmode="numeric"
							min="0"
							max="100000"
							step="1"
							name="min"
							value={filters.minPrice ?? ''}
							placeholder="0"
							aria-invalid={!!priceError}
							aria-describedby={`${prefix}-price-note`}
							oninput={() => {
								if (mobile) applyPrice(false);
							}}
						/>
					</label><span class="range-dash" aria-hidden="true">—</span><label for={`${prefix}-max`}>
						To (€)<input
							bind:this={maxInput}
							id={`${prefix}-max`}
							type="number"
							inputmode="numeric"
							min="0"
							max="100000"
							step="1"
							name="max"
							value={filters.maxPrice ?? ''}
							placeholder="Any"
							aria-invalid={!!priceError}
							aria-describedby={`${prefix}-price-note`}
							oninput={() => {
								if (mobile) applyPrice(false);
							}}
						/>
					</label>
				</div>
				{#if !mobile}<button class="apply-price" type="submit">
						Apply price<Icon name="arrow" size={14} />
					</button>{/if}
			</fieldset>
			<p
				id={`${prefix}-price-note`}
				class="price-note"
				class:error={!!priceError}
				role={priceError ? 'alert' : undefined}
			>
				{priceError || 'Prices in EUR, including sale reductions.'}
			</p>
		</form>
	</details>
</div>

<style>
	details {
		border-bottom: 1px solid var(--line);
		padding-bottom: 0.25rem;
	}
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 55px;
		padding-block: 0.85rem;
		font-size: 0.76rem;
		font-weight: 500;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	details[open] summary :global(svg) {
		transform: rotate(45deg);
	}
	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
		min-width: 0;
	}
	.category-options {
		max-height: 310px;
		overflow-y: auto;
		scrollbar-width: thin;
		padding-bottom: 0.75rem;
	}
	.checkbox-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 36px;
		padding: 0.35rem 0.1rem;
		font-size: 0.7rem;
		cursor: pointer;
	}
	input[type='checkbox'] {
		width: 14px;
		height: 14px;
		accent-color: var(--oxblood);
		flex-shrink: 0;
		cursor: pointer;
	}
	.option-count {
		margin-left: auto;
		color: var(--muted);
		font-size: 0.63rem;
		padding-right: 0.5rem;
	}
	.size-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		padding-bottom: 1.1rem;
	}
	.size-option {
		position: relative;
		display: flex;
		cursor: pointer;
	}
	.size-option input {
		position: absolute;
		inset: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		margin: 0;
	}
	.size-option span {
		display: grid;
		place-items: center;
		border: 1px solid var(--line);
		min-width: 36px;
		min-height: 36px;
		padding: 0.35rem 0.55rem;
		font-size: 0.65rem;
	}
	.size-option.selected span {
		background: var(--obsidian);
		color: var(--paper);
		border-color: var(--obsidian);
	}
	.size-option input:focus-visible + span {
		outline: 2px solid var(--obsidian);
		outline-offset: 3px;
	}
	.color-options {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0 0.5rem;
		padding-bottom: 1rem;
	}
	.color-options .checkbox-row {
		gap: 0.4rem;
		font-size: 0.65rem;
	}
	.swatch {
		width: 11px;
		height: 11px;
		border: 1px solid #17181730;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.price-inputs {
		display: flex;
		gap: 0.5rem;
		align-items: end;
	}
	.price-inputs label {
		min-width: 0;
		flex: 1;
		font-size: 0.62rem;
		color: var(--muted);
	}
	.price-inputs input {
		display: block;
		width: 100%;
		border: 1px solid var(--line);
		height: 40px;
		padding: 0.5rem;
		background: transparent;
		color: var(--obsidian);
		font-size: 0.75rem;
		margin-top: 0.5rem;
	}
	.range-dash {
		align-self: end;
		line-height: 40px;
		color: var(--muted);
		font-size: 0.65rem;
	}
	.apply-price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		border-bottom: 1px solid var(--line);
		padding-block: 0.85rem;
		margin-top: 0.25rem;
		font-size: 0.67rem;
	}
	.apply-price:hover {
		color: var(--oxblood);
	}
	.price-note {
		font-size: 0.6rem;
		line-height: 1.7;
		color: var(--muted);
		padding-block: 0.75rem 1rem;
	}
	.error {
		color: var(--oxblood);
	}
	@media (max-width: 1000px) {
		summary {
			min-height: 60px;
			font-size: 0.82rem;
		}
		.checkbox-row {
			min-height: 42px;
			font-size: 0.8rem;
		}
		.color-options .checkbox-row {
			font-size: 0.75rem;
		}
		.size-option span {
			min-width: 44px;
			min-height: 44px;
			font-size: 0.73rem;
		}
		.price-inputs input {
			height: 44px;
			font-size: 1rem;
		}
		.price-note {
			font-size: 0.68rem;
		}
	}
</style>
