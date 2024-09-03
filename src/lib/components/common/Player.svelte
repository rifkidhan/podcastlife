<script lang="ts">
	import { Button, Image, Icons, Progress, Slider, useUI } from '$lib/components';
	import { playerState } from '$lib/stores/player.svelte';
	import RunningText from './RunningText.svelte';
	import { formatTime } from '$lib/utils/time';
	import { fly } from 'svelte/transition';

	const uiState = useUI();

	let podcast = $derived(playerState.podcast);
	let loadstart = $state(true);

	let current = $derived(Math.floor(playerState.currentTime));

	let windowWidth = $state(0);
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if uiState.player}
	<div transition:fly={{ y: 350, opacity: 1 }} class="player" inert={uiState.menuOpen}>
		{#key podcast.enclosure}
			<audio
				src={podcast.enclosure}
				preload="metadata"
				bind:duration={playerState.duration}
				bind:currentTime={playerState.currentTime}
				bind:paused={playerState.paused}
				onloadstart={() => {
					playerState.currentTime = 0;
					loadstart = true;
					playerState.loading = true;
					navigator.mediaSession.metadata = new MediaMetadata({
						title: playerState.podcast.title,
						artist: playerState.feed.title,
						artwork: [
							{
								src: playerState.podcast.image
							}
						]
					});
				}}
				onloadeddata={() => {
					playerState.paused = false;
				}}
				onseeking={() => {
					loadstart = false;
					playerState.loading = true;
				}}
				oncanplay={() => {
					playerState.loading = false;
				}}
				onended={() => {
					playerState.paused = true;
					playerState.currentTime = 0;
				}}
			>
				{#if podcast.altEnclosure}
					{#each podcast.altEnclosure as alt}
						{#if alt.default}
							<source src={alt.source[0].uri} type={alt.type} />
						{:else}
							<source src={alt.source[0].uri} type={alt.type} />
						{/if}
					{/each}
				{/if}
			</audio>
			<div class="inner container">
				<div class="left">
					<Button
						type="button"
						variant="picton"
						title={playerState.paused ? 'Play' : 'Pause'}
						loading={playerState.loading}
						onclick={() => (playerState.paused = !playerState.paused)}
					>
						{#if playerState.paused}
							<Icons icon="play" aria-hidden="true" />
						{:else}
							<Icons icon="pause" aria-hidden="true" />
						{/if}
					</Button>
					<div class="duration text-sm">
						{#if loadstart && playerState.loading}
							--/--
						{:else if !Number.isFinite(playerState.duration)}
							<span class="live-sign">
								<span class="sign">
									<span class="pulse"></span>
									<span></span>
								</span>
								<span>Live</span>
							</span>
						{:else}
							<span>{formatTime(current)}</span>
							<span>/</span>
							<span>{formatTime(playerState.duration)}</span>
						{/if}
					</div>
				</div>
				<div class="mid">
					<div class="thumbnail">
						<Image src={podcast.image} alt={podcast.title} full />
					</div>
					<div class="title">
						<RunningText class="text-normal">
							<span class:explicit={podcast.explicit}>
								{podcast.title}
							</span>
						</RunningText>
						<a href={`/podcast/${playerState.feed.id}`} class="text-sm">
							{playerState.feed.title}
						</a>
					</div>
				</div>
				<div class="right">another</div>
			</div>
			<div class="upper">
				{#if Number.isFinite(playerState.duration) && windowWidth > 1024}
					<Slider
						id="seeker"
						bind:now={playerState.currentTime}
						min={0}
						max={Math.floor(playerState.duration)}
						disabled={!Number.isFinite(playerState.duration)}
					/>
				{:else}
					<Progress
						min={0}
						max={Number.isFinite(playerState.duration) ? Math.floor(playerState.duration) : 1}
						now={Number.isFinite(playerState.duration) ? current : 1}
						label="Podcast progress"
					/>
				{/if}
			</div>
		{/key}
	</div>
{/if}

<style>
	.player {
		position: sticky;
		bottom: 0px;
		z-index: 10;
		display: block;
		width: 100%;
		background-color: var(--accent-5);
		height: var(--space-16);

		@media (min-width: 768px) {
			height: var(--space-20);
		}
	}

	.inner {
		margin-inline: auto;
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		gap: var(--space-5);
		padding-block: var(--space-3);

		& > .left {
			grid-column: span 2 / span 2;
			display: none;

			@media (min-width: 768px) {
				display: flex;
				gap: var(--space-3);
				align-items: center;
			}

			.duration {
				display: flex;
				position: relative;
				gap: var(--space-1);
			}
		}

		& > .mid {
			grid-column: span 6 / span 6;
			display: flex;
			position: relative;
			width: 100%;
			align-items: center;
			column-gap: var(--space-2);

			@media (min-width: 768px) {
				grid-column: span 5 / span 5;
			}
			@media (min-width: 1024px) {
				column-gap: var(--space-3);
			}

			& > .thumbnail {
				display: block;
				position: relative;
				aspect-ratio: 1 / 1;
				width: var(--space-8);
				flex: none;
				overflow: hidden;
				border-radius: var(--space-2);
				border: 2px solid currentColor;

				@media (min-width: 768px) {
					width: var(--space-12);
				}
			}
			& > .title {
				display: flex;
				flex-direction: column;
				overflow: hidden;

				@media (min-width: 768px) {
					gap: var(--space-1);
				}

				& > a {
					max-width: fit-content;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-transform: uppercase;
					color: var(--accent-80);

					&:hover {
						color: var(--picton);
					}
				}
			}
		}

		& > .right {
			grid-column: span 2 / span 2;
			width: 100%;

			@media (min-width: 768px) {
				grid-column: span 1 / span 1;
			}
		}
	}

	.upper {
		display: block;
		position: absolute;
		left: 0px;
		height: fit-content;
		width: 100%;
		top: 0px;

		&:has([role='slider']) {
			top: -0.375rem;
		}

		@media (min-width: 1024px) {
			display: flex;
			text-align: center;
		}
	}
</style>
