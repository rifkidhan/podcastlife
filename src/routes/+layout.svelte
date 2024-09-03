<script lang="ts">
	// import '../app.css';
	import '$lib/styles/app.css';
	import '@fontsource-variable/plus-jakarta-sans';
	import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';

	import type { Snippet } from 'svelte';
	import { Footer, Header, Menu, Player, ScrollTop, useUI } from '$lib/components';
	import { viewTransition } from '$lib/utils/viewTransition';

	let { children }: { children: Snippet } = $props();

	const uiState = useUI();

	viewTransition();
</script>

<div class="wrapper" data-menu-opened={uiState.menuOpen}>
	<Header />
	{@render children()}
	<Menu />
	<Footer />
	<ScrollTop />
	<Player />
</div>

<style>
	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		min-height: 100vh;

		@media (min-height: 768px) {
			gap: var(--space-6);
		}
		@media (min-height: 1024px) {
			gap: var(--space-8);
		}
		@media (min-height: 1280px) {
			gap: var(--space-10);
		}
	}
</style>
