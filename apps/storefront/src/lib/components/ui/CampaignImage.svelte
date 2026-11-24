<script lang="ts">
	import photography from '#lib/content/photography.json';
	import type { ImageKey } from '#lib/content/photography.js';
	let {
		image,
		alt,
		sizes = '(min-width: 900px) 50vw, 100vw',
		eager = false,
		position = 'center',
		fit = 'cover',
		class: className = ''
	}: {
		image: ImageKey;
		alt: string;
		sizes?: string;
		eager?: boolean;
		position?: string;
		fit?: 'cover' | 'contain';
		class?: string;
	} = $props();
	let metadata = $derived(photography[image]);
</script>

<img
	class={className}
	src={`/images/${image}-960.webp`}
	srcset={`/images/${image}-480.webp 480w, /images/${image}-960.webp 960w, /images/${image}-1440.webp 1440w`}
	{sizes}
	{alt}
	width={metadata.width}
	height={metadata.height}
	loading={eager ? 'eager' : 'lazy'}
	fetchpriority={eager ? 'high' : 'auto'}
	decoding="async"
	style:object-position={position}
	style:object-fit={fit}
/>

<style>
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
