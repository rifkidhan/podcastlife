<script lang="ts" context="module">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createSlider, createPopover, type CreateSliderProps } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { playing, currentTime } from '$lib/stores/nowplaying';
	import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-svelte';
	import { RunningText } from '$lib/components/common';
	import { createAnimate } from '$lib/utils/motion';

	import { Image } from '$lib/components/base';

	let src = '';
	let duration = 0;

	/**
	 * Slider handler
	 */
	const sliderHandler: CreateSliderProps['onValueChange'] = ({ curr, next }) => {
		if (curr[0] !== $currentTime) {
			currentTime.set(curr[0]);
			return curr;
		}

		$currentTime = next[0];
		return next;
	};

	const {
		elements: { root, range, thumb },
		states: { value },
		options
	} = createSlider({
		min: 0,
		max: Math.floor(duration),

		onValueChange: sliderHandler
	});

	/**
	 * Popover for volume
	 */
	const {
		elements: { trigger: volumeTrigger, content: volumeContent, arrow, close },
		states: { open: volumeOpen }
	} = createPopover({
		forceVisible: true
	});

	const {
		elements: { root: volumeSlider, range: volumeRange, thumb: volumeThumb },
		states: { value: volumeValue }
	} = createSlider({
		orientation: 'vertical',
		step: 0.1,
		max: 1,
		min: 0,
		defaultValue: [1]
	});

	const { animate } = createAnimate({});

	/**
	 * Format time
	 * @param time number
	 * @returns string
	 */
	const formatTime = (time: number) => {
		if (isNaN(time)) return '...';

		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);

		const seconds = Math.floor(time % 60);

		return `${hours > 0 ? `${hours}:` : ''}${hours > 0 && minutes < 10 ? `0${minutes}` : minutes}:${
			seconds < 10 ? `0${seconds}` : seconds
		}`;
	};

	$: content = $playing.content;

	$: {
		options.max.set(duration);
		options.disabled.set($currentTime === Infinity);
		$value[0] = $currentTime;
	}

	$: if (content) {
		src = content.url;
	}

	$: path = $page.url.pathname === '/play';

	const gotoPlayer = () => {
		if (path) {
			history.back();
		} else {
			goto(`/play?f=${$playing.podcast.id}&g=${content.guid}`);
		}
	};

	onMount(() => {
		$playing.paused = false;
	});

	let runningText: HTMLElement;

	$: if (runningText) {
		console.log(runningText.parentElement?.clientWidth, runningText.clientWidth);
	}
</script>

<div
	class="fixed bottom-0 z-[101] flex h-20 w-full items-center border-t-2 bg-accent-5 md:border-none"
>
	<span
		{...$root}
		use:root
		class="group absolute -top-2 left-0 hidden h-3 w-full items-center md:flex"
	>
		<span class="block h-[3px] w-full bg-accent-40">
			<span {...$range} use:range class="h-[3px] bg-picton" />
		</span>
		<span
			{...$thumb()}
			use:thumb
			class="hidden h-3 w-3 rounded-full border-2 bg-white group-hover:block group-focus:block group-aria-disabled:block"
		/>
	</span>
	<audio
		{src}
		bind:duration
		bind:currentTime={$currentTime}
		bind:paused={$playing.paused}
		bind:volume={$volumeValue[0]}
		autoplay
		preload="metadata"
		on:ended={() => {
			currentTime.set(0);
		}}
		on:play={(e) => {
			const audio = e.currentTarget;

			if (audio !== current) {
				current?.pause();
				current = audio;
				currentTime.set(0);
			}
		}}
	/>

	<div class="container mx-auto grid grid-cols-8 gap-5 py-3">
		<div class="col-span-2 hidden items-center gap-2 md:flex md:gap-3">
			<button
				class="btn btn-square btn-picton"
				on:click={() => {
					$playing.paused = !$playing.paused;
				}}
				title={$playing.paused ? 'Play' : 'Pause'}
			>
				{#if $playing.paused}
					<Play />
				{:else}
					<Pause />
				{/if}
			</button>
			<div class="relative flex w-full gap-1 text-xs font-semibold md:text-sm">
				<span>
					{formatTime($currentTime)}
				</span>
				<span class="font-bold">/</span>
				<span>
					{duration === Infinity ? 'live' : formatTime(duration)}
				</span>
			</div>
		</div>

		<div class="relative col-span-6 flex w-full items-center gap-2 md:col-span-5">
			<div class="relative block aspect-1 w-14 overflow-hidden rounded-md border-2">
				{#if content}
					<Image
						src={content.image}
						alt={content.title}
						class="h-full w-full object-cover object-center"
					/>
				{/if}
			</div>
			<div class="flex flex-col overflow-hidden pl-2">
				<RunningText>
					<span class:explicit={content?.explicit}>
						{content.title}
					</span>
				</RunningText>
				<a
					href="/podcast/{$playing.podcast.id}"
					class="max-w-fit text-xs font-semibold uppercase hover:text-picton lg:text-sm"
				>
					{$playing.podcast.title}
				</a>
			</div>
		</div>
		<div class="col-span-2 flex items-center justify-end gap-2 md:col-span-1 md:gap-3">
			<button
				class="btn btn-square btn-picton block md:hidden"
				on:click={() => {
					$playing.paused = !$playing.paused;
				}}
				title={$playing.paused ? 'Play' : 'Pause'}
			>
				{#if $playing.paused}
					<Play />
				{:else}
					<Pause />
				{/if}
			</button>
			<button
				class="btn btn-square btn-picton hidden lg:block"
				{...$volumeTrigger}
				use:volumeTrigger
				title="Volume"
				aria-label="Volume pop up"
			>
				{#if $volumeValue[0] === 0}
					<VolumeX />
				{:else}
					<Volume2 />
				{/if}
			</button>
			<button
				class="btn btn-square btn-picton"
				title="Open Player"
				on:click={() => {
					gotoPlayer();
				}}
			>
				<!-- {#if path}
					<ChevronUp />
				{:else}
					<ChevronDown />
				{/if} -->
				<span
					use:animate={{
						keyframe: {
							rotate: path ? 180 : 0
						}
					}}
				>
					<ChevronDown />
				</span>
			</button>
		</div>
	</div>
</div>

<!-- volume slider component -->
{#if $volumeOpen}
	<div {...$volumeContent} use:volumeContent class="z-[200] h-max w-fit">
		<span
			{...$volumeSlider}
			use:volumeSlider
			class="group relative flex h-24 w-3 items-center justify-center"
		>
			<span class="relative block h-full w-[3px] bg-accent-40">
				<span {...$volumeRange} use:volumeRange class="w-full bg-picton" />
			</span>
			<span {...$volumeThumb()} use:volumeThumb class="h-3 w-3 rounded-full bg-picton" />
		</span>
	</div>
{/if}
