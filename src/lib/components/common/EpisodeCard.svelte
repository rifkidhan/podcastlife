<script lang="ts">
	import { Button, Icon, Image, LiveSign } from "$lib/components";
	import { getTime } from "$lib/utils/time";
	import { playerDetail } from "$lib/stores/player.svelte";
	import type { AlternativeEnclosure } from "$lib/types";

	interface EpisodeCardProps {
		type?: "podcast" | "live";
		feed: string;
		feedId: string;
		title: string;
		image: string;
		summary?: string;
		explicit?: boolean;
		guid: string;
		enclosure: string;
		altEnclosure?: AlternativeEnclosure[];
		// podcast
		episode?: number;
		publishedDate?: string;
		duration?: number;
		// live
		status?: "live" | "ended" | "pending";
		start?: string;
		end?: string;
		// linked to feed
		linked?: boolean;
	}

	let {
		type = "podcast",
		feed,
		feedId,
		title,
		summary,
		image,
		publishedDate: date,
		duration,
		explicit,
		guid,
		enclosure,
		altEnclosure,
		episode,
		status,
		start,
		end,
		linked
	}: EpisodeCardProps = $props();

	const playState = playerDetail();

	const buttonPlay = () => {
		playState.feed = {
			id: feedId,
			title: feed
		};
		playState.podcast = {
			title,
			image,
			enclosure: enclosure,
			explicit,
			guid,
			altEnclosure
		};
		if (playState.podcast.enclosure === enclosure) {
			playState.paused = !playState.paused;
		}
	};
</script>

{#snippet liveDateTime()}
	{#if status === "live"}
		<span>
			<LiveSign />
		</span>
	{/if}
	<span>
		{#if status === "live" && end}
			ended {getTime(end)}
		{/if}
		{#if status === "pending" && start}
			start {getTime(start)}
		{/if}
		{#if status === "ended" && end}
			ended {getTime(end)}
		{/if}
	</span>
{/snippet}

{#snippet liveTitle()}
	{#if linked}
		<a class="title linked text-sm" href={`/podcast/${feedId}`}>
			<span>
				{feed}
			</span>
		</a>
	{/if}
	<h3 class="title">
		<span>
			{title}
		</span>
	</h3>
{/snippet}

{#snippet podcastTitle()}
	<h3 class="title">
		<a href={`/podcast/${feedId}/${btoa(encodeURIComponent(guid))}`}>
			<span>
				{title}
			</span>
		</a>
	</h3>
{/snippet}

{#snippet podcastDateTime()}
	{#if date && duration}
		{#if episode}
			<span>
				Episode {episode}
			</span>
		{/if}
		<span>
			{getTime(date)}
		</span>
		<span class="duration-span">{Math.floor(duration / 60)} min</span>
	{/if}
{/snippet}

<div class="episode-card card">
	<div class="img">
		<Image src={image} alt={`${title} by ${feed}`} full />
	</div>
	<div class="content">
		<div class={["time", "text-sm", { "list-with-dot": type === "podcast" }]}>
			{#if type === "live"}
				{@render liveDateTime()}
			{:else}
				{@render podcastDateTime()}
			{/if}
			{#if explicit}
				<Icon name="explicit" stroke="none" size={18} class="explicit" />
			{/if}
		</div>
		{#if type === "live"}
			{@render liveTitle()}
		{:else}
			{@render podcastTitle()}
		{/if}
		{#if summary}
			<div class="summary text-sm">
				{@html summary}
			</div>
		{/if}
	</div>

	<Button
		type="button"
		aria-label="Play this episode"
		icon={playState.podcast.enclosure === enclosure && !playState.paused ? "pause" : "play"}
		variant="picton"
		class="play"
		onclick={buttonPlay}
	/>
</div>

<style>
	.episode-card {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		width: 100%;
		border: 2px solid hsl(var(--pl-accent-95));
		border-radius: var(--pl-border-radius-sm);
		padding-inline: 0.5rem;
		padding-block: 0.25rem;
		gap: 0.5rem;
		transition-property: transform, box-shadow;
		transition-duration: 150ms;
		transition-timing-function: ease-in-out;

		@media (min-width: 768px) {
			padding-inline: 1rem;
			padding-block: 0.75rem;
			gap: 1rem;
		}

		&:hover {
			box-shadow: var(--pl-shadow-drop);
			transform: translate(-0.25rem, -0.25rem);
		}
	}

	.img {
		position: relative;
		display: block;
		border-radius: var(--pl-border-radius-sm);
		border: 2px solid hsl(var(--pl-accent-95));
		width: 100px;
		height: 100px;

		@media (max-width: 768px) {
			width: 50px;
			height: 50px;
		}
	}

	.content {
		display: flex;
		flex-direction: column;

		@media (min-width: 768px) {
			margin-inline-end: 1rem;
		}
	}
	.title {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.summary {
		color: hsl(var(--pl-accent-80));
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;

		@media (max-width: 768px) {
			display: none;
		}
	}

	.time {
		font-weight: 500;
		display: inline-flex;
		flex-direction: row;
		align-items: center;

		&:has(:global([data-is-live])) {
			gap: 0.25rem;
		}
	}

	.linked {
		font-weight: 500;
	}

	a:hover > span {
		box-shadow: var(--pl-shadow-highlight);
	}
</style>
