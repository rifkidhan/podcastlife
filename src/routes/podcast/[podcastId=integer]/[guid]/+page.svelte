<script lang="ts">
	import { Head, Image, Icon, Button, RunningText, Tab, TabPanel } from "$lib/components";
	import { getTime } from "$lib/utils/time";
	import { playerDetail } from "$lib/stores/player.svelte";
	import { VList } from "virtua/svelte";
	import type { PageServerData } from "./$types";
	import { innerWidth } from "svelte/reactivity/window";

	let { data }: { data: PageServerData } = $props();

	let episode = $derived(data.episode);
	let episodeImage = $derived(
		episode.image && episode.image !== "" ? episode.image : episode.feedImage
	);

	const playState = playerDetail();

	let isPlayed = $derived(
		playState.podcast.enclosure === episode.enclosure.url && !playState.paused
	);

	const setPlayer = () => {
		playState.feed = {
			id: episode.feedId,
			title: episode.feedTitle
		};
		playState.podcast = {
			title: episode.title ?? "untitled",
			guid: episode.guid ?? "",
			enclosure: episode.enclosure.url,
			image: episodeImage
		};

		if (playState.podcast.enclosure === episode.enclosure.url) {
			playState.paused = !playState.paused;
		}
	};

	const tablist = [
		{
			id: "description",
			content: "Description"
		},
		{
			id: "chapter",
			content: "Chapter"
		},
		{
			id: "transcript",
			content: "Transcript"
		}
	];
</script>

<Head title={episode.title} />

<main class="page">
	<div class="detail">
		<div class="img">
			<Image
				src={episodeImage}
				loading="eager"
				alt={`${episode.title} by ${episode.feedTitle}`}
				full
			/>
		</div>
		<div class="header">
			<a href={`/podcast/${episode.feedId}`} class="feed-title text-md">
				<span>
					{episode.feedTitle}
				</span>
			</a>
			<RunningText
				as="h1"
				class="text-lg"
				--pl-running-text-align={innerWidth.current > 768 ? "left" : "center"}
				title={episode.title}
			>
				{episode.title}
			</RunningText>
			<div class="author">
				{episode.author}
			</div>
			<div class="info list-with-dot text-sm">
				{#if episode.pubDate}
					<span>
						{getTime(episode.pubDate)}
					</span>
				{/if}
				<span>
					{Math.floor(episode.duration / 60)} min
				</span>
				{#if episode.explicit}
					<Icon name="explicit" aria-hidden="true" class="explicit" size={18} stroke="none" />
				{/if}
			</div>
		</div>

		<div class="misc">
			<Button
				type="button"
				variant="cerise"
				size="fit"
				icon={isPlayed ? "pause" : "play"}
				aria-pressed={isPlayed}
				onclick={setPlayer}
			>
				{isPlayed ? "Pause" : "Play"}
			</Button>
		</div>
	</div>
	<section class="text-sm">
		<Tab list={tablist} class="tabs" tabColor="cerise">
			<TabPanel id={tablist[0].id} class="text">
				{@html episode.description}
			</TabPanel>
			<TabPanel id={tablist[1].id}>
				{#await data.chapters}
					loading
				{:then chapters}
					{#if chapters.length > 0}
						<VList data={chapters} getKey={(_, i) => i} overscan={15} class="vlist" data-chapters>
							{#snippet children(item)}
								<div class="chapter-item">
									{#if item.img}
										<div class="chapter-thumbnail">
											<Image src={item.img} alt={item.title} full />
										</div>
									{/if}
									<div>
										{item.title}
									</div>
								</div>
							{/snippet}
						</VList>
					{:else}
						<div>No chapter</div>
					{/if}
				{:catch error}
					Chapter error: {error.message}
				{/await}
			</TabPanel>
			<TabPanel id={tablist[2].id}>
				{#await data.transcripts}
					loading
				{:then transcripts}
					{#if transcripts.length > 0}
						<VList
							data={transcripts}
							getKey={(_, i) => i}
							overscan={8}
							class="vlist"
							data-transcripts
						>
							{#snippet children(item)}
								<div
									class="transcript-item"
									aria-current={playState.currentTime >= item.startTime &&
										playState.currentTime <= item.endTime}
								>
									{#if item.speaker}
										<div class="speaker">{item.speaker}</div>
									{/if}
									<div>{item.body}</div>
								</div>
							{/snippet}
						</VList>
					{:else}
						<div>No transcript</div>
					{/if}
				{:catch error}
					Transcript error: {error.message}
				{/await}
			</TabPanel>
		</Tab>
	</section>
</main>

<style>
	main {
		width: 90dvw;
		margin-inline: auto;
	}
	.detail {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) auto;
		grid-template-areas:
			"image header"
			"image misc";
		gap: 2rem;
		width: 100%;

		@media (max-width: 768px) {
			grid-template-areas:
				"image"
				"header"
				"misc";

			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto minmax(0, 1fr) auto;
			justify-items: center;
		}
	}

	.img {
		grid-area: image;
		display: block;
		position: relative;
		width: 300px;
		height: 300px;
		border-radius: var(--pl-border-radius-md);
		overflow: hidder;
		border: 4px solid hsl(var(--pl-accent-95));
	}

	.header {
		grid-area: header;
		width: 100%;
		display: flex;
		flex-direction: column;

		@media (max-width: 768px) {
			align-items: center;
		}
	}

	.feed-title {
		color: hsl(var(--pl-cerise));
		text-transform: uppercase;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;

		&:hover span {
			color: hsl(var(--pl-accent-95));
			box-shadow: var(--pl-shadow-highlight-cerise);
		}
	}

	.author {
		font-weight: 500;
		color: hsl(var(--pl-cerise));
	}

	.info {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: 600;
		color: hsl(var(--pl-accent-80));
	}

	.misc {
		grid-area: misc;
	}

	section {
		width: 100%;
		& > :global(.tabs) {
			width: 100%;
		}
	}

	:global(.vlist) {
		padding: 2rem 1.5rem;
		overscroll-behavior-y: auto;
		scrollbar-gutter: stable;
		scrollbar-width: thin;
	}

	.chapter-item {
		display: flex;
		margin: 0.5rem 0;
		flex-direction: row;
		width: 100%;
		border: 2px solid hsl(var(--pl-accent-95));
		border-radius: var(--pl-border-radius-sm);
		padding: 0.5rem 0.75rem;
		align-items: center;
		gap: 0.5rem;

		& > .chapter-thumbnail {
			display: inline-block;
			position: relative;
			height: 3rem;
			width: 3rem;
			flex-shrink: 0;
		}
	}

	.transcript-item {
		display: flex;
		margin: 0.5rem 0;
		flex-direction: column;
		width: 100%;
		border: 2px solid hsl(var(--pl-accent-95));
		border-radius: var(--pl-border-radius-sm);
		padding: 0.5rem 0.75rem;

		&[aria-current="true"] {
			color: hsl(var(--pl-white));
			background-color: hsl(var(--pl-cerise));
		}

		.speaker {
			font-weight: 600;
		}
	}
</style>
