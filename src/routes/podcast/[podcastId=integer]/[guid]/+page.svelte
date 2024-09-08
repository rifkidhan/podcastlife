<script lang="ts">
	import type { PageServerData } from './$types';
	import { Main, Image, Button, Tabs, TabPanel, Head, RunningText, Icons } from '$lib/components';
	import { getTime, formatTime } from '$lib/utils/time';
	import { playerState } from '$lib/stores/player.svelte';
	import { page } from '$app/stores';

	let { data }: { data: PageServerData } = $props();

	let episode = $derived(data.episode);

	const tabItems = [
		{
			id: 'description',
			content: 'Description'
		},
		{
			id: 'transcript',
			content: 'Transcript'
		},
		{
			id: 'chapters',
			content: 'Chapters'
		}
	];

	let active = $state(tabItems[0].id);
</script>

<Head title={episode.title} description={episode.description} />
<Main class="container mx-auto">
	<section class="details">
		<div class="thumbnails" style:--tag={`episode-${episode.guid}-thumbnail`}>
			<Image
				src={episode.image !== '' ? episode.image : episode.feedImage}
				alt={episode.title ?? episode.feedTitle}
				full
			/>
		</div>
		<div class="content">
			<div class="title" title={episode.title ?? 'Untitled'}>
				<RunningText class="running">
					<h1 style:--tag={`episode-${episode.guid}-title`}>
						{episode.title ?? 'Untitled'}
					</h1>
				</RunningText>
			</div>
			<div class:explicit={episode.explicit}>
				{episode.feedTitle}
			</div>
			<div>{episode.author}</div>
			<div>Published at {getTime(episode.pubDate ?? 0)}</div>
			<div>Duration {formatTime(episode.duration)}</div>
			<div>
				<Button
					type="button"
					size="fit"
					variant="picton"
					class="max-h-11"
					title={playerState.podcast.enclosure === episode.enclosure.url && !playerState.paused
						? 'Pause'
						: 'Play'}
					loading={playerState.podcast.enclosure === episode.enclosure.url && playerState.loading}
					onclick={() => {
						playerState.feed = {
							id: episode.feedId,
							title: episode.feedTitle
						};
						playerState.podcast = {
							title: episode.title ?? 'Untitled',
							image: episode.image,
							enclosure: episode.enclosure.url,
							guid: episode.guid ?? $page.params.guid,
							explicit: episode.explicit,
							altEnclosure: []
						};
						if (playerState.podcast.enclosure === episode.enclosure.url) {
							playerState.paused = !playerState.paused;
						}
					}}
				>
					{#if playerState.podcast.enclosure === episode.enclosure.url && !playerState.paused}
						<Icons icon="pause" aria-hidden="true" /> Pause this podcast
					{:else}
						<Icons icon="play" aria-hidden="true" /> Play this podcast
					{/if}
				</Button>
			</div>
		</div>
	</section>
	<Tabs tablist={tabItems} bind:active class="tabs">
		<TabPanel id={tabItems[0].id} {active}>
			{#if episode.description}
				<div class="prose">
					{@html episode.description}
				</div>
			{/if}
		</TabPanel>
		<TabPanel id={tabItems[1].id} {active}>
			{#await data.transcripts}
				loading Transcript
			{:then transcripts}
				<div class="transcripts">
					{#if transcripts && transcripts.length > 0}
						{#each transcripts as script}
							<div class="transcript">
								<div class="speaker">{script.speaker}</div>
								<div class="message">{script.body}</div>
							</div>
						{/each}
					{:else}
						No Transcript Provide
					{/if}
				</div>
			{/await}
		</TabPanel>
		<TabPanel id={tabItems[2].id} {active}>
			{#await data.chapters}
				Loading
			{:then chapters}
				{#if chapters}
					{#each chapters.chapters as chap}
						<p>{chap.title}</p>
					{/each}
				{:else}
					No Chapters
				{/if}
			{/await}
		</TabPanel>
	</Tabs>
</Main>

<style>
	.details {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: var(--space-10);
		width: 100%;

		@media (min-width: 768px) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
		& > .thumbnails {
			display: block;
			position: relative;
			aspect-ratio: 1 / 1;
			width: 100%;
			overflow: hidden;
			border-radius: var(--space-2);
			border: 2px solid var(--accent-95);
			box-shadow: var(--shadow-drop);

			@media (min-width: 768px) {
				grid-column: span 1 / span 1;
			}
		}
		& > .content {
			display: flex;
			flex-direction: column;

			@media (min-width: 768px) {
				grid-column: span 3 / span 3;
			}

			& > .title {
				display: flex;
				flex-direction: row;
				overflow: hidden;

				& > :global(.running) {
					margin-bottom: var(--space-1);
					font-size: var(--text-xl);
					font-weight: 700;

					@media (min-width: 1024px) {
						font-size: var(--text-2xl);
						margin-bottom: var(--space-2);
						line-height: 2.5rem;
					}

					@media (min-width: 1024px) {
						font-size: var(--text-5xl);
					}
				}
			}
		}
	}

	.transcripts {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: var(--space-5);

		& > .transcript {
			display: inherit;
			flex-direction: inherit;
			width: inherit;
			gap: var(--space-3);

			& > .speaker {
				font-weight: 600;
			}

			& > .message {
				background-color: var(--picton);
				border: 2px solid var(--accent-95);
				border-radius: var(--space-2);
				padding-inline: var(--space-3);
				padding-block: var(--space-5);
				color: var(--black);
			}
		}
	}

	:global(.tabs) {
		width: 100%;
	}
</style>
