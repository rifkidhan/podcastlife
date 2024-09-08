<script lang="ts">
	import type { PageServerData } from './$types';
	import type { PodcastByCategory } from '$lib/types';
	import { Main, Carousel, Button, Image, WindowVirtual } from '$lib/components';
	import { page } from '$app/stores';
	import { getTime } from '$lib/utils/time';

	let { data }: { data: PageServerData } = $props();

	let trending = $derived(data.trending);
	let feeds = $state.raw(data.feeds.data);
	let metadata = $state(data.feeds.meta.page);

	let status: 'loaded' | 'loading' | 'error' = $state('loaded');
	let windowSize = $state(0);
	let feedsItemSize = $state(160);

	$effect.pre(() => {
		if (windowSize <= 412) {
			feedsItemSize = 100;
		}

		if (windowSize > 412 && windowSize < 768) {
			feedsItemSize = 120;
		}
		if (windowSize >= 768) {
			feedsItemSize = 160;
		}
	});

	const loadMore = async () => {
		if (!metadata.more) return;

		status = 'loading';

		const response = await fetch(`/api/categories/${$page.params.slug}?c=${metadata.cursor}`, {
			method: 'GET'
		});

		if (!response.ok) {
			status = 'error';
			return;
		}

		const data = (await response.json()) as PodcastByCategory;

		feeds = [...feeds, ...data.data];
		metadata = data.meta.page;

		status = 'loaded';
	};
</script>

<svelte:window bind:innerWidth={windowSize} />

{#key $page.params.slug}
	<Main>
		<section class="container full">
			<h1 class="text-display">{$page.params.slug}</h1>
		</section>
		<section class="container full">
			<h2>Trending on {$page.params.slug}</h2>
			<Carousel items={trending} label={`${$page.params.slug} trending carousel`} />
		</section>
		<section class="container full">
			<h2>Another in {$page.params.slug}</h2>
			<div class="podcastlist" data-sveltekit-preload-data="tap">
				<WindowVirtual count={feeds.length} estimateSize={feedsItemSize} gap={10} overscan={10}>
					{#snippet virtualItems(item)}
						<a href="/podcast/{feeds[item.index].id}" class="card">
							<div class="thumbnail">
								<Image src={feeds[item.index].image ?? ''} alt={feeds[item.index].title} full />
							</div>
							<div class="content">
								<div>
									<div class="author">
										{feeds[item.index].author}
									</div>
									<h3 class="title">
										{feeds[item.index].title}
									</h3>
								</div>
								<div class="date">Last update {getTime(feeds[item.index].newestItemPubdate)}</div>
							</div>
						</a>
					{/snippet}
				</WindowVirtual>

				{#if metadata.more && status !== 'error'}
					<Button
						type="button"
						variant="picton"
						size="full"
						loading={status === 'loading'}
						onclick={async () => await loadMore()}
					>
						Add More
					</Button>
				{/if}
			</div>
		</section>
	</Main>
{/key}

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		position: relative;

		& > h2 {
			font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
			font-weight: 600;
			text-transform: capitalize;
		}

		& > .podcastlist {
			display: flex;
			flex-direction: column;
			gap: var(--space-5);
		}
	}
	.card {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		position: relative;
		place-items: center;
		width: 100%;
		height: 100%;
		gap: var(--space-3);
		border-radius: var(--space-2);
		border: 2px solid currentColor;
		padding-block: var(--space-3);
		padding-inline: var(--space-4);
		transition-property: box-shadow, transform;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;

		&:hover {
			transform: translate(-0.25rem, -0.25rem);
			box-shadow: var(--shadow-drop);
		}

		@media (min-width: 1024px) {
			gap: var(--space-5);
		}

		& > .thumbnail {
			display: block;
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 100%;
			border-radius: var(--space-2);
			border: 2px solid currentColor;
		}

		& > .content {
			grid-column: span 5 / span 5;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			:is(.author, .title, .date) {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			:is(.author) {
				font-size: clamp(var(--text-sm), 2vw, var(--text-base));
				text-transform: uppercase;
				color: var(--picton);
				line-height: 1.5;
			}
			:is(.title) {
				font-size: clamp(var(--text-lg), 2.5vw, var(--text-2xl));
				line-height: 1.2;
				font-weight: 600;
			}
			:is(.date) {
				font-size: clamp(var(--text-xs), 1.5vw, var(--text-sm));
			}
		}
	}
</style>
