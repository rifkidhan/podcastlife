<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import { Image } from '$lib/components/base';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let data: PageServerData;

	$: meta = data.meta;
	$: podcasts = data.feeds;

	const getTime = (date: number) => {
		const day = new Date(date * 1000);

		const format = new Intl.DateTimeFormat(undefined, {
			dateStyle: 'long',
			timeStyle: 'short'
		}).format(day);

		return format;
	};

	$: pageNow = $page.url.searchParams.get('p') ? Number($page.url.searchParams.get('p')) : 1;
</script>

<section class="container relative mx-auto flex w-full flex-col gap-5">
	<ul class="flex w-full flex-col gap-5" data-sveltekit-preload-data="tap">
		{#each podcasts as item (item.id)}
			<li class="relative block w-full">
				<a
					href="/podcast/{item.id}"
					class="group flex w-full gap-3 overflow-hidden rounded-md border-2 bg-accent-5 px-3 py-2 transition hover:-translate-x-1.5 hover:-translate-y-1 hover:shadow-drop hover:shadow-accent-95"
				>
					<div class="relative block aspect-1 size-20 overflow-hidden rounded-md">
						<Image
							src={item.image ?? ''}
							alt={item.title}
							class="h-full w-full object-cover object-center group-hover:scale-105"
						/>
					</div>
					<div class="flex flex-col px-2 py-3">
						<span class="line-clamp-2 text-sm uppercase text-picton md:text-base">
							{item.author}
						</span>
						<h3 class="text-lg font-bold md:text-xl lg:text-2xl">
							<span class="line-clamp-3 group-hover:shadow-highlight">
								{item.title}
							</span>
						</h3>
						<span>
							update {getTime(item.newestItemPubdate)}
						</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>

	<div class="mx-auto inline-flex flex-row items-center gap-x-3">
		{#if $page.url.searchParams.get('p')}
			{#if pageNow > 2}
				<a
					href="{$page.url.pathname}?p={pageNow - 1}&before={meta.cursor}"
					class="btn btn-picton btn-square"
				>
					<ChevronLeft />
				</a>
			{:else}
				<a href={$page.url.pathname} class="btn btn-picton btn-square">
					<ChevronLeft />
				</a>
			{/if}
		{/if}
		<p>
			Page {pageNow}
		</p>
		{#if meta.more}
			<a
				href="{$page.url.pathname}?p={pageNow + 1}&after={meta.cursor}"
				class="btn btn-picton btn-square"
			>
				<ChevronRight />
			</a>
		{/if}
	</div>
</section>
