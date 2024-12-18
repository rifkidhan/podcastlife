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
			<List data={data.feeds} category={page.params.categoryId} />
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
</style>
