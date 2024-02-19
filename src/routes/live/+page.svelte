<script lang="ts">
	import type { PageServerData } from './$types';
	import { Cardlist } from '$lib/components/podcast';
	import { playing, player } from '$lib/stores/nowplaying';
	import type { NowPlayingProps } from '$lib/stores/nowplaying';
	import { Head } from '$lib/components/common';

	export let data: PageServerData;

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

	$: live = data.live;
</script>

<Head title="live stream" />

<main>
	<h1>Live</h1>
	<section class="container relative mx-auto flex flex-col gap-5">
		<h2>Livestream Now</h2>
		<ul class="flex w-full flex-col gap-5">
			{#each live.filter((val) => val.status === 'live') as item}
				<Cardlist
					title={item.title}
					podcast={item.feedTitle ?? ''}
					type="live"
					status={item.status}
					imageSrc={item.image}
					explicit={false}
					start={item.start}
					linked={true}
					podcastId={item.feedId}
					end={item.end}
					play={$playing.paused === false && item.enclosure.url === $playing.content.enclosure.url}
					on:click={() => {
						nowplaying({
							podcast: {
								id: item.feedId ?? '',
								title: item.feedTitle ?? '',
								image: item.image
							},
							content: {
								title: item.title ?? '',
								image: item.image ?? item.image,
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
	</section>
	<section class="container relative mx-auto flex flex-col gap-5">
		<h2>Pending Livestream</h2>
		<ul class="flex w-full flex-col gap-5">
			{#each live.filter((val) => val.status === 'pending') as item}
				<Cardlist
					title={item.title}
					podcast={item.feedTitle ?? ''}
					type="live"
					status={item.status}
					imageSrc={item.image}
					explicit={false}
					linked={true}
					podcastId={item.feedId}
					start={item.start}
					end={item.end}
					play={$playing.paused === false && item.enclosure.url === $playing.content.enclosure.url}
					on:click={() => {
						nowplaying({
							podcast: {
								id: item.feedId ?? '',
								title: item.feedTitle ?? '',
								image: item.image
							},
							content: {
								title: item.title ?? '',
								image: item.image ?? item.image,
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
	</section>
	<!-- <section class="container relative mx-auto flex flex-col gap-5">
		<h2>Ended Livestream</h2>
		<ul class="flex w-full flex-col gap-5">
			{#each live.filter((val) => val.status === 'ended') as item}
				<Cardlist
					title={item.title}
					podcast={item.feedTitle ?? ''}
					type="live"
					status={item.status}
					imageSrc={item.image}
					linked={true}
					podcastId={item.feedId}
					explicit={false}
					start={item.start}
					end={item.end}
					play={$playing.paused === false && item.enclosure.url === $playing.content.enclosure.url}
					on:click={() => {
						nowplaying({
							podcast: {
								id: item.feedId ?? '',
								title: item.feedTitle ?? '',
								image: item.image
							},
							content: {
								title: item.title ?? '',
								image: item.image ?? item.image,
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
	</section> -->
</main>
