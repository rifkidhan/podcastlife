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
	import { theme } from "$lib/components/layout/theme.svelte";
	import { navigating } from "$app/state";

	import "@fontsource-variable/plus-jakarta-sans";
	import "$lib/styles/app.css";

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		document.documentElement.dataset.theme = theme.current;
	});

	const uiState = useUI();
</script>

<svelte:head>
	<script>
		{
			const themeValue = localStorage.getItem("podcastlife-theme");

			document.documentElement.dataset.theme =
				themeValue === "system"
					? window.matchMedia("(prefers-color-sceheme: dark)").matches
						? "dark"
						: "light"
					: themeValue;
		}
	</script>
</svelte:head>

<Header />
<div inert={uiState.menuOpen} class="content">
	{@render children()}
	{#if navigating.from}
		<LoadingIndicator />
	{/if}
</div>
<SideNav />
<ScrollTop />
<Footer inert={uiState.menuOpen} />
<Player />
