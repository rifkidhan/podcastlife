<script lang="ts">
	import type { PageServerData } from './$types';
	import {
		Image,
		Main,
		TabPanel,
		Tabs,
		Cardlist,
		Button,
		RunningText,
		Head,
		WindowVirtual
	} from '$lib/components';
	import { onNavigate } from '$app/navigation';

	let { data }: { data: PageServerData } = $props();

	let episodeLength = $state(data.episodes.length > 10 ? 10 : data.episodes.length);

	let windowSize = $state(0);
	let episodeItemSize = $state(160);
	let loading = $state(false);

	let feed = $derived(data.podcast);

	let episodes = $derived.by(() => {
		let episodes = data.episodes;
		const length = episodes.length;

		if (episodeLength < length) {
			episodes = data.episodes.slice(0, episodeLength);
		}

		return episodes;
	});

	let live = $derived(data.live);

	onNavigate((nav) => {
		if (nav.to?.params?.podcastId && !nav.to.params.guid) {
			loading = true;
			episodeLength = 10;
			nav.complete.then(() => {
				episodeLength = data.episodes.length > 10 ? 10 : data.episodes.length;
				loading = false;
			});
		}
	});

	const list = [
		{
			id: 'podcast',
			content: 'Podcast'
		},
		{
			id: 'live',
			content: 'live'
		}
	];

	let active = $state(list[0].id);

	$effect.pre(() => {
		if (windowSize <= 412) {
			episodeItemSize = 100;
		}

		if (windowSize > 412 && windowSize < 768) {
			episodeItemSize = 120;
		}
		if (windowSize >= 768) {
			episodeItemSize = 160;
		}
	});

	const load = () => {
		if (episodeLength > data.episodes.length) return;

		if (data.episodes.length - episodeLength > 20) {
			episodeLength += 20;
		}
		if (data.episodes.length - episodeLength < 20) {
			episodeLength += data.episodes.length - episodeLength;
		}
	};
</script>

<svelte:window bind:innerWidth={windowSize} />

{#key feed.id}
	<Head title={feed.title} description={feed.description} />
	<Main class="full container">
		<section class="meta">
			<div class="image" style:--tag={`img-${feed.id}`}>
				<Image src={feed.image} alt={feed.title} full />
			</div>

			<div class="content">
				<div class="intro">
					<div class="author" style:--tag={`author-${feed.id}`}>
						{feed.author}
					</div>
					<div class="title" title={feed.title}>
						<RunningText class="text-display">
							<h1 style:--tag={`feed-${feed.id}`}>
								{feed.title}
							</h1>
						</RunningText>
					</div>
				</div>
				<div class="tags">
					{#each feed.tags as tag}
						<span class="tag">
							{tag}
						</span>
					{/each}
				</div>
			</div>
			<div class="description prose">
				{@html feed.description}
			</div>
		</section>

		<section class="panels">
			<Tabs class="tabs" bind:active tablist={list}>
				<TabPanel id="podcast" {active}>
					<WindowVirtual
						count={episodes.length}
						estimateSize={episodeItemSize}
						gap={10}
						overscan={10}
						{loading}
					>
						{#snippet virtualItems(item)}
							<Cardlist
								type="podcast"
								podcast={feed.title}
								podcastId={feed.id}
								title={episodes[item.index].title}
								enclosure={episodes[item.index].enclosure.url}
								guid={episodes[item.index].guid ?? feed.podcastGuid}
								image={episodes[item.index].image ?? feed.image}
								explicit={episodes[item.index].explicit}
								pubDate={episodes[item.index].pubDate}
								altEnclosure={episodes[item.index].alternativeEnclosures}
								style="height: 100%"
							/>
						{/snippet}
					</WindowVirtual>

					{#if data.episodes.length > episodeLength}
						<Button
							type="button"
							variant="picton"
							size="full"
							disabled={data.episodes.length <= episodeLength}
							onclick={load}
						>
							Load More
						</Button>
					{:else}
						<div class="data">No More Data</div>
					{/if}
				</TabPanel>
				<TabPanel id="live" {active}>
					{#if live}
						<div class="live-list" role="list">
							{#each live as episode}
								<Cardlist
									role="listitem"
									type="live"
									podcast={feed.title}
									podcastId={feed.id}
									title={episode.title}
									enclosure={episode.enclosure.url}
									guid={episode.guid ?? feed.podcastGuid}
									image={episode.image ?? feed.image}
									altEnclosure={episode.alternativeEnclosures}
									status={episode.status}
									start={episode.start}
									end={episode.end}
								/>
							{/each}
						</div>
					{:else}
						No Live Podcast
					{/if}
				</TabPanel>
			</Tabs>
			<div class="live-info">
				<div class="stick">
					<h2>Live Now</h2>
					<div class="list">
						{#if live && live.filter((v) => v.status === 'live').length > 0}
							{#each live as item}
								<span class="live-sign">
									<span class="sign">
										<span class="pulse"></span>
										<span></span>
									</span>
									<span>{item.title}</span>
								</span>
							{/each}
						{:else}
							No Live Podcast
						{/if}
					</div>
				</div>
			</div>
		</section>
	</Main>
{/key}

<style>
	.meta {
		--meta-grid-col: 1;
		display: grid;
		grid-template-columns: repeat(var(--meta-grid-col), minmax(0, 1fr));
		width: 100%;
		gap: var(--space-10);

		@media (min-width: 768px) {
			--meta-grid-col: 4;
		}

		.image {
			position: relative;
			display: block;
			width: 100%;
			overflow: hidden;
			border-radius: var(--space-2);
			border: 2px solid currentColor;
			aspect-ratio: 1 / 1;
			box-shadow: var(--shadow-drop);

			@media (min-width: 768px) {
				grid-column: span 1 / span 1;
			}
		}

		.content {
			display: flex;
			width: 100%;
			flex-direction: column;
			gap: var(--space-10);

			@media (min-width: 768px) {
				grid-column: span 3 / span 3;
			}
			.intro {
				display: flex;
				flex-direction: column;
				border-left: 4px solid var(--picton);
				padding-left: var(--space-4);

				.author {
					font-size: var(--text-base);
					text-transform: uppercase;
					color: var(--picton);
					line-height: var(--space-6);

					@media (min-width: 1024px) {
						font-size: var(--text-lg);
					}
				}
				.title {
					display: block;
					width: 100%;
					height: 100%;
					overflow: hidden;

					& > :global(.text-display) {
						margin-bottom: var(--space-1);

						@media (min-width: 1280px) {
							margin-bottom: var(--space-2);
						}
					}
				}
			}

			.tags {
				display: flex;
				width: 100%;
				flex-wrap: wrap;
				gap: var(--space-3);

				.tag {
					background-color: var(--cerise);
					padding: var(--space-1) var(--space-2);
					text-transform: uppercase;
					color: var(--white);
					font-size: var(--text-xs);
					border-radius: 9999px;

					@media (min-width: 768px) {
						font-size: var(--text-sm);
					}
				}
			}
		}
		.description {
			grid-column: 1 / -1;
		}
	}
	.panels {
		--panels-grid-col: 1;

		display: grid;
		position: relative;
		grid-template-rows: repeat(1, minmax(0, 1fr));
		grid-template-columns: repeat(var(--panels-grid-col), minmax(0, 1fr));
		width: 100%;
		gap: var(--space-10);

		@media (min-width: 1024px) {
			--panels-grid-col: 4;
			grid-auto-flow: row;
		}

		& > :global(:is(.tabs)) {
			width: 100%;

			@media (min-width: 1024px) {
				grid-column: span 3 / span 3;
			}
		}
	}

	.data {
		width: 100%;
		background-color: var(--accent-40);
		padding: var(--space-3) var(--space-2);
		text-align: center;
		border-radius: var(--space-2);
	}

	.live-list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: var(--space-5);

		@media (min-width: 1024px) {
			gap: var(--space-10);
		}
	}

	.live-info {
		grid-row-start: 1;

		@media (min-width: 1024px) {
			grid-column-start: 4;
		}

		& > .stick {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: var(--space-5);
			border-radius: var(--space-2);
			border: 2px solid currentColor;
			box-shadow: var(--shadow-drop);
			padding: var(--space-3) var(--space-2);

			@media (min-width: 1024px) {
				position: sticky;
				top: var(--space-20);
			}

			h2 {
				font-size: var(--text-xl);
				font-weight: 600;
				color: var(--picton);
				@media (min-width: 1024px) {
					font-size: var(--text-2xl);
				}
			}
			.list {
				display: flex;
				flex-direction: column;
				gap: var(--space-3);

				.live-sign {
					&:hover {
						color: var(--picton);
					}
				}
			}
		}
	}
</style>
