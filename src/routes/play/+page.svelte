<script lang="ts">
	import type { PageServerData } from './$types';
	import { Image } from '$lib/components/base';
	import { playing, currentTime } from '$lib/stores/nowplaying';
	import { Tabs, TabsContent } from '$lib/components/common';

	export let data: PageServerData;

	$: episode = data.episode;
	$: chapters = data.chapters;
	$: transcript = data.transcript;

	const tabs = [
		{
			id: 'description',
			title: 'Description'
		},
		{
			id: 'chapters',
			title: 'Chapters'
		},
		{
			id: 'transcript',
			title: 'Transcript'
		}
	];

	let transcriptWrapper: HTMLElement;
	let chaptersWrapper: HTMLElement;

	let chapter = 0;

	$: if (chapters) {
		chapter =
			chapters.length -
			chapters.filter((val: { startTime: number }) => $currentTime < val.startTime).length -
			1;
	}

	$: content = $playing.content;
</script>

{#if content}
	<section
		class="container relative mx-auto mb-20 grid min-h-screen grid-cols-1 gap-10 md:mb-24 lg:grid-cols-2"
	>
		<div class="relative flex w-full flex-col gap-5">
			<div class="relative block aspect-1 size-32 overflow-hidden rounded-lg">
				<Image
					src={content.image}
					alt={content.title}
					class="h-full w-full object-cover object-center"
				/>
			</div>
			<div>
				<h1 class="text-xl font-semibold md:text-3xl" class:explicit={content.explicit}>
					{content.title}
				</h1>
				<div>
					{$playing.podcast.title}
				</div>
			</div>
		</div>

		<Tabs class="relative flex w-full flex-col" {tabs} let:active>
			<TabsContent contentId="description" value={active}>
				{#if episode.description}
					<div
						class="prose relative block max-w-none prose-p:mb-2 prose-p:mt-0 prose-p:break-words"
					>
						{@html episode.description}
					</div>
				{:else}
					No Description
				{/if}
			</TabsContent>
			<TabsContent contentId="chapters" bind:ref={chaptersWrapper} value={active}>
				{#if chapters}
					{#each chapters as item, i}
						<button
							type="button"
							on:click={() => ($currentTime = item.startTime)}
							class="flex w-full items-center gap-2 rounded-md border-2 px-3 py-2 transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-drop-sm"
							class:border-picton={i === chapter}
						>
							<span class="relative block aspect-1 w-14 overflow-hidden rounded-md border-2">
								<Image
									src={item.img}
									alt={item.title}
									class="h-full w-full object-cover object-center"
								/>
							</span>
							<span>
								{item.title}
							</span>
						</button>
					{/each}
				{:else}
					No chapters provide.
				{/if}
			</TabsContent>
			<TabsContent contentId="transcript" bind:ref={transcriptWrapper} value={active}>
				{#if transcript}
					{#each transcript as item, i}
						<div class="flex w-full flex-col">
							<span class="font-semibold">
								{item.speaker}
							</span>
							<span
								class="rounded-md border-2 px-3 py-2"
								class:bg-picton={$currentTime >= item.startTime && $currentTime <= item.endTime}
							>
								{item.body}
							</span>
						</div>
					{/each}
				{:else}
					No transcript provide.
				{/if}
			</TabsContent>
		</Tabs>
	</section>
{/if}
