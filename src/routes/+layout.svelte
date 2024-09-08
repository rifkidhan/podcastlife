<script lang="ts">
	// import '../app.css';
	import '$lib/styles/app.css';
	import '@fontsource-variable/plus-jakarta-sans';
	import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';

	import type { Snippet } from 'svelte';
	import { Footer, Header, SideNav, Player, ScrollTop } from '$lib/components';
	import { viewTransition } from '$lib/utils/viewTransition';

	let { children }: { children: Snippet } = $props();

	viewTransition();
</script>

<Header />
{@render children()}
<SideNav />
<Footer />
<ScrollTop />
<Player />
