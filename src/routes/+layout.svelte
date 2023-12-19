<script lang="ts">
	import '@fontsource-variable/plus-jakarta-sans';
	import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';
	import '../styles/main.css';

	import { Navigation, Footer } from '$lib/components/common';
	import { Player } from '$lib/components/podcast';
	import { player } from '$lib/stores/nowplaying';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>podcastlife</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col items-center justify-center gap-10">
	<Navigation />
	<slot />
	{#if $page.url.pathname !== '/play'}
		<Footer />
	{/if}
	{#if $player.open}
		<Player />
	{/if}
</div>
