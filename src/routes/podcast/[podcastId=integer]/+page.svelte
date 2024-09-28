<script lang="ts">
	import { Head, Image, Icon, RunningText, Button, Truncate, EpisodeCard } from '$lib/components';
	import { Pagination } from '$lib/utils/pagination.svelte';
	import { afterNavigate } from '$app/navigation';

	let { data } = $props();

	const episodePagination = new Pagination({ count: data.episodes.length, limit: 20 });

	let episodesStart = $derived(episodePagination.rangeStart);
	let episodesEnd = $derived(episodePagination.rangeEnd);
	let feed = $derived(data.podcast);
	let episodes = $derived.by(() => {
		let episodeNow = data.episodes.slice(episodesStart, episodesEnd);

		return episodeNow;
	});
	let live = $derived(data.live);
	let episodeSection: HTMLElement | undefined = $state();

	afterNavigate(() => {
		episodePagination.count = data.episodes.length;
	});

	$effect.pre(() => {
		if (!episodeSection) return;
		episodePagination.rootElement = episodeSection;
	});

	let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />
<Head title={feed.title} />

{#key feed.id}
	<main class="page">
		<div class="detail">
			<div class="thumbnail">
				<Image src={feed.image} loading="eager" alt={feed.title} full />
			</div>
			<div class="header">
				<div class="title">
					<div class="text-md">{feed.author}</div>
					<RunningText
						as="h1"
						class="text-xl"
						title={feed.title}
						--pl-running-text-align={innerWidth > 1024 ? 'left' : 'center'}
					>
						{feed.title}
					</RunningText>
				</div>
				<div class="tags list-with-dot text-sm">
					{#each feed.tags as tag}
						<span>{tag}</span>
					{/each}
					{#if feed.explicit}
						<Icon name="explicit" stroke="none" aria-hidden="true" size={18} class="explicit" />
					{/if}
				</div>
			</div>
			<div class="description">
				<Truncate>
					{@html feed.description}
				</Truncate>
			</div>
			<div class="misc">
				<Button size="fit">Play latest</Button>
				{#if feed.link}
					<a class="homepage" href={feed.link} rel="noopener noreferrer" target="_blank">
						<Icon name="external-link" aria-hidden="true" size={20} style="display: inline;" />
						<span>Podcaster page</span>
					</a>
				{/if}
			</div>
		</div>

		{#if live && live.length > 0}
			<section>
				<h2 class="text-lg">Live</h2>
				<ul class="episode-list">
					{#each live as eps (eps.guid)}
						<li class="episode">
							<EpisodeCard
								type="live"
								feed={feed.title}
								feedId={feed.id}
								title={eps.title ?? 'untitled'}
								image={eps.image ?? feed.image}
								summary={eps.description}
								explicit={eps.explicit}
								guid={eps.guid ?? feed.podcastGuid}
								enclosure={eps.enclosure.url}
								altEnclosure={eps.alternativeEnclosures}
								status={eps.status}
								start={eps.start}
								end={eps.end}
							/>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section bind:this={episodeSection}>
			<h2 class="text-lg">Episodes</h2>
			<ul class="episode-list">
				{#each episodes as eps (eps.guid)}
					<li class="episode">
						<EpisodeCard
							feed={feed.title}
							feedId={feed.id}
							title={eps.title ?? 'untitled'}
							image={eps.image ?? feed.image}
							summary={eps.subtitle ?? eps.summary ?? eps.description}
							publishedDate={eps.pubDate}
							duration={eps.duration}
							explicit={eps.explicit}
							guid={eps.guid ?? feed.podcastGuid}
							enclosure={eps.enclosure.url}
							altEnclosure={eps.alternativeEnclosures}
							episode={eps.episode ?? eps.itunesEpisode}
						/>
					</li>
				{/each}
			</ul>
			{#if data.episodes.length > 20}
				<div class="pagination">
					<Button
						type="button"
						icon="chevrons-left"
						aria-label="Go to first episode page"
						onclick={episodePagination.firstButtonHandler}
						disabled={episodePagination.page === 1}
					/>
					<Button
						type="button"
						icon="chevron-left"
						aria-label="Go to previous episode page"
						onclick={episodePagination.prevButtonHandler}
						disabled={episodePagination.page <= 1}
					/>
					<span>{episodePagination.page} / {episodePagination.totalPage}</span>
					<Button
						type="button"
						icon="chevron-right"
						aria-label="Go to next episode page"
						onclick={episodePagination.nextButtonHandler}
						disabled={episodePagination.page >= episodePagination.totalPage}
					/>
					<Button
						type="button"
						icon="chevrons-right"
						aria-label="Go to last episode page"
						onclick={episodePagination.lastButtonHandler}
						disabled={episodePagination.page === episodePagination.totalPage}
					/>
				</div>
			{/if}
		</section>
	</main>
{/key}

<style>
	main {
		width: 90dvw;
		margin-inline: auto;
	}

	.detail {
		display: grid;
		grid-template-areas:
			'thumbnail'
			'title'
			'misc'
			'description';
		gap: 1rem;
		justify-items: center;
		width: 100%;
		grid-template-columns: minmax(0, 1fr);

		@media (min-width: 1024px) {
			grid-template-areas:
				'thumbnail title title'
				'thumbnail description description'
				'thumbnail misc .';
			grid-template-columns: auto 1fr auto;
			grid-template-rows: 1fr auto auto;
			justify-items: start;
			gap: 2rem;
		}
	}
	.thumbnail {
		display: block;
		position: relative;
		overflow: hidden;
		aspect-ratio: 1;
		border-radius: var(--pl-border-radius-md);
		grid-area: thumbnail;
		width: 300px;
		border: 4px solid hsl(var(--pl-accent-95));
		box-shadow: var(--pl-shadow-drop);
	}
	.header {
		grid-area: title;
		align-self: self-start;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		align-items: flex-start;

		.title {
			border-inline-start: 4px solid hsl(var(--pl-picton));
			padding-inline-start: 1rem;
			width: 100%;
			display: flex;
			flex-direction: column;

			@media (max-width: 1024px) {
				border-inline-start: none;
				padding-block-start: none;
				align-items: center;
			}

			& > .text-md {
				text-transform: uppercase;
				color: hsl(var(--pl-picton));
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				line-clamp: 2;
			}
		}
	}

	.description {
		--pl-rotate-plus-sign: 0deg;
		grid-area: description;
		cursor: default;
		align-self: flex-start;
	}

	.tags {
		display: inline-flex;
		text-transform: uppercase;
		font-weight: 600;
		color: hsl(var(--pl-accent-80));
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		@media (max-width: 1024px) {
			margin-inline: auto;
		}
	}

	.misc {
		grid-area: misc;
		display: flex;
		flex-direction: row;
		gap: 3rem;
		align-items: center;
	}

	.homepage {
		display: inline-flex;
		flex-direction: row;
		gap: 0.2rem;
		align-items: center;

		&:hover {
			box-shadow: var(--pl-shadow-highlight);
		}
	}

	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.episode-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.pagination {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
