<script lang="ts">
	import { playerDetail } from "$lib/stores/player.svelte";
	import { page } from "$app/stores";

	interface HeadProps {
		title?: string;
		description?: string;
		image?: string;
	}

	let {
		title: title_props,
		description: description_props,
		image = "/default-open-graph.png"
	}: HeadProps = $props();
	const playerState = playerDetail();

	let title = $derived.by(() => {
		const title_base = "podcastlife";
		let title = title_base;

		if (!playerState.paused) {
			title = playerState.podcast.title + " | " + title_base;
			return title;
		}
		if (title_props) {
			title = title_props + " | " + title_base;
		}

		return title;
	});

	let description = $derived.by(() => {
		let description = "Podcast Web Apps.";
		if (description_props) {
			description = description_props;
		}

		return description;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
