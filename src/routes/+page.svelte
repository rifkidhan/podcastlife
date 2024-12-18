<script lang="ts">
	import type { PageServerData } from "./$types";
	import { Carousel, Head } from "$lib/components";

	let { data }: { data: PageServerData } = $props();

	let trendings = $derived(data.trendings);
	let recents = $derived(data.recents);
</script>

<Head />
<main class="page">
	<h1 class="sr-only">Podcastlife</h1>
	<section>
		<h2 class="text-lg">Trending</h2>
		<Carousel label="trending" items={trendings} />
	</section>
	<section>
		<h2 class="text-lg">Recent update</h2>
		<Carousel label="recent update" items={recents} />
	</section>
</main>

<style>
	section {
		max-width: 90vw;
	}
</style>
