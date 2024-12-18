<script lang="ts">
	import type { Episode } from "$lib/types";
	import { Button, EpisodeCard } from "$lib/components";
	import { groupBy } from "$lib/utils/group";

	interface PaginationProps {
		data: Episode[];
		feed: {
			id: string;
			title: string;
			image: string;
		};
	}

	let { data, feed }: PaginationProps = $props();

	let sectionComp: HTMLElement;
	const limit = 20;

	let episodeGroup = groupBy(data, (item) => (item.season ? item.season : 0));
	let keys = $state(Array.from(episodeGroup.keys()).sort((a, b) => b - a));
	let season = $state(keys[0]);
	let page = $state(1);

	let seasonChange = {
		get season() {
			return season;
		},
		set season(value) {
			season = value;
			page = 1;
		}
	};
	let episodePerSeason = {
		get episodes() {
			return episodeGroup.get(season);
		},
		get length() {
			return this.episodes ? this.episodes.length : 1;
		}
	};

	let totalPage = $derived(Math.ceil(episodePerSeason.length / limit));

	let start = $derived((page - 1) * limit);
	let end = $derived(Math.min(start + limit, episodePerSeason.length));

	let episodes = $derived(episodePerSeason.episodes?.slice(start, end));

	const jumpToRoot = () => {
		sectionComp.scrollIntoView();
	};

	const prevButtonHandler = () => {
		if (page <= 1) return;
		page--;
		jumpToRoot();
	};

	const nextButtonHandler = () => {
		if (page >= totalPage) return;
		page++;
		jumpToRoot();
	};

	const firstButtonHandler = () => {
		page = 1;
		jumpToRoot();
	};

	const lastButtonHandler = () => {
		page = totalPage;
		jumpToRoot();
	};
</script>

<section bind:this={sectionComp}>
	<div class="header">
		<h2 class="text-lg">Section</h2>
		{#if keys.length > 1}
			<select name="season" id="season" bind:value={seasonChange.season}>
				{#each keys as key}
					<option value={key}>Season {key}</option>
				{/each}
			</select>
		{/if}
	</div>
	<ul class="episode-list">
		{#if episodes}
			{#each episodes as eps (eps.guid)}
				<li class="episode">
					<EpisodeCard
						feed={feed.title}
						feedId={feed.id}
						title={eps.title ?? "untitled"}
						image={eps.image ?? feed.image}
						summary={eps.subtitle ?? eps.summary ?? eps.description}
						publishedDate={eps.pubDate}
						duration={eps.duration}
						explicit={eps.explicit}
						guid={eps.guid ?? ""}
						enclosure={eps.enclosure.url}
						altEnclosure={eps.alternativeEnclosures}
						episode={eps.episode ?? eps.itunesEpisode}
					/>
				</li>
			{/each}
		{/if}
	</ul>
	{#if episodePerSeason.length > 20}
		<div class="pagination">
			<Button
				type="button"
				icon="chevrons-left"
				aria-label="Go to first episode page"
				onclick={firstButtonHandler}
				disabled={page === 1}
			/>
			<Button
				type="button"
				icon="chevron-left"
				aria-label="Go to previous episode page"
				onclick={prevButtonHandler}
				disabled={page <= 1}
			/>
			<span>{page} / {totalPage}</span>
			<Button
				type="button"
				icon="chevron-right"
				aria-label="Go to next episode page"
				onclick={nextButtonHandler}
				disabled={page >= totalPage}
			/>
			<Button
				type="button"
				icon="chevrons-right"
				aria-label="Go to last episode page"
				onclick={lastButtonHandler}
				disabled={page === totalPage}
			/>
		</div>
	{/if}
</section>

<style>
	.header {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;

		& > h2 {
			text-decoration: underline solid;
		}

		& > select {
			appearance: none;
			display: block;
			min-width: 10ch;
			padding: 0.15rem 0.25rem;
			background-color: hsl(var(--pl-accent-5));
			border-radius: var(--pl-border-radius-sm);
		}
	}
</style>
