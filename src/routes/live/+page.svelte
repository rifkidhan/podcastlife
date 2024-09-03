<script lang="ts">
	import type { PageServerData } from './$types';
	import { Main, Head, Cardlist } from '$lib/components';

	let { data }: { data: PageServerData } = $props();

	let pending_livestream = $derived.by(() => {
		let pending = data.live.filter((v) => v.status === 'live');

		return pending;
	});

	let now_livestream = $derived.by(() => {
		let now = data.live.filter((v) => v.status === 'pending');

		return now;
	});
</script>

<Head title="Live Podcast" />
<Main>
	<section class="container full">
		<h1 class="text-display">Live</h1>
	</section>
	<section class="live container full">
		<h2 class="text-large">Now Livestream</h2>
		<div role="list" class="list">
			{#each now_livestream as item}
				<Cardlist
					type="live"
					role="listitem"
					podcast={item.feedTitle}
					podcastId={item.feedId}
					title={item.title}
					enclosure={item.enclosure.url}
					guid={item.guid ?? ''}
					image={item.image ?? item.feedImage}
					explicit={false}
					start={item.start}
					end={item.end}
					altEnclosure={item.alternativeEnclosures}
					status={item.status}
					linked
				/>
			{/each}
		</div>
	</section>
	<section class="live container full">
		<h2 class="text-large">Pending Livestream</h2>
		<div role="list" class="list">
			{#each pending_livestream as item}
				<Cardlist
					type="live"
					role="listitem"
					podcast={item.feedTitle}
					podcastId={item.feedId}
					title={item.title}
					enclosure={item.enclosure.url}
					guid={item.guid ?? ''}
					image={item.image ?? item.feedImage}
					explicit={false}
					start={item.start}
					end={item.end}
					altEnclosure={item.alternativeEnclosures}
					status={item.status}
					linked
				/>
			{/each}
		</div>
	</section>
</Main>

<style>
	section {
		&:is(.live) {
			display: flex;
			flex-direction: column;
			gap: var(--space-10);
		}

		& > :where(h2) {
			font-weight: 700;
			text-transform: uppercase;
		}
		& > .list {
			display: flex;
			flex-direction: column;
			gap: var(--space-5);
		}
	}
</style>
