<script lang="ts">
	import type { PodcastByCategory } from '$lib/types';
	import { Button, VirtualWindow, Image, Carousel, Icon } from '$lib/components';
	import sanitize from '$lib/utils/sanitize';
	import { getTime } from '$lib/utils/time';
	import { page } from '$app/stores';

	let { data } = $props();

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
			feedsItemSize = 140;
		}
	});

	const loadMore = async () => {
		if (!metadata.more) return;

		status = 'loading';

		const response = await fetch(
			`/api/categories/${$page.params.categoryId}?c=${metadata.cursor}`,
			{
				method: 'GET'
			}
		);

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

{#key $page.params.categoryId}
	<main class="page">
		<section>
			<h1 class="text-display">{$page.params.categoryId}</h1>
		</section>
		<section>
			<h2 class="text-xl">
				Trending on {$page.params.categoryId}
			</h2>
			<Carousel label="Trending Carousel" items={trending} />
		</section>
		<section>
			<h2 class="text-xl">
				Another in {$page.params.categoryId}
			</h2>
			<VirtualWindow count={feeds.length} estimateSize={feedsItemSize} gap={10} overscan={20}>
				{#snippet virtualItems({ index })}
					<a href={`/podcast/${feeds[index].id}`} class="card">
						<div class="thumbnail">
							<Image src={feeds[index].image} alt={feeds[index].title} full />
						</div>
						<div class="content">
							<div class="misc text-sm">
								<span>
									{getTime(feeds[index].newestItemPubdate)}
								</span>
								{#if feeds[index].explicit}
									<span>
										<Icon name="explicit" aria-hidden="true" stroke="none" class="explicit" />
									</span>
								{/if}
							</div>
							<h3 class="title">
								{feeds[index].title}
							</h3>
							{#if feeds[index].description}
								<div class="description text-sm">
									{@html sanitize(feeds[index].description, {
										allowedTags: [],
										allowedAttributes: {}
									})}
								</div>
							{/if}
						</div>
					</a>
				{/snippet}
			</VirtualWindow>
			{#if metadata.more && status !== 'error'}
				<Button type="button" size="full" loading={status === 'loading'} onclick={loadMore}>
					Load More
				</Button>
			{/if}
		</section>
	</main>
{/key}

<style>
	main {
		width: 90dvw;
		margin-inline: auto;
	}

	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	h1 {
		text-transform: uppercase;
	}

	.card {
		--pl-categories-thumbnail-size: 5rem;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1rem;
		border: 2px solid hsl(var(--pl-accent-95));
		border-radius: var(--pl-border-radius-md);
		transition-property: box-shadow, transform;
		transition-duration: 150ms;
		transition-timing-function: ease-in-out;

		@media (min-width: 768px) {
			--pl-categories-thumbnail-size: 6rem;
		}
		@media (min-width: 1280px) {
			--pl-categories-thumbnail-size: 7rem;
		}

		&:hover {
			box-shadow: var(--pl-shadow-drop);
			transform: translate(-0.25rem, -0.25rem);
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.thumbnail {
		display: block;
		position: relative;
		width: var(--pl-categories-thumbnail-size);
		height: var(--pl-categories-thumbnail-size);
		border-radius: var(--pl-border-radius-sm);
		border: 2px solid hsl(var(--pl-accent-95));
		overflow: hidden;
	}
	.title {
		font-weight: 600;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
	.misc {
		font-weight: 600;
	}
	.description {
		color: hsl(var(--pl-accent-80));
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
</style>
