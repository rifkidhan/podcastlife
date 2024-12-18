<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		Header,
		Footer,
		SideNav,
		ScrollTop,
		Player,
		LoadingIndicator,
		useUI
	} from "$lib/components";
	import { navigating } from "$app/stores";

	import "@fontsource-variable/plus-jakarta-sans";
	import "$lib/styles/app.css";

	let { children }: { children: Snippet } = $props();

	const uiState = useUI();

	// beforeNavigate(({ willUnload, to }) => {
	// 	if ($updated && !willUnload && to?.url) {
	// 		location.href = to.url.href;
	// 	}
	// });
</script>

<Header />
<div inert={uiState.menuOpen} class="content">
	{@render children()}
	{#if $navigating}
		<LoadingIndicator />
	{/if}
</div>
<SideNav />
<ScrollTop />
<Footer inert={uiState.menuOpen} />
<Player />
