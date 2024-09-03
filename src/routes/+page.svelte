<script lang="ts">
	import { Carousel, Main, Head } from '$lib/components';

	const { data } = $props();
</script>

<Head />
<Main>
	<h1 class="sr-only">Podcastlife</h1>

	<section class="container full">
		<h2 class="text-xl">Trending now</h2>
		<Carousel items={data.trendings} label="Trending carousel" />
	</section>
	<section class="container full">
		<h2 class="text-xl">Recent Update</h2>
		<Carousel items={data.recents} label="Recent update carousel" />
	</section>
</Main>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);

		& > h2 {
			font-weight: 600;
		}
	}
</style>
