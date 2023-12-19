<script lang="ts">
	import type { PageServerData } from './$types';
	import { Cardlist } from '$lib/components/podcast';
	import { playing, player } from '$lib/stores/nowplaying';

	export let data: PageServerData;

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

	$: live = data.live;
</script>

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
					play={$playing.paused === false && item.enclosure.url === $playing.content.url}
					on:click={() => {
						if (!$player.open) {
							$player.open = true;
						}
						nowplaying({
							podcast: {
								id: item.feedId ?? '',
								title: item.feedTitle ?? '',
								image: item.image
							},
							content: {
								title: item.title ?? '',
								image: item.image,
								url: item.enclosure.url,
								guid: item.guid ?? '',
								explicit: false
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
					play={$playing.paused === false && item.enclosure.url === $playing.content.url}
					on:click={() => {
						if (!$player.open) {
							$player.open = true;
						}
						nowplaying({
							podcast: {
								id: item.feedId ?? '',
								title: item.feedTitle ?? '',
								image: item.image
							},
							content: {
								title: item.title ?? '',
								image: item.image,
								url: item.enclosure.url,
								guid: item.guid ?? '',
								explicit: false
							}
						});
					}}
				/>
			{/each}
		</ul>
	</section>
	<section class="container relative mx-auto flex flex-col gap-5">
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
					play={$playing.paused === false && item.enclosure.url === $playing.content.url}
					on:click={() => {
						if (!$player.open) {
							$player.open = true;
						}
						nowplaying({
							podcast: {
								id: item.feedId ?? '',
								title: item.feedTitle ?? '',
								image: item.image
							},
							content: {
								title: item.title ?? '',
								image: item.image,
								url: item.enclosure.url,
								guid: item.guid ?? '',
								explicit: false
							}
						});
					}}
				/>
			{/each}
		</ul>
	</section>
</main>
