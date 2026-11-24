<script lang="ts">
	export type IconName =
		| 'search'
		| 'user'
		| 'heart'
		| 'bag'
		| 'menu'
		| 'close'
		| 'arrow'
		| 'chevron'
		| 'plus'
		| 'check'
		| 'globe'
		| 'filter';
	let {
		name,
		size = 20,
		filled = false
	}: { name: IconName; size?: number; filled?: boolean } = $props();
	const paths: Record<IconName, string> = {
		search: 'm21 21-5.1-5.1M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
		user: 'M20 21v-2a7 7 0 0 0-14 0v2M17 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
		heart:
			'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
		bag: 'M5 7h14l1 14H4L5 7ZM9 8V6a3 3 0 0 1 6 0v2',
		menu: 'M3 6h18M3 12h18M3 18h18',
		close: 'm6 6 12 12M6 18 18 6',
		arrow: 'M4 12h16m-6-6 6 6-6 6',
		chevron: 'm6 9 6 6 6-6',
		plus: 'M12 5v14M5 12h14',
		check: 'm5 12 4 4L19 6',
		globe: 'M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
		filter: 'M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6M7 14v6'
	};
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={filled ? 'currentColor' : 'none'}
	stroke="currentColor"
	stroke-width="1.35"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={paths[name]} />
</svg>
