<script lang="ts">
	import { Carousel } from "$lib/components";
	import { page } from "$app/state";
	import List from "./List.svelte";
	import type { PageServerData } from "./$types";

	let { data }: { data: PageServerData } = $props();

	let trending = $derived(data.trending);
</script>

{#key page.params.categoryId}
	<main class="page">
		<section>
			<h1 class="text-display">{page.params.categoryId}</h1>
		</section>
		<section>
			<h2 class="text-xl">
				Trending on {page.params.categoryId}
			</h2>
			<Carousel label="Trending Carousel" items={trending} />
		</section>
		<section>
			<h2 class="text-xl">
				Another in {page.params.categoryId}
			</h2>
			{#await data.feeds}
				<div class="loading-list">
					{#each { length: 30 }}
						<div class="placeholder">
							<div class="thumbnail skeleton"></div>
							<div class="content skeleton">
								<div class="time skeleton"></div>
								<div class="title skeleton"></div>
								<div class="description skeleton"></div>
							</div>
						</div>
					{/each}
				</div>
			{:then feeds}
				<List data={feeds} category={page.params.categoryId} />
			{/await}
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

	.loading-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.placeholder {
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

		.content {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 1rem;
		}

		.thumbnail {
			width: var(--pl-categories-thumbnail-size);
			height: var(--pl-categories-thumbnail-size);
			background-color: hsl(var(--pl-accent-80));
		}

		.time {
			width: 30%;
			background-color: hsl(var(--pl-accent-80));
			height: 0.75rem;
		}
		.title {
			width: 50%;
			background-color: hsl(var(--pl-accent-80));
			height: 1rem;
		}
		.description {
			width: 80%;
			background-color: hsl(var(--pl-accent-80));
			height: 2ch;
		}
	}

	.skeleton {
		animation: var(--pl-animation-pulse);
	}
</style>
