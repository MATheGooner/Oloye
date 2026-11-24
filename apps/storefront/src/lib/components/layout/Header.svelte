<script lang="ts">
	import { tick } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { motionDuration } from '#lib/motion/motion.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { navigation } from '#lib/content/home.js';
	import { usePresentation } from '#lib/state/presentation.svelte.js';
	const presentation = usePresentation();
	let active = $state<string | null>(null);
	let header: HTMLElement;
	let selected = $derived(navigation.find((item) => item.slug === active));
	async function dismiss() {
		const slug = active;
		active = null;
		await tick();
		header.querySelector<HTMLButtonElement>(`[data-nav="${slug}"]`)?.focus();
	}
</script>

<svelte:window
	onclick={(event) => {
		if (active && !header.contains(event.target as Node)) active = null;
	}}
	onkeydown={(event) => {
		if (event.key === 'Escape' && active) dismiss();
	}}
/>

<header class="site-header" bind:this={header}>
	<a href="/collections/new-arrivals" class="announcement">
		A new perspective. Discover the latest collection <span aria-hidden="true">↗</span>
	</a>
	<div class="masthead shell">
		<div class="location">
			<Icon name="globe" size={14} /><span>A global point of view</span><span class="currency">
				EUR €
			</span>
		</div>
		<button
			class="icon-button mobile-toggle"
			aria-label="Open navigation"
			aria-haspopup="dialog"
			onclick={() => {
				active = null;
				presentation.overlay = 'menu';
			}}
		>
			<Icon name="menu" />
		</button>
		<a href="/" class="wordmark" aria-label="OLOYE™ home">
			OLOYE<span class="wordmark-dot" aria-hidden="true">™</span>
		</a>
		<div class="utilities">
			<button
				class="icon-button search"
				aria-label="Open search"
				aria-haspopup="dialog"
				onclick={() => {
					active = null;
					presentation.overlay = 'search';
				}}
			>
				<Icon name="search" />
			</button>
			<button
				class="icon-button desktop-utility"
				aria-label="Open account"
				aria-haspopup="dialog"
				onclick={() => {
					active = null;
					presentation.overlay = 'account';
				}}
			>
				<Icon name="user" />
			</button>
			<button
				class="icon-button desktop-utility"
				aria-label={`Open wishlist, ${presentation.wishlist.length} saved items`}
				aria-haspopup="dialog"
				onclick={() => {
					active = null;
					presentation.overlay = 'wishlist';
				}}
			>
				<Icon name="heart" /><span class="count" class:has-items={presentation.wishlist.length > 0}>
					{presentation.wishlist.length || ''}
				</span>
			</button>
			<button
				class="icon-button bag"
				aria-label="Open shopping bag, 0 items"
				aria-haspopup="dialog"
				onclick={() => {
					active = null;
					presentation.overlay = 'bag';
				}}
			>
				<Icon name="bag" /><span class="bag-count">0</span>
			</button>
		</div>
	</div>
	<nav class="desktop-nav" aria-label="Main navigation">
		{#each navigation as item}<button
				data-nav={item.slug}
				class:active={active === item.slug}
				aria-expanded={active === item.slug}
				aria-controls="collection-dropdown"
				onclick={() => (active = active === item.slug ? null : item.slug)}
			>
				{item.label}
			</button>{/each}
		<a href="/collections/new-arrivals">
			New Arrivals<span class="new-dot" aria-hidden="true"></span>
		</a>
		<a class="sale-link" href="/collections/sale">Sale</a>
	</nav>
	{#if selected}
		<div
			id="collection-dropdown"
			class="dropdown shell"
			in:fly={{ y: -10, duration: motionDuration(210), easing: cubicOut }}
			out:fade={{ duration: motionDuration(110) }}
		>
			<div>
				<p class="eyebrow">The OLOYE wardrobe</p>
				<a
					class="editorial dropdown-title"
					href={`/collections/${selected.slug}`}
					onclick={() => (active = null)}
				>
					{selected.label}<Icon name="arrow" size={28} />
				</a>
			</div>
			<ul>
				{#each selected.links as link}<li>
						<a href={link.href} onclick={() => (active = null)}>
							{link.label}<Icon name="arrow" size={15} />
						</a>
					</li>{/each}
			</ul>
			<div class="dropdown-edit">
				<span class="eyebrow">Considered. Contemporary.</span>
				<p>Pieces with presence.<br />Style on your terms.</p>
				<a href={`/collections/${selected.slug}`} onclick={() => (active = null)}>
					Explore the complete edit →
				</a>
			</div>
		</div>
	{/if}
</header>

<style>
	.site-header {
		position: relative;
		z-index: 20;
		background: var(--paper);
	}
	.announcement {
		min-height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		background: var(--obsidian);
		color: var(--ivory);
		font-size: 0.61rem;
		letter-spacing: 0.055em;
		padding: 0.4rem 1rem;
	}
	.masthead {
		height: 87px;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}
	.location {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.62rem;
	}
	.currency {
		padding-left: 1rem;
		margin-left: 0.4rem;
		border-left: 1px solid var(--line);
	}
	.wordmark {
		font-family: var(--font-editorial);
		font-size: 3.45rem;
		line-height: 1;
		letter-spacing: -0.055em;
		position: relative;
		padding-right: 0.4rem;
	}
	.wordmark-dot {
		font-family: var(--font-sans);
		position: absolute;
		font-size: 0.5rem;
		top: 0.35rem;
		right: -0.25rem;
	}
	.utilities {
		display: flex;
		justify-content: flex-end;
		gap: 0.4rem;
	}
	.icon-button {
		position: relative;
		display: flex;
		gap: 0.3rem;
		justify-content: center;
		align-items: center;
		width: 42px;
		height: 44px;
		border-radius: 50%;
		transition:
			background-color 180ms ease,
			color 180ms ease,
			transform 220ms var(--ease-out);
	}
	.icon-button:is(:hover, :focus-visible) {
		background: var(--ivory);
		color: var(--oxblood);
	}
	.icon-button:active {
		transform: scale(0.92);
	}
	.bag {
		width: 52px;
	}
	.bag-count {
		font-size: 0.65rem;
	}
	.count.has-items {
		font-size: 0.52rem;
		position: absolute;
		top: 2px;
		right: 0;
		background: var(--oxblood);
		color: var(--paper);
		width: 15px;
		height: 15px;
		border-radius: 50%;
		display: grid;
		place-items: center;
	}
	.desktop-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2.15rem;
		height: 46px;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}
	.desktop-nav a,
	.desktop-nav button {
		height: 100%;
		font-size: 0.71rem;
		letter-spacing: 0.045em;
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.desktop-nav button::after,
	.desktop-nav a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--obsidian);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 280ms var(--ease-out);
	}
	.desktop-nav button.active::after,
	.desktop-nav button:is(:hover, :focus-visible)::after,
	.desktop-nav a:is(:hover, :focus-visible)::after {
		transform: scaleX(1);
	}
	.new-dot {
		width: 4px;
		height: 4px;
		background: var(--oxblood);
		border-radius: 50%;
	}
	.sale-link {
		color: var(--oxblood);
	}
	.mobile-toggle {
		display: none;
	}
	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		padding-block: 2.5rem;
		background: var(--paper);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 3rem;
		border-bottom: 1px solid var(--line);
		box-shadow: 0 20px 30px #17181714;
	}
	.dropdown-title {
		display: inline-flex;
		align-items: center;
		gap: 2rem;
		font-size: 3rem;
		margin-top: 1rem;
	}
	.dropdown li a {
		display: flex;
		justify-content: space-between;
		max-width: 250px;
		padding: 0.6rem 0;
		font-size: 0.8rem;
		transition:
			color 180ms ease,
			transform 240ms var(--ease-out);
	}
	.dropdown li a :global(svg),
	.dropdown-title :global(svg) {
		transition: transform 280ms var(--ease-out);
	}
	.dropdown li a:is(:hover, :focus-visible) :global(svg),
	.dropdown-title:is(:hover, :focus-visible) :global(svg) {
		transform: translateX(5px);
	}
	.dropdown li a:hover {
		text-decoration: underline;
		color: var(--oxblood);
		transform: translateX(3px);
	}
	@media (prefers-reduced-motion: no-preference) {
		.dropdown > div,
		.dropdown li {
			animation: nav-enter 280ms var(--ease-out) both;
		}
		.dropdown li:nth-child(2) {
			animation-delay: 30ms;
		}
		.dropdown li:nth-child(3) {
			animation-delay: 60ms;
		}
		.dropdown li:nth-child(4) {
			animation-delay: 90ms;
		}
	}
	@keyframes nav-enter {
		from {
			opacity: 0;
			transform: translateY(7px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.dropdown-edit {
		padding-left: 2rem;
		border-left: 1px solid var(--line);
	}
	.dropdown-edit p {
		font-size: 1rem;
		line-height: 1.6;
		margin-top: 0.8rem;
	}
	.dropdown-edit a {
		display: block;
		margin-top: 1rem;
		font-size: 0.7rem;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	@media (max-width: 1000px) {
		.location > span:first-of-type {
			display: none;
		}
		.currency {
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
	@media (max-width: 760px) {
		.masthead {
			height: 76px;
			grid-template-columns: 1fr auto 1fr;
			padding-inline: 1rem;
		}
		.wordmark {
			font-size: 2.7rem;
		}
		.mobile-toggle {
			display: flex;
		}
		.location,
		.desktop-nav,
		.desktop-utility {
			display: none;
		}
		.utilities {
			gap: 0;
		}
		.icon-button {
			width: 36px;
		}
		.bag {
			width: 43px;
		}
		.dropdown {
			display: none;
		}
		.announcement {
			font-size: 0.57rem;
			gap: 0.6rem;
		}
	}
</style>
