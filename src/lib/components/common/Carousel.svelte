<script lang="ts">
	import { Image } from '$lib/components/base';
	import type { TrendingFeed } from '$lib/types';
	export let items: TrendingFeed[];
</script>

<div class="flex w-full" data-sveltekit-preload-data="tap">
	<ul
		class="relative flex touch-pan-x snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto pb-8 pt-1"
	>
		{#each items as item, i}
			<li class="relative w-2/3 shrink-0 snap-center snap-always md:w-1/3 lg:w-1/4">
				<a
					href="/podcast/{item.id}"
					class="group flex h-full w-full flex-col gap-3 overflow-hidden rounded-md border-2 bg-accent-5 transition hover:-translate-x-1.5 hover:-translate-y-1 hover:shadow-drop hover:shadow-accent-95"
				>
					<div class="relative block aspect-1 overflow-hidden">
						<Image
							src={item.image ?? ''}
							alt={item.title}
							class="h-full w-full object-cover object-center group-hover:scale-105"
						/>
					</div>
					<div class="flex flex-col px-2 py-3">
						<span class="text-sm uppercase text-picton md:text-base">
							{item.author}
						</span>
						<h3 class="text-lg font-bold md:text-xl lg:text-2xl">
							<span class="line-clamp-3 group-hover:shadow-highlight md:line-clamp-4">
								{item.title}
							</span>
						</h3>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
