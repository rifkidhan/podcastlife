<script lang="ts">
	import '@fontsource-variable/plus-jakarta-sans';
	import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';
	import '../styles/main.css';

	import { Navigation, Footer } from '$lib/components/common';
	import { Modal } from '$lib/components/base';
	import { Player } from '$lib/components/podcast';
	import { player } from '$lib/stores/nowplaying';
	import { viewTransition } from '$lib/utils/transition';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	viewTransition();
</script>

<div class="relative flex min-h-screen flex-col items-center justify-center gap-10">
	<Navigation />
	<slot />
	{#if $page.url.pathname !== '/play'}
		<Footer />
	{/if}
</div>

<Modal
	preventScroll={false}
	open={$player.open}
	closeOnEscape={false}
	closeOnOutsideClick={false}
	let:actions={action}
	let:contents={content}
>
	<span {...content.title} use:action.title class="sr-only"> Player </span>
	<span {...content.description} use:action.description class="sr-only"> Player </span>
	<div
		{...content.content}
		use:action.content
		class="fixed bottom-0 z-[100] flex h-16 w-full items-center border-t-2 bg-accent-5 md:h-20 md:border-none"
		transition:fly={{
			y: 350,
			opacity: 1
		}}
	>
		<Player />
	</div>
</Modal>
