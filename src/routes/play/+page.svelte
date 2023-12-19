<script lang="ts">
	import type { PageServerData } from './$types';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { Image } from '$lib/components/base';
	import { RunningText } from '$lib/components/common';
	import { playing, currentTime } from '$lib/stores/nowplaying';
	import { createTabs } from '@melt-ui/svelte';
	import { crossfade } from 'svelte/transition';

	export let data: PageServerData;

	$: episode = data.episode;
	$: chapters = data.chapters;
	$: transcript = data.transcript;

	const {
		elements: { root, list, content: tabContent, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'description'
	});

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
	let chaptersWrapper: HTMLDivElement;

	let chapter = 0;

	$: if (chapters) {
		chapter =
			chapters.length -
			chapters.filter((val: { startTime: number }) => $currentTime < val.startTime).length -
			1;
	}

	const [send, receive] = crossfade({
		duration: 300
	});

	$: content = $playing.content;
</script>

{#if content}
	<section class="container relative mx-auto grid min-h-screen grid-cols-1 gap-10 lg:grid-cols-2">
		<div class="relative flex w-full flex-col gap-5">
			<div class="relative block aspect-1 w-full overflow-hidden rounded-lg square-32">
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
		<div class="relative flex w-full flex-col" {...$root} use:root>
			<div
				class="flex max-w-max flex-row overflow-hidden rounded-t-md border-2 border-b-0 bg-accent-5 shadow-drop"
				{...$list}
				use:list
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
				class="flex max-h-screen min-h-[100px] w-full flex-col gap-5 overflow-y-auto rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
				{...$tabContent('description')}
				use:tabContent
			>
				{#if episode.description}
					<div
						class="prose relative block max-w-none prose-p:mb-2 prose-p:mt-0 prose-p:break-words"
					>
						{@html episode.description}
					</div>
				{:else}
					No Description
				{/if}
			</div>
			<div
				class="flex max-h-screen min-h-[100px] w-full flex-col gap-3 overflow-y-auto rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
				{...$tabContent('chapters')}
				use:tabContent
				bind:this={chaptersWrapper}
			>
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
			</div>
			<div
				class="flex max-h-screen min-h-[100px] w-full flex-col gap-5 overflow-y-auto rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
				{...$tabContent('transcript')}
				use:tabContent
				bind:this={transcriptWrapper}
			>
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
			</div>
		</div>
	</section>
{/if}

<style lang="postcss">
	[hidden] {
		@apply hidden;
	}
</style>
