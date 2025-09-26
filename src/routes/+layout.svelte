<script lang="ts">
	import type { LayoutProps } from "./$types";
	import { page, navigating } from "$app/state";
	import { asset } from "$app/paths";
	import { TITLE_SITE, DESCRIPTION_SITE } from "$lib/utils/constants";
	import { audiometadata } from "$lib/state/player.svelte";
	import { theme } from "$lib/state/theme.svelte";
	import { useUI } from "$lib/state/ui.svelte";
	import Header from "$lib/components/Header.svelte";
	import Sidenav from "$lib/components/Sidenav.svelte";
	import Player from "$lib/components/player/Player.svelte";
	import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";
	import FullPlayer from "$lib/components/player/FullPlayer.svelte";
	import "$lib/styles/app.css";

	let { children }: LayoutProps = $props();

	let meta = $derived(page.data.meta);

	let title = $derived.by(() => {
		if (audiometadata.track.enclosure !== "" && !audiometadata.paused) {
			return `${audiometadata.track.title} | ${TITLE_SITE}`;
		}
		if (meta) {
			return `${meta.title} | ${TITLE_SITE}`;
		}

		return TITLE_SITE;
	});
	let description = $derived(meta?.description ?? DESCRIPTION_SITE);

	let image = asset("/default-open-graph.png");

	$effect(() => {
		document.documentElement.dataset.theme = theme.current;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<link rel="canonical" href={page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={page.url.href} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>

<Header />
<main inert={useUI.inert}>
	{@render children()}
	{#if navigating.from}
		<LoadingIndicator />
	{/if}
</main>
{#if useUI.menuOpen}
	<Sidenav />
{/if}
{#if useUI.playerShown}
	<Player />
{/if}
{#if page.state.fullPlayer}
	<FullPlayer />
{/if}
