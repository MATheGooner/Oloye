<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status} — OLOYE</title>
</svelte:head>

<main id="main-content" class="shell py-20">
	<p class="eyebrow mb-6">OLOYE / {page.status}</p>
	<h1 class="editorial text-5xl">
		{page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="mt-4">
		{page.status === 404 ? 'The page you requested does not exist.' : 'Please try again shortly.'}
	</p>
	<a class="mt-6 inline-block underline" href={resolve('/')}>Return to OLOYE</a>
</main>
