<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	let {
		id,
		value = $bindable(''),
		input = $bindable(),
		onSubmit,
		onClear,
		placeholder = 'Try tailoring, denim or loafers'
	}: {
		id: string;
		value?: string;
		input?: HTMLInputElement;
		onSubmit: (query: string) => void;
		onClear?: () => void;
		placeholder?: string;
	} = $props();
</script>

<form
	class="search-form"
	action="/search"
	method="GET"
	role="search"
	onsubmit={(event) => {
		event.preventDefault();
		onSubmit(value.trim().slice(0, 120));
	}}
>
	<label for={id} class="sr-only">Search the OLOYE catalogue</label>
	<Icon name="search" />
	<input
		bind:this={input}
		{id}
		type="search"
		name="q"
		bind:value
		{placeholder}
		autocomplete="off"
		maxlength="120"
	/>
	{#if value}<button
			aria-label="Clear search"
			type="button"
			onclick={() => {
				value = '';
				onClear?.();
				input?.focus();
			}}
		>
			<Icon name="close" size={16} />
		</button>{/if}
	<button class="submit" aria-label="Search catalogue" type="submit">
		<Icon name="arrow" size={19} />
	</button>
</form>

<style>
	.search-form {
		display: flex;
		align-items: center;
		gap: 1rem;
		border-bottom: 1px solid var(--obsidian);
		padding-bottom: 0.65rem;
	}
	input {
		min-width: 0;
		flex: 1;
		background: transparent;
		border: 0;
		height: 44px;
		font-size: 0.85rem;
	}
	input::-webkit-search-cancel-button {
		display: none;
	}
	button {
		flex-shrink: 0;
		width: 36px;
		height: 44px;
		display: grid;
		place-items: center;
	}
	.submit {
		width: 40px;
	}
	@media (max-width: 420px) {
		.search-form {
			gap: 0.5rem;
		}
		input {
			font-size: 0.8rem;
		}
	}
</style>
