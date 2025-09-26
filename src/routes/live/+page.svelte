<script lang="ts">
	import type { PageProps } from "./$types";
	import { audiometadata } from "$lib/state/player.svelte";
	import { getTime } from "$lib/utils/time";
	import Card from "$lib/components/Card.svelte";
	import Image from "$lib/components/Image.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Livesign from "$lib/components/Livesign.svelte";
	import Button from "$lib/components/Button.svelte";

	let { data }: PageProps = $props();

	let liveNow = $derived(data.live.filter((v) => v.status === "live"));
	let liveEnded = $derived(data.live.filter((v) => v.status === "ended"));
</script>

<h1 class="text-display">Live</h1>

<section>
	<h2 class="text-xl font-lancip">Live Now</h2>
	<ul class="live-section">
		{#each liveNow as item}
			<Card>
				{#snippet thumbnail()}
					<Image
						src={item.image != "" ? item.image : item.feedImage}
						alt={item.title}
						blurdata={item.blurhash}
						full
					/>
				{/snippet}
				<div class="time text-sm">
					{#if item.status === "live"}
						<span>
							<Livesign />
						</span>
					{/if}
					<span>
						{#if item.status === "live" && item.endTime}
							Ended {getTime(item.endTime)}
						{/if}
					</span>
				</div>
				<a href={`/podcast/${item.feedId}`} class="episode-author text-sm">
					<span>
						{item.feedTitle}
					</span>
				</a>
				<h3 class="episode-title font-lancip">
					<span>
						{#if item.explicit}
							<Icon name="explicit" stroke="none" aria-label="explicit content" class="explicit" />
						{/if}
						{item.title}
					</span>
				</h3>
				<div class="summary text-sm">
					{@html item.description}
				</div>
				{#snippet action()}
					<Button
						size="square"
						title={`${audiometadata.track.enclosure === item.enclosureUrl && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`}
						aria-pressed={audiometadata.track.enclosure === item.enclosureUrl &&
							!audiometadata.paused}
						onclick={async () =>
							await audiometadata.playTrack({
								feed: item.feedTitle ?? "untitled",
								feedId: String(item.feedId),
								title: item.title ?? "untitled",
								guid: item.guid ?? "",
								enclosure: item.enclosureUrl,
								image: item.image != "" ? item.image : item.feedImage,
								explicit: item.explicit
							})}
					>
						{#if audiometadata.track.enclosure === item.enclosureUrl}
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
					</Button>
				{/snippet}
			</Card>
		{/each}
	</ul>
</section>

<section>
	<h2 class="text-xl font-lancip">Ended Live</h2>
	<ul class="live-section">
		{#each liveEnded as item}
			<Card>
				{#snippet thumbnail()}
					<Image
						src={item.image != "" ? item.image : item.feedImage}
						alt={item.title}
						blurdata={item.blurhash}
						full
					/>
				{/snippet}
				<div class="time text-sm">
					{#if item.status === "live"}
						<span>
							<Livesign />
						</span>
					{/if}
					<span>
						{#if item.status === "live" && item.endTime}
							Ended {getTime(item.endTime)}
						{/if}
					</span>
				</div>
				<a href={`/podcast/${item.feedId}`} class="episode-author text-sm">
					<span>
						{item.feedTitle}
					</span>
				</a>
				<h3 class="episode-title font-lancip">
					<span>
						{#if item.explicit}
							<Icon name="explicit" stroke="none" aria-label="explicit content" class="explicit" />
						{/if}
						{item.title}
					</span>
				</h3>
				<div class="summary text-sm">
					{@html item.description}
				</div>
				{#snippet action()}
					<Button
						size="square"
						title={`${audiometadata.track.enclosure === item.enclosureUrl && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`}
						aria-pressed={audiometadata.track.enclosure === item.enclosureUrl &&
							!audiometadata.paused}
						onclick={async () =>
							await audiometadata.playTrack({
								feed: item.feedTitle ?? "untitled",
								feedId: String(item.feedId),
								title: item.title ?? "untitled",
								guid: item.guid ?? "",
								enclosure: item.enclosureUrl,
								image: item.image != "" ? item.image : item.feedImage,
								explicit: item.explicit
							})}
					>
						{#if audiometadata.track.enclosure === item.enclosureUrl}
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
					</Button>
				{/snippet}
			</Card>
		{/each}
	</ul>
</section>

<style>
	.live-section {
		display: flex;
		flex-direction: column;
		gap: calc(var(--pl-spacing) * 6);
	}

	.episode-title {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
	.episode-author {
		font-weight: 600;
		&:hover span {
			color: var(--pl-accent-6);
			box-shadow: var(--pl-shadow-highlight);
		}
	}

	.summary {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		color: var(--pl-accent-5);
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
