<script lang="ts">
	import type { PageServerData } from './$types';
	import { navigating } from '$app/stores';
	import { Cardlist, Pagination } from '$lib/components/podcast';
	import { Image } from '$lib/components/base';
	import { playing, player } from '$lib/stores/nowplaying';
	import type { NowPlayingProps } from '$lib/stores/nowplaying';
	import { Tabs, TabsContent, Head } from '$lib/components/common';

	export let data: PageServerData;

	$: podcast = data.podcast;
	$: episodefull = data.episodes;
	$: live = data.live;

	let start = 0;
	let end = 20;

	$: episodes = episodefull.slice(start, end);

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

	const nowplaying = ({
		podcast,
		content
	}: {
		podcast: NowPlayingProps['podcast'];
		content: NowPlayingProps['content'];
	}) => {
		if (!$player.open) {
			$player.open = true;
		}
		if (content.enclosure.url !== $playing.content.enclosure.url) {
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
</script>

<Head title={podcast.title} />

<main class="container mx-auto">
	<section class="grid w-full grid-cols-4 gap-10">
		<div
			class="relative col-span-full block aspect-1 w-full overflow-hidden rounded-lg border-2 shadow-drop md:col-span-1"
			style:--tag="img-{podcast.id}"
		>
			<Image
				src={podcast.image}
				alt={podcast.title}
				class="h-full w-full object-cover object-center"
			/>
		</div>
		<div class="col-span-full flex w-full flex-col gap-10 md:col-span-3">
			<div class="flex flex-col border-l-4 border-picton pl-4">
				<div style:--tag="author-{podcast.id}" class="text-base uppercase text-picton lg:text-lg">
					{podcast.author}
				</div>
				<h1
					style:--tag="title-{podcast.id}"
					class="relative text-3xl font-bold lg:text-5xl xl:text-7xl"
				>
					{podcast.title}
				</h1>
			</div>
			<div class="flex w-full flex-col gap-2">
				<div class="flex w-full flex-wrap gap-3">
					{#each podcast.tags as tag}
						<span class="rounded-full bg-cerise px-2 py-1 text-xs uppercase text-white">
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</div>
		<div class="text-md prose col-span-full max-w-none">
			{@html podcast.description}
		</div>
	</section>

	<section class="relative flex w-full flex-col-reverse gap-10 lg:flex-row">
		<Tabs class="flex w-full flex-col lg:w-3/4" {tabs} bind:ref={targetScrollElement} let:active>
			<TabsContent contentId="pod" value={active}>
				<ul class="flex w-full flex-col gap-5 lg:gap-10">
					{#each episodes as item (item.enclosure.url)}
						<Cardlist
							title={item.title ?? ''}
							podcast={podcast.title}
							imageSrc={item.image ?? podcast.image}
							pubDate={item.pubDate}
							explicit={item.explicit}
							play={$playing.paused === false &&
								item.enclosure.url === $playing.content.enclosure.url}
							on:click={() => {
								nowplaying({
									podcast: {
										id: podcast.id,
										title: podcast.title,
										image: podcast.image
									},
									content: {
										title: item.title ?? '',
										image: item.image ?? podcast.image,
										enclosure: item.enclosure,
										guid: item.guid ?? '',
										explicit: item.explicit,
										altEnclosure: item.alternativeEnclosures
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
			</TabsContent>
			<TabsContent contentId="live" value={active}>
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
								play={$playing.paused === false &&
									item.enclosure.url === $playing.content.enclosure.url}
								on:click={() => {
									nowplaying({
										podcast: {
											id: podcast.id,
											title: podcast.title,
											image: podcast.image
										},
										content: {
											title: item.title ?? '',
											image: item.image ?? podcast.image,
											enclosure: item.enclosure,
											guid: item.guid ?? '',
											explicit: false,
											altEnclosure: item.alternativeEnclosures
										}
									});
								}}
							/>
						{/each}
					</ul>
				{:else}
					No Live Podcast
				{/if}
			</TabsContent>
		</Tabs>
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
										nowplaying({
											podcast: {
												id: podcast.id,
												title: podcast.title,
												image: podcast.image
											},
											content: {
												title: item.title ?? '',
												image: item.image ?? podcast.image,
												enclosure: item.enclosure,
												guid: item.guid ?? '',
												explicit: false,
												altEnclosure: item.alternativeEnclosures
											}
										});
									}}
									class="inline-flex items-center gap-2 hover:text-picton"
								>
									<span class="relative inline-flex size-2">
										<span
											class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinnabar"
										/>
										<span class="h-full w-full rounded-full bg-cinnabar" />
									</span>
									<span class="text-left">
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
