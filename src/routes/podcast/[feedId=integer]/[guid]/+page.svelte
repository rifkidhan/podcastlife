<script lang="ts">
	import type { PageProps } from "./$types";
	import { getTime } from "$lib/utils/time";
	import Info from "$lib/components/Info.svelte";
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { audiometadata } from "$lib/state/player.svelte";

	let { data }: PageProps = $props();

	let episode = $derived(data.episode);
</script>

<Info
	img={episode.image !== "" ? episode.image : episode.feedImage}
	title={episode.title ?? "untitled"}
	description={episode.description}
	author={episode.feedTitle}
	explicit={episode.explicit}
	author_link={`/podcast/${episode.feedId}`}
>
	{#snippet misc()}
		{#if episode.pubDate}
			<span>{getTime(episode.pubDate)}</span>
		{/if}
		{#if episode.duration}
			<span>{Math.floor(episode.duration / 60)} min</span>
		{/if}
	{/snippet}
	{#snippet action()}
		<Button
			onclick={async () => {
				await audiometadata.playTrack({
					feed: episode.feedTitle ?? "untitled",
					feedId: episode.feedId,
					title: episode.title ?? "untitled",
					guid: episode.guid ?? "",
					enclosure: episode.enclosure.url,
					image: episode.image !== "" ? episode.image : episode.feedImage,
					explicit: episode.explicit,
					chaptersUrl: episode.chapters
				});
			}}
		>
			{#if audiometadata.track.enclosure === episode.enclosure.url}
				{#if audiometadata.state === "loading"}
					<Icon name="spinner" isHidden class="animate-spin" />
				{:else if audiometadata.state === "play"}
					<Icon name="pause" isHidden />
				{:else}
					<Icon name="play" isHidden />
				{/if}
			{:else}
				<Icon name="play" isHidden />
			{/if}
			<span>Play this episode</span>
		</Button>
	{/snippet}
</Info>
<hr />
{#snippet info(name: string, value: string | number)}
	<li>
		<div class="key">{name}</div>
		<div class="value">
			{value}
		</div>
	</li>
{/snippet}
<section>
	<h2 class="text-lg">Information</h2>
	<ul class="info text-sm">
		{@render info("Show", episode.feedTitle)}
		{#if episode.pubDate}
			{@render info("Published", getTime(episode.pubDate))}
		{/if}
		{#if episode.start}
			{@render info("Live Start", getTime(episode.start))}
		{/if}
		{#if episode.duration}
			{@render info("Duration", `${Math.floor(episode.duration / 60)} min`)}
		{/if}
		{#if episode.episode}
			{@render info("Episode", episode.episode)}
		{/if}
		{#if episode.episodeType}
			{@render info("Episode", episode.episodeType)}
		{/if}
		{#if episode.season}
			{@render info("Season", episode.season)}
		{/if}
		{@render info("Rating", episode.explicit ? "Explicit" : "Clean")}

		{#if episode.link}
			<li>
				<div class="key">Link</div>
				<a href={episode.link} target="_blank" rel="noopener noreferrer">Go to episode page</a>
			</li>
		{/if}
		{#if episode.persons}
			{#each episode.persons as person}
				{person.name}
			{/each}
		{/if}
	</ul>
</section>

<style>
	.info {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: calc(var(--pl-spacing) * 4);

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.key {
		color: var(--pl-primary);
		font-weight: 600;
	}
	.value {
		text-transform: capitalize;
	}
</style>
