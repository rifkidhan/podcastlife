<script lang="ts">
	import { Play, Pause } from 'lucide-svelte';
	import { Image } from '$lib/components/base';

	export let component = 'li';
	export let type: 'podcast' | 'live' = 'podcast';
	export let status: 'live' | 'pending' | 'ended' = 'ended';
	export let podcast: string;
	export let title: string | undefined;
	export let imageSrc = '';
	export let explicit = false;
	export let pubDate: string | undefined = undefined;
	export let start: string | undefined = undefined;
	export let end: string | undefined = undefined;
	export let play = false;
	export let linked = false;
	export let podcastId = '';

	const getTime = (date: string) => {
		const day = new Date(date);

		const format = new Intl.DateTimeFormat(undefined, {
			dateStyle: 'full',
			timeStyle: 'short'
		}).format(day);

		return format;
	};
</script>

<svelte:element this={component} class="root group">
	<div class="inner">
		<div class="image">
			<div class:live-border={type === 'live' && status === 'live'}>
				<Image
					src={imageSrc}
					alt={title ?? podcast}
					class="h-full w-full object-cover object-center"
				/>
			</div>
		</div>
		<div class="flex w-full flex-row items-center gap-2">
			<div class="content">
				<div class="inline-flex w-full flex-col">
					{#if linked}
						<a href="/podcast/{podcastId}" class="max-w-fit text-picton hover:underline">
							{podcast}
						</a>
					{/if}
					<h3 class="title" class:explicit>
						{#if title}
							<span class="group-hover:shadow-highlight">
								{title}
							</span>
						{/if}
					</h3>
				</div>

				<div class="date">
					{#if pubDate}
						{getTime(pubDate)}
					{/if}
					{#if type === 'live'}
						{#if status === 'live' && end}
							Live ended at {getTime(end)}
						{/if}
						{#if status === 'pending' && start}
							Live start at {getTime(start)}
						{/if}
						{#if status === 'ended' && end}
							Live ended at {getTime(end)}
						{/if}
					{/if}
				</div>
			</div>
			<button
				type="button"
				on:click
				on:focus
				title={play ? 'Pause podcast' : 'Play podcast'}
				class="btn btn-picton btn-square size-6 md:size-8 lg:size-10"
			>
				{#if play}
					<Pause />
				{:else}
					<Play />
				{/if}
			</button>
		</div>
	</div>
</svelte:element>

<style lang="postcss">
	.root {
		@apply relative block w-full rounded-md border-2 px-4 py-3 transition;
		&:hover {
			@apply -translate-x-1 -translate-y-1 shadow-drop;
		}
	}
	.inner {
		@apply relative flex items-center gap-3 lg:gap-5;
	}
	.image {
		@apply w-[10%] flex-none;
		& > div {
			@apply relative block aspect-1 w-full overflow-hidden rounded-md;
		}
	}
	.content {
		@apply relative flex w-full flex-col gap-1 lg:gap-2;
	}
	.title {
		@apply line-clamp-3 text-sm leading-none md:text-xl md:font-semibold lg:text-2xl;
	}

	.date {
		@apply text-xs md:text-sm;
	}
	.live-border {
		@apply border-4 border-cinnabar;
	}
</style>
