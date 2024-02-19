<script lang="ts">
	import type { PageServerData } from './$types';
	import { Image } from '$lib/components/base';
	import { Carousel, Head } from '$lib/components/common';

	export let data: PageServerData;
</script>

<Head />

<main class="mt-20">
	<section class="container relative mx-auto flex flex-col gap-5">
		<h1 class="text-4xl font-bold xl:text-7xl">podcastlife</h1>
	</section>
	<section class="container relative mx-auto flex flex-col gap-5">
		<h2 class="text-3xl font-semibold">Trending Now</h2>
		<Carousel items={data.trending} />
	</section>
	<section class="container relative mx-auto flex flex-col gap-5">
		<h2 class="text-3xl font-semibold">Last Update</h2>
		<Carousel items={data.recents} />
	</section>
</main>
