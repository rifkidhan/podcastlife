<script lang="ts">
	import type { PageServerData } from "./$types";
	import { EpisodeCard, Head } from "$lib/components";

	let { data }: { data: PageServerData } = $props();

	let liveNow = $derived(data.live.filter((v) => v.status === "live"));
	let livePending = $derived(data.live.filter((v) => v.status === "pending"));
</script>

<Head title="Live Stream" />
<main class="page">
	<section>
		<h1 class="text-display">Live</h1>
	</section>
	<section>
		<h2 class="text-lg">Streaming Now</h2>
		<ul class="list">
			{#each liveNow as live}
				<li>
					<EpisodeCard
						type="live"
						title={live.title ?? "untitled"}
						feed={live.feedTitle}
						feedId={live.feedId}
						enclosure={live.enclosure.url}
						guid={live.guid ?? ""}
						summary={live.description}
						image={live.image ?? live.feedImage}
						status={live.status}
						start={live.start}
						end={live.end}
						linked
					/>
				</li>
			{:else}
				No one live now
			{/each}
		</ul>
	</section>
	<section>
		<h2 class="text-lg">Pending Stream</h2>
		<ul class="list">
			{#each livePending as live}
				<li>
					<EpisodeCard
						type="live"
						title={live.title ?? "untitled"}
						feed={live.feedTitle}
						feedId={live.feedId}
						enclosure={live.enclosure.url}
						guid={live.guid ?? ""}
						summary={live.description}
						image={live.image ?? live.feedImage}
						status={live.status}
						start={live.start}
						end={live.end}
						linked
					/>
				</li>
			{:else}
				No one live now
			{/each}
		</ul>
	</section>
</main>

<style>
	section {
		width: 90vw;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
