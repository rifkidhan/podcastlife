<script lang="ts">
	import { Icon, Image, Button } from "$lib/components";
	import type { PodcastByCategory } from "$lib/types";
	import { getTime } from "$lib/utils/time";
	import { WindowVirtualizer } from "virtua/svelte";

	interface ListProps {
		data: PodcastByCategory;
		category: string;
	}

	let { data, category }: ListProps = $props();

	let feeds = $state.raw(data.data);
	let metadata = $state(data.meta.page);
	let status: "loaded" | "loading" | "error" = $state("loaded");

	const updateList = async () => {
		if (!metadata.more) return;

		status = "loading";

		const response = await fetch(`/api/categories/${category}?c=${metadata.cursor}`, {
			method: "GET"
		});

		if (!response.ok) {
			status = "error";
			return;
		}

		const data = (await response.json()) as PodcastByCategory;

		feeds = [...feeds, ...data.data];

		metadata = data.meta.page;

		status = "loaded";
	};
</script>

<WindowVirtualizer data={feeds} getKey={(data) => data.id} overscan={10}>
	{#snippet children(item)}
		<div role="listitem" style:margin=".5rem 0">
			<a href={`/podcast/${item.id}`} class="card">
				<div class="thumbnail">
					<Image src={item.image} alt={item.title} blurdata={item.blurhash} full />
				</div>
				<div class="content">
					<div class="misc text-sm">
						<span>
							{getTime(item.newestItemPubdate)}
						</span>
						{#if item.explicit}
							<span>
								<Icon name="explicit" aria-hidden="true" stroke="none" class="explicit" />
							</span>
						{/if}
					</div>
					<h3 class="title">
						{item.title}
					</h3>
					{#if item.description}
						<div class="description text-sm">
							{@html item.description}
						</div>
					{/if}
				</div>
			</a>
		</div>
	{/snippet}
</WindowVirtualizer>

{#if status === "loading"}
	<div class="loading-list">
		{#each { length: 30 }}
			<div class="card placeholder">
				<div class="thumbnail-placeholder skeleton"></div>
				<div class="content-placeholder skeleton">
					<div class="time-placeholder skeleton"></div>
					<div class="title-placeholder skeleton"></div>
					<div class="description-placeholder skeleton"></div>
				</div>
			</div>
		{/each}
	</div>
{/if}

{#if metadata.more && status !== "error"}
	<Button
		type="button"
		size="full"
		loading={status === "loading"}
		onclick={async () => await updateList()}
	>
		Load More
	</Button>
{/if}

<style>
	.card {
		--pl-categories-thumbnail-size: 5rem;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1rem;
		border: 2px solid hsl(var(--pl-accent-95));
		border-radius: var(--pl-border-radius-md);
		padding: 0.75rem 1rem;

		@media (min-width: 768px) {
			--pl-categories-thumbnail-size: 6rem;
		}
		@media (min-width: 1280px) {
			--pl-categories-thumbnail-size: 7rem;
		}
		&:not(.placeholder) {
			transition-property: box-shadow, transform;
			transition-duration: 150ms;
			transition-timing-function: ease-in-out;
		}
		&:hover:not(.placeholder) {
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
		-webkit-line-clamp: 1;
		line-clamp: 1;
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

	.loading-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skeleton {
		animation: var(--pl-animation-pulse);
	}

	.content-placeholder {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
	}

	.thumbnail-placeholder {
		width: var(--pl-categories-thumbnail-size);
		height: var(--pl-categories-thumbnail-size);
		background-color: hsl(var(--pl-accent-80));
	}

	.time-placeholder {
		width: 30%;
		background-color: hsl(var(--pl-accent-80));
		height: 0.75rem;
	}
	.title-placeholder {
		width: 50%;
		background-color: hsl(var(--pl-accent-80));
		height: 1rem;
	}
	.description-placeholder {
		width: 80%;
		background-color: hsl(var(--pl-accent-80));
		height: 2ch;
	}
</style>
