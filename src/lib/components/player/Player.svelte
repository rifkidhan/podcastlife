<script lang="ts">
	import { fly } from "svelte/transition";
	import { MediaQuery } from "svelte/reactivity";
	import { pushState } from "$app/navigation";
	import { page } from "$app/state";
	import { audiometadata } from "$lib/state/player.svelte";
	import { useUI } from "$lib/state/ui.svelte";
	import { formatTime } from "$lib/utils/time";
	import Button from "../Button.svelte";
	import Icon from "../Icon.svelte";
	import Image from "../Image.svelte";
	import Slider from "../Slider.svelte";
	import Livesign from "../Livesign.svelte";
	import RunningText from "../RunningText.svelte";
	import FullPlayer from "$lib/components/player/FullPlayer.svelte";

	let track = $derived(audiometadata.track);

	const largeScreen = new MediaQuery("min-width: 768px");

	let useSlider = $derived(largeScreen.current && Number.isFinite(audiometadata.duration));

	const openFullPlayer = () => {
		pushState("", {
			fullPlayer: true
		});
	};
</script>

<div class="player" transition:fly|global={{ y: 300, opacity: 1 }} inert={useUI.inert}>
	{#key track.enclosure}
		<div class="seeker">
			<Slider
				{useSlider}
				bind:value={audiometadata.currentTime}
				min={0}
				max={Number.isFinite(audiometadata.duration) && audiometadata.readyState > 0
					? audiometadata.duration
					: 1}
			/>
		</div>
		<div class="wrapper">
			<div class="controls">
				<span class="backward">
					<Button
						variant="theme"
						size="square"
						title="Backward 15 seconds"
						onclick={() => (audiometadata.currentTime = audiometadata.currentTime -= 15)}
					>
						<Icon name="skip-backward" isHidden />
						<span class="sr-only">skip 15 second backward</span>
					</Button>
				</span>
				<span>
					<Button
						size="square"
						title={audiometadata.paused ? "Play" : "Pause"}
						aria-pressed={!audiometadata.paused}
						onclick={() => (audiometadata.paused = !audiometadata.paused)}
					>
						{#if audiometadata.state === "loading"}
							<Icon name="spinner" isHidden class="animate-spin" />
						{:else if audiometadata.state === "play"}
							<Icon name="pause" isHidden />
						{:else}
							<Icon name="play" isHidden />
						{/if}
						<span class="sr-only">toggle play and pause</span>
					</Button>
				</span>
				<span class="forward">
					<Button
						variant="theme"
						size="square"
						title="Forward 15 seconds"
						onclick={() => (audiometadata.currentTime = audiometadata.currentTime += 15)}
					>
						<Icon name="skip-forward" isHidden />
						<span class="sr-only">skip 15 second forward</span>
					</Button>
				</span>
			</div>
			<div class="duration text-sm">
				{#if audiometadata.readyState === 0}
					<span>--:--</span>
					<span>/</span>
					<span>--:--</span>
				{:else if !Number.isFinite(audiometadata.duration)}
					<span>
						<Livesign />
						<span>Live</span>
					</span>
				{:else}
					<span>{formatTime(audiometadata.currentTime)}</span>
					<span>/</span>
					<span>{formatTime(audiometadata.duration)}</span>
				{/if}
			</div>
			<div class="metadata">
				<div class="thumbnail">
					<Image src={track.image} alt={track.title} full />
				</div>
				<div class="title text-sm">
					<div class="running">
						<RunningText>
							{track.title}
						</RunningText>
					</div>
					<a href={`/podcast/${track.feedId}`} class="feed">
						{#if track.explicit}
							<Icon
								name="explicit"
								aria-label="explicit content"
								class="explicit"
								stroke="none"
								size={18}
							/>
						{/if}
						<span>{track.feed}</span>
					</a>
				</div>
			</div>
			<div class="misc">
				<Button size="square" title="Full player" onclick={openFullPlayer}>
					<Icon name="chevron-up" isHidden />
					<span class="sr-only">open full player</span>
				</Button>
			</div>
		</div>
		<audio
			src={track.enclosure}
			preload="metadata"
			title={track.title}
			bind:duration={null, (v) => (audiometadata.duration = Math.round(v))}
			bind:currentTime={audiometadata.currentTime}
			bind:paused={audiometadata.paused}
			bind:volume={audiometadata.volume}
			bind:readyState={audiometadata.readyState}
			onloadstart={() => {
				audiometadata.currentTime = 0;
				navigator.mediaSession.metadata = new MediaMetadata({
					title: track.title,
					artist: track.feed,
					artwork: [
						{
							src: track.image
						}
					]
				});
			}}
			onloadeddata={() => {
				audiometadata.paused = false;
			}}
			onended={() => {
				audiometadata.paused = true;
				audiometadata.currentTime = 0;
			}}
		>
		</audio>
	{/key}
</div>

{#if page.state.fullPlayer}
	<FullPlayer />
{/if}

<style>
	.player {
		display: block;
		position: sticky;
		bottom: 0;
		background-color: var(--pl-accent-1);
		z-index: var(--pl-player-index);
		inline-size: 100%;
	}
	.wrapper {
		display: grid;
		grid-template-areas: "controls duration metadata misc";
		grid-template-columns: auto auto minmax(0, 1fr) auto;
		gap: calc(var(--pl-spacing) * 6);
		block-size: var(--pl-player-height);
		max-inline-size: 92dvw;
		margin-inline: auto;
		align-items: center;

		@media (max-width: 768px) {
			grid-template-areas: "metadata controls misc";
			grid-template-columns: minmax(0, 1fr) repeat(2, auto);
		}
	}

	.controls {
		grid-area: controls;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: calc(var(--pl-spacing) * 4);

		@media (max-width: 768px) {
			& > :where(.forward, .backward) {
				display: none;
			}
		}
	}
	.duration {
		grid-area: duration;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		align-items: center;
		justify-items: center;
		inline-size: 12ch;

		@media (max-width: 768px) {
			display: none;
		}
	}
	.metadata {
		grid-area: metadata;
		display: flex;
		flex-direction: row;
		gap: calc(var(--pl-spacing) * 4);
		inline-size: 100%;

		& > .thumbnail {
			display: block;
			position: relative;
			block-size: 2.5rem;
			inline-size: 2.5rem;
			overflow: hidden;
			border: solid 1px;
			border-radius: var(--pl-radius);
			flex-shrink: 0;

			@media (max-width: 768px) {
				block-size: 2.25rem;
				inline-size: 2.25rem;
			}
		}
		& > .title {
			display: flex;
			flex-direction: column;
			line-height: 1.2;
			justify-content: center;
			overflow: hidden;

			.feed {
				font-weight: 600;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&:hover span {
					box-shadow: var(--pl-shadow-highlight);
				}
			}
		}
	}
	.misc {
		grid-area: misc;
	}
</style>
