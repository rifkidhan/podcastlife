<script lang="ts">
	import type { PageServerData } from './$types';
	import { createTabs } from '@melt-ui/svelte';
	import { crossfade } from 'svelte/transition';
	import { Cardlist, Pagination } from '$lib/components/podcast';
	import { Image } from '$lib/components/base';
	import { playing, player } from '$lib/stores/nowplaying';

	export let data: PageServerData;

	$: podcast = data.podcast;
	$: episodefull = data.episodes;
	$: live = data.live;

	let start = 0;
	let end = 20;

	$: episodes = episodefull.slice(start, end);

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'pod'
	});

	const tabs = [
		{
			id: 'pod',
			title: 'Podcasts'
		},
		{
			id: 'live',
			title: 'Live'
		}
	];

	const [send, receive] = crossfade({
		duration: 300
	});

	const nowplaying = ({
		podcast,
		content
	}: {
		podcast: {
			id: string;
			title: string;
			image: string;
		};
		content: {
			guid: string;
			title: string;
			url: string;
			image: string;
			explicit?: boolean;
		};
	}) => {
		if (content.url !== $playing.content.url) {
			$playing.podcast = podcast;
			$playing.content = content;
			$playing.paused = false;
		} else {
			$playing.paused = !$playing.paused;
		}
	};

	let targetScrollElement: HTMLElement;
	let targetScroll = 0;

	$: if (targetScrollElement) {
		targetScroll = targetScrollElement.getBoundingClientRect().top;
	}

	// $: console.log(podcast.tags);
</script>

<main class="container mx-auto">
	<section class="grid w-full grid-cols-4 gap-10">
		<div
			class="relative col-span-full block aspect-1 w-full overflow-hidden rounded-lg border-2 shadow-drop md:col-span-1"
		>
			<Image
				src={podcast.image}
				alt={podcast.title}
				class="h-full w-full object-cover object-center"
			/>
		</div>
		<div class="col-span-full flex w-full flex-col gap-10 md:col-span-3">
			<div class="flex flex-col border-l-4 border-picton pl-4">
				<div class="text-base uppercase text-picton lg:text-lg">
					{podcast.author}
				</div>
				<h1 class="relative text-3xl font-bold lg:text-5xl xl:text-7xl">
					{podcast.title}
				</h1>
			</div>
			<div class="flex w-full flex-col gap-2">
				<div class="text-md prose max-w-none">
					{@html podcast.description}
				</div>
				<div class="flex w-full flex-wrap gap-3">
					{#each podcast.tags as tag}
						<span class="rounded-full bg-cerise px-2 py-1 text-xs uppercase text-white">
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="relative flex w-full flex-col-reverse gap-10 lg:flex-row">
		<div class="flex w-full flex-col lg:w-3/4" {...$root} use:root>
			<div
				class="flex max-w-max flex-row overflow-hidden rounded-t-md border-2 border-b-0 shadow-drop"
				{...$list}
				use:list
				bind:this={targetScrollElement}
			>
				{#each tabs as tabItem}
					<button
						{...$trigger(tabItem.id)}
						use:trigger
						class="relative flex min-w-[20%] px-4 py-3 data-[state=active]:text-white"
					>
						{#if $value === tabItem.id}
							<div
								in:send={{ key: 'trigger' }}
								out:receive={{ key: 'trigger' }}
								class="absolute inset-0 z-[49] h-full w-full bg-picton"
							/>
						{/if}
						<span class="z-50">
							{tabItem.title}
						</span>
					</button>
				{/each}
			</div>
			<div
				class="flex min-h-[100px] w-full flex-col gap-5 rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
				{...$content('pod')}
				use:content
			>
				<ul class="flex w-full flex-col gap-5 lg:gap-10">
					{#each episodes as item}
						<Cardlist
							title={item.title ?? ''}
							podcast={podcast.title}
							imageSrc={item.image ?? podcast.image}
							pubDate={item.pubDate}
							explicit={item.explicit}
							play={$playing.paused === false && item.enclosure.url === $playing.content.url}
							on:click={() => {
								if (!$player.open) {
									$player.open = true;
								}
								nowplaying({
									podcast: {
										id: podcast.id,
										title: podcast.title,
										image: podcast.image
									},
									content: {
										title: item.title ?? '',
										image: item.image ?? podcast.image,
										url: item.enclosure.url,
										guid: item.guid ?? '',
										explicit: item.explicit
									}
								});
							}}
						/>
					{/each}
				</ul>
				{#if episodefull.length > 20}
					<Pagination
						total={episodefull.length}
						limit={20}
						target={targetScroll}
						on:pagenow={({ detail }) => {
							start = detail.start;
							end = detail.end;
						}}
					/>
				{/if}
			</div>
			<div
				class="flex min-h-[100px] w-full flex-col gap-5 rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
				{...$content('live')}
				use:content
			>
				{#if live}
					<ul class="flex w-full flex-col gap-5 lg:gap-10">
						{#each live as item}
							<Cardlist
								title={item.title}
								podcast={podcast.title}
								type="live"
								status={item.status}
								imageSrc={item.image ?? podcast.image}
								explicit={false}
								start={item.start}
								end={item.end}
								play={$playing.paused === false && item.enclosure.url === $playing.content.url}
								on:click={() => {
									if (!$player.open) {
										$player.open = true;
									}
									nowplaying({
										podcast: {
											id: podcast.id,
											title: podcast.title,
											image: podcast.image
										},
										content: {
											title: item.title ?? '',
											image: item.image ?? podcast.image,
											url: item.enclosure.url,
											guid: item.guid ?? '',
											explicit: false
										}
									});
								}}
							/>
						{/each}
					</ul>
				{:else}
					No Live Podcast
				{/if}
			</div>
		</div>
		<div class="w-full flex-auto lg:w-auto">
			<div
				class="relative flex w-full flex-col gap-5 rounded-lg border-2 px-2 py-3 shadow-drop lg:sticky lg:top-20"
			>
				<h2 class="text-xl font-semibold text-picton lg:text-2xl">Live Now</h2>
				<div class="flex flex-col gap-3">
					{#if live && live.filter((val) => val.status === 'live').length > 0}
						{#each live as item}
							{#if item.status === 'live'}
								<button
									type="button"
									on:click={() => {
										if (!$player.open) {
											$player.open = true;
										}
										// nowplaying({ podcast: podcast.title, content: item, live: true });
									}}
									class="inline-flex items-center gap-2 hover:text-picton"
								>
									<span class="relative inline-flex square-2">
										<span
											class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinnabar"
										/>
										<span class="h-full w-full rounded-full bg-cinnabar" />
									</span>
									<span>
										{item.title}
									</span>
								</button>
							{/if}
						{/each}
					{:else}
						No Live Podcast
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
	[hidden] {
		@apply hidden;
	}
</style>
