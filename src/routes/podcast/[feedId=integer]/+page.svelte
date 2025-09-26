<script lang="ts">
	import type { PageProps, Snapshot } from "./$types";
	import { audiometadata } from "$lib/state/player.svelte";
	import { getTime } from "$lib/utils/time";
	import Info from "$lib/components/Info.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Image from "$lib/components/Image.svelte";
	import Pagination from "$lib/components/Pagination.svelte";
	import Livesign from "$lib/components/Livesign.svelte";

	let { data }: PageProps = $props();

	let feed = $derived(data.podcast);
	let episodes = $derived(data.episodes);
	let live = $derived(data.live);

	let epsSection = $state() as HTMLElement;

	let episodePage = $state(1);

	export const snapshot: Snapshot<number> = {
		capture: () => episodePage,
		restore: (page) => {
			if (page > 1) {
				episodePage = page;
			}
		}
	};
</script>

{#key feed.id}
	<Info
		img={feed.image}
		img_hash={feed.hash}
		title={feed.title}
		description={feed.description}
		author={feed.author}
		explicit={feed.explicit}
	>
		{#snippet misc()}
			{#each feed.tags as tag}
				<span>{tag}</span>
			{/each}
		{/snippet}
		{#snippet action()}
			<Button>Play latest</Button>
		{/snippet}
	</Info>

	<hr />

	{#if live && live.length > 0}
		<section>
			<h2 class="text-lg font-lancip">Episodes</h2>
			<ul class="live-section">
				{#each live as item}
					<Card>
						{#snippet thumbnail()}
							<Image
								src={item.image ?? feed.image}
								alt={item.title ?? feed.title}
								blurdata={feed.hash}
							/>
						{/snippet}
						<div class="time text-sm">
							{#if item.status === "live"}
								<span>
									<Livesign />
								</span>
							{/if}
							<span>
								{#if item.status === "live" && item.end}
									Ended {getTime(item.end)}
								{/if}
								{#if item.status === "pending" && item.start}
									Start {getTime(item.start)}
								{/if}
								{#if item.status === "ended" && item.end}
									Ended {getTime(item.end)}
								{/if}
							</span>
						</div>
						<h3 class="episode-title font-lancip">
							<span>
								{#if item.explicit}
									<Icon
										name="explicit"
										stroke="none"
										aria-label="explicit content"
										class="explicit"
									/>
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
								title={`${audiometadata.track.enclosure === item.enclosure.url && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`}
								aria-pressed={audiometadata.track.enclosure === item.enclosure.url &&
									!audiometadata.paused}
								onclick={async () =>
									await audiometadata.playTrack({
										feed: feed.title ?? "untitled",
										feedId: feed.id,
										title: item.title ?? "untitled",
										guid: item.guid ?? "",
										enclosure: item.enclosure.url,
										image: item.image ?? feed.image,
										explicit: item.explicit
									})}
							>
								{#if audiometadata.track.enclosure === item.enclosure.url}
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
	{/if}

	<section bind:this={epsSection}>
		<h2 class="text-lg font-lancip">Episodes</h2>
		<Pagination
			data={episodes}
			bind:page={episodePage}
			startPage={episodePage}
			rootElement={epsSection}
		>
			{#snippet children(item)}
				<Card>
					{#snippet thumbnail()}
						<Image
							src={item.image ?? feed.image}
							alt={item.title ?? feed.title}
							blurdata={feed.hash}
						/>
					{/snippet}
					<div class="time text-sm list-with-dot">
						{#if item.episode}
							<span>Episode {item.episode}</span>
						{/if}
						{#if item.pubDate}
							<span>
								{getTime(item.pubDate)}
							</span>
						{/if}
						<span class="duration-span">{Math.floor(item.duration / 60)} min</span>
					</div>
					<h3 class="episode-title font-lancip">
						<a href={`/podcast/${feed.id}/${btoa(item.guid ?? "")}`}>
							<span>
								{#if item.explicit}
									<Icon
										name="explicit"
										stroke="none"
										aria-label="explicit content"
										class="explicit"
									/>
								{/if}
								{item.title}
							</span>
						</a>
					</h3>
					<div class="summary text-sm">
						{@html item.summary ?? item.description}
					</div>
					{#snippet action()}
						<Button
							size="square"
							title={`${audiometadata.track.enclosure === item.enclosure.url && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`}
							aria-pressed={audiometadata.track.enclosure === item.enclosure.url &&
								!audiometadata.paused}
							onclick={async () =>
								await audiometadata.playTrack({
									feed: feed.title ?? "untitled",
									feedId: feed.id,
									title: item.title ?? "untitled",
									guid: item.guid ?? "",
									enclosure: item.enclosure.url,
									image: item.image ?? feed.image,
									explicit: item.explicit,
									chaptersUrl: item.chapters
								})}
						>
							{#if audiometadata.track.enclosure === item.enclosure.url}
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
			{/snippet}
		</Pagination>
	</section>
{/key}

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
		& > a:hover span {
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
