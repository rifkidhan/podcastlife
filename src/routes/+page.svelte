<script lang="ts">
	import type { PageServerData } from './$types';
	import { Image } from '$lib/components/base';
	import { Carousel } from '$lib/components/common';

	export let data: PageServerData;
</script>

<main class="mt-20">
	<section class="container relative mx-auto flex flex-col gap-5">
		<h1 class="text-3xl font-bold">podcastlife</h1>
	</section>
	<section class="container relative mx-auto flex flex-col gap-5">
		<h2 class="text-dt-display-md font-semibold">Trending Now</h2>
		<!-- <ul class="grid w-full grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
			{#each data.trending as trending, i}
				<li
					class="group flex w-full flex-col gap-3 overflow-hidden rounded-md border-2 bg-accent-5 transition hover:-translate-x-1.5 hover:-translate-y-1 hover:shadow-drop hover:shadow-accent-95"
				>
					<a href="/podcast/{trending.id}">
						<div class="relative block aspect-1 overflow-hidden">
							<Image
								src={trending.image ?? ''}
								alt={trending.title}
								class="h-full w-full object-cover object-center group-hover:scale-105"
							/>
						</div>
						<div class="flex flex-col px-2 py-3">
							<span class="uppercase text-picton">
								{trending.author}
							</span>
							<h3 class="text-xl font-bold md:text-2xl">
								<span class="group-hover:shadow-highlight">
									{trending.title}
								</span>
							</h3>
						</div>
					</a>
				</li>
			{/each}
		</ul> -->
		<Carousel items={data.trending} />
	</section>
</main>
