<script lang="ts">
	import {
		Image,
		Button,
		Slider,
		LiveSign,
		Progress,
		RunningText,
		Icon,
		useUI
	} from "$lib/components";
	import { formatTime } from "$lib/utils/time";
	import { playerDetail } from "$lib/stores/player.svelte";
	import { fly } from "svelte/transition";
	import { innerWidth } from "svelte/reactivity/window";

	const ui = useUI();
	const playState = playerDetail();

	let podcast = $derived(playState.podcast);
	let currentTime = $derived(playState.currentTime);
	let duration = $derived(playState.duration);
	let loadStart = $state(true);
	let volume = $state(1);

	let useSlider = $derived(innerWidth.current >= 768 && Number.isFinite(duration));

	let playerModal: HTMLDialogElement | undefined = $state();
	let openPlayerModal = $state(false);

	let playerModalState = $derived.by(() => {
		if (!playerModal) return false;

		if (openPlayerModal) {
			playerModal.showModal();
			return true;
		}

		playerModal.close();

		return false;
	});
</script>

{#if ui.player}
	<div class="player" transition:fly={{ y: 300, opacity: 1 }} inert={ui.menuOpen}>
		{#key podcast.enclosure}
			<audio
				src={podcast.enclosure}
				preload="metadata"
				bind:duration={null, (v) => (playState.duration = Math.round(v))}
				bind:currentTime={playState.currentTime}
				bind:paused={playState.paused}
				bind:volume
				onloadstart={() => {
					playState.currentTime = 0;
					loadStart = true;
					playState.loading = true;
					navigator.mediaSession.metadata = new MediaMetadata({
						title: playState.podcast.title,
						artist: playState.feed.title,
						artwork: [
							{
								src: playState.podcast.image
							}
						]
					});
				}}
				onloadeddata={() => {
					playState.paused = false;
				}}
				onseeking={() => {
					loadStart = false;
					playState.loading = true;
				}}
				oncanplay={() => {
					playState.loading = false;
				}}
				onended={() => {
					playState.paused = true;
					playState.currentTime = 0;
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

			<div class="seeker">
				{#if useSlider}
					<Slider id="seeker" bind:value={playState.currentTime} min={0} max={duration} />
				{:else}
					<Progress
						max={Number.isFinite(duration) && !playState.loading ? duration : 1}
						value={currentTime}
					/>
				{/if}
			</div>
			<div class="wrapper">
				<div class="controls">
					<span class="backward">
						<Button
							type="button"
							aria-label="skip 10 second backward"
							icon="skip-backward"
							onclick={() => (playState.currentTime = playState.currentTime - 10)}
						/>
					</span>
					<span class="play">
						<Button
							variant="picton"
							type="button"
							aria-label="Play podcast"
							aria-pressed={!playState.paused}
							loading={playState.loading}
							icon={playState.paused ? "play" : "pause"}
							onclick={() => (playState.paused = !playState.paused)}
						/>
					</span>
					<span class="forward">
						<Button
							type="button"
							aria-label="skip 10 second forward"
							icon="skip-forward"
							onclick={() => (playState.currentTime = playState.currentTime + 10)}
						/>
					</span>
				</div>
				<div class="duration text-sm">
					{#if loadStart && playState.loading}
						--/--
					{:else if !Number.isFinite(playState.duration)}
						<span class="live-sign">
							<LiveSign />
							<span>Live</span>
						</span>
					{:else}
						<span>{formatTime(currentTime)}</span>
						<span>/</span>
						<span>{formatTime(playState.duration)}</span>
					{/if}
				</div>
				<div class="info">
					<div class="thumbnail">
						<Image src={podcast.image} alt={podcast.title} full />
					</div>
					<div class="title text-sm">
						<div class="running" title={podcast.title}>
							<RunningText --pl-running-text-margin="0.1rem" --pl-running-text-align="left">
								{podcast.title}
							</RunningText>
						</div>
						<a href={`/podcast/${playState.feed.id}`} class="feed">
							<span>
								{playState.feed.title}
							</span>
						</a>
					</div>
				</div>
				<div class="full">
					<Button
						type="button"
						variant="picton"
						aria-label="open full player"
						aria-expanded={openPlayerModal}
						icon="chevron-up"
						onclick={() => (openPlayerModal = true)}
					/>
				</div>
			</div>
			<dialog bind:this={playerModal} class="player-modal">
				{#if playerModalState}
					<div class="player-modal-wrapper">
						<div class="player-modal-img">
							<Image src={podcast.image} alt={podcast.title} full />
						</div>

						<div class="player-modal-detail">
							<div class="text-lg">
								<RunningText>
									{podcast.title}
								</RunningText>
							</div>
							<div class="player-modal-feed-title">
								{playState.feed.title}
							</div>
						</div>
						<div class="player-modal-controls">
							<div class="player-modal-seeker text-sm">
								<Slider
									id="seeker-full"
									bind:value={playState.currentTime}
									min={0}
									max={!playState.loading ? duration : 10}
								/>
								{#if Number.isFinite(duration)}
									<div>{formatTime(currentTime)}</div>
									<div>
										{formatTime(duration)}
									</div>
								{/if}
							</div>
							<div class="player-modal-control">
								<Button
									type="button"
									size="lg"
									aria-label="skip 10 second backward"
									icon="skip-backward"
									onclick={() => (playState.currentTime = playState.currentTime - 10)}
								/>
								<Button
									type="button"
									size="lg"
									variant="picton"
									aria-label="Play podcast"
									aria-pressed={!playState.paused}
									loading={playState.loading}
									icon={playState.paused ? "play" : "pause"}
									onclick={() => (playState.paused = !playState.paused)}
								/>
								<Button
									type="button"
									size="lg"
									aria-label="skip 10 second forward"
									icon="skip-forward"
									onclick={() => (playState.currentTime = playState.currentTime + 10)}
								/>
							</div>
							<div class="player-modal-volume">
								<span>
									<Icon name="volume" aria-hidden="true" />
								</span>
								<Slider id="volume" bind:value={volume} step={0.1} min={0} max={1} />
								<span>
									<Icon name="volume-full" aria-hidden="true" />
								</span>
							</div>
						</div>
						<Button
							type="button"
							size="full"
							aria-label="close full player"
							icon="close"
							onclick={() => (openPlayerModal = false)}
						/>
					</div>
				{/if}
			</dialog>
		{/key}
	</div>
{/if}

<style>
	dialog {
		width: 100dvw;
		height: 100dvh;
		max-width: 100dvw;
		max-height: 100dvh;
		background-color: hsl(var(--pl-accent-5));
		padding: 2rem;
	}

	.player-modal {
		container: player-modal / inline-size;
	}

	.player-modal-wrapper {
		height: 100%;
		width: min(20rem, 90cqw);
		display: flex;
		flex-direction: column;
		margin: auto;
		gap: 2rem;
		align-items: center;
		justify-content: space-between;
	}

	.player-modal-img {
		display: block;
		position: relative;
		aspect-ratio: 1 / 1;
		width: 100%;
		height: auto;
		border: 4px solid hsl(var(--pl-accent-95));
		overflow: hidden;
		border-radius: var(--pl-border-radius-md);
	}

	.player-modal-detail {
		width: 100%;

		.player-modal-feed-title {
			text-align: center;
			text-transform: uppercase;
			font-weight: 600;
		}
	}

	.player-modal-controls {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.player-modal-control {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
	}

	.player-modal-seeker {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;

		& > :global(input[type="range"]) {
			width: 100%;
			flex-shrink: 0;
		}
	}

	.player-modal-volume {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		width: 100%;

		& span {
			width: 0.5rem;
		}
	}

	.player {
		--pl-player-thumbnail-size: 2.8rem;
		--pl-player-gap: 2rem;
		display: block;
		position: sticky;
		bottom: 0;
		z-index: 10;
		background-color: hsl(var(--pl-accent-5));
		width: 100%;
		container: player / inline-size;

		@media (max-width: 768px) {
			--pl-player-thumbnail-size: 2.4rem;
			--pl-player-gap: 1rem;
		}
	}

	.wrapper {
		display: grid;
		height: var(--pl-player-height);
		max-width: 90vw;
		margin-inline: auto;
		grid-template-columns: auto auto minmax(0, 1fr) auto;
		grid-template-areas: "controls duration detail misc";
		align-items: center;
		justify-items: start;
		padding-block: 0.5rem;
		gap: var(--pl-player-gap);
	}

	.info {
		grid-area: detail;
		display: flex;
		flex-direction: row;
		gap: calc(var(--pl-player-gap) / 2);
		width: 100%;
	}

	.thumbnail {
		display: block;
		position: relative;
		aspect-ratio: 1 / 1;
		width: var(--pl-player-thumbnail-size);
		height: var(--pl-player-thumbnail-size);
		overflow: hidden;
		border-radius: var(--pl-border-radius-sm);
		border: 2px solid hsl(var(--pl-accent-95));
		flex-shrink: 0;
	}

	.title {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
		justify-content: center;
		overflow: hidden;
	}

	.feed {
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		&:hover span {
			box-shadow: var(--pl-shadow-highlight);
		}
	}

	.duration {
		grid-area: duration;
		width: 7rem;
		text-align: center;
	}

	.controls {
		grid-area: controls;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.full {
		grid-area: misc;
	}

	.live-sign {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	@container player (width <= 640px) {
		.backward,
		.forward {
			display: none;
		}
	}

	@container player (width <= 768px) {
		.player {
			--pl-player-thumbnail-size: 2rem;
			--pl-player-gap: 1rem;
		}
		.wrapper {
			grid-template-areas: "detail controls misc";
			grid-template-columns: minmax(0, 1fr) auto auto;
		}
		.duration {
			display: none;
		}
	}
</style>
