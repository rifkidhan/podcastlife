<script lang="ts">
	import { fly } from "svelte/transition";
	import { MediaQuery } from "svelte/reactivity";
	import { page } from "$app/state";
	import SvelteVirtualList from "@humanspeak/svelte-virtual-list";
	import { audiometadata } from "$lib/state/player.svelte";
	import { formatTime } from "$lib/utils/time";
	import Button from "../Button.svelte";
	import Icon from "../Icon.svelte";
	import Image from "../Image.svelte";
	import Slider from "../Slider.svelte";
	import RunningText from "../RunningText.svelte";
	import Tabs from "./tabs/Tab.svelte";
	import Tabpanel from "./tabs/Tabpanel.svelte";

	const largeScreen = new MediaQuery("min-width: 768px");

	const TABLISTS = [
		{
			id: "player",
			title: "Player"
		},
		{
			id: "queue",
			title: "Queue"
		},
		{
			id: "chapters",
			title: "Chapters"
		}
	];

	let lists = $derived(largeScreen.current ? TABLISTS.slice(1, 3) : TABLISTS);
	let chapters = $derived(
		audiometadata.chapters.filter((v) => typeof v.toc === "undefined" || v.toc)
	);
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === "Escape") {
			history.back();
		}
	}}
/>

{#snippet player()}
	<div class="player">
		<div class="thumbnail">
			<Image src={audiometadata.track.image} alt={audiometadata.track.title} full />
		</div>
		<div class="details">
			<div class="text-lg">
				<RunningText textAlign="center">
					{audiometadata.track.title}
				</RunningText>
			</div>
			<div class="feed">
				{#if audiometadata.track.explicit}
					<Icon
						name="explicit"
						aria-label="explicit content"
						class="explicit"
						stroke="none"
						size={18}
					/>
				{/if}
				<span class="truncate">
					{audiometadata.track.feed}
				</span>
			</div>
		</div>
		<div class="controls">
			<div class="seeker text-sm">
				<Slider
					useSlider
					bind:value={audiometadata.currentTime}
					min={0}
					max={Number.isFinite(audiometadata.duration) && audiometadata.readyState > 0
						? audiometadata.duration
						: 1}
				/>
				{#if Number.isFinite(audiometadata.duration)}
					<div>{formatTime(audiometadata.currentTime)}</div>
					<div>{formatTime(audiometadata.duration)}</div>
				{/if}
			</div>
			<div class="control">
				<Button
					variant="theme"
					size="square"
					title="Backward 15 seconds"
					onclick={() => (audiometadata.currentTime = audiometadata.currentTime -= 15)}
				>
					<Icon name="skip-backward" isHidden />
					<span class="sr-only">skip 15 second backward</span>
				</Button>
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
				<Button
					variant="theme"
					size="square"
					title="Forward 15 seconds"
					onclick={() => (audiometadata.currentTime = audiometadata.currentTime += 15)}
				>
					<Icon name="skip-forward" isHidden />
					<span class="sr-only">skip 15 second forward</span>
				</Button>
			</div>
			<div class="volume">
				<div>
					<Icon name="volume" isHidden />
				</div>
				<Slider useSlider bind:value={audiometadata.volume} step={0.1} min={0} max={1} />
				<div>
					<Icon name="volume-full" isHidden />
				</div>
			</div>
		</div>
	</div>
{/snippet}

<div
	class="full-player"
	role="dialog"
	aria-label="Full player"
	aria-hidden={!page.state.fullPlayer}
	transition:fly|global={{ opacity: 1, y: 400 }}
>
	<div class="wrapper">
		<div class="close">
			<Button size="square" title="Close" onclick={() => history.back()}>
				<Icon name="close" isHidden />
				<span class="sr-only">Close modal</span>
			</Button>
		</div>
		{#key audiometadata.track.enclosure}
			<div class="content">
				{#if largeScreen.current}
					{@render player()}
				{/if}
				<Tabs list={lists} class="tabs">
					{#if !largeScreen.current}
						<Tabpanel id={TABLISTS[0].id}>
							{@render player()}
						</Tabpanel>
					{/if}
					<Tabpanel id={TABLISTS[1].id}>queue</Tabpanel>
					<Tabpanel id={TABLISTS[2].id}>
						{#if audiometadata.chapters.length > 0}
							<SvelteVirtualList items={chapters}>
								{#snippet renderItem(item)}
									<button
										type="button"
										class="virtual-item text-sm"
										aria-current={item.startTime === audiometadata.currentTime}
										onclick={() => (audiometadata.currentTime = item.startTime)}
									>
										{#if item.img}
											<div class="img">
												<Image src={item.img} alt={item.title} full />
											</div>
										{/if}
										<div class="data">
											<div class="title">
												{item.title}
											</div>
											<div class="time">
												{formatTime(item.startTime)}
											</div>
										</div>
									</button>
								{/snippet}
							</SvelteVirtualList>
						{:else}
							No chapters provide.
						{/if}
					</Tabpanel>
				</Tabs>
			</div>
		{/key}
	</div>
</div>

<style>
	.full-player {
		display: block;
		position: fixed;
		inset: 0;
		inline-size: 100dvw;
		block-size: 100dvh;
		container: full-player / inline-size;
		background-color: var(--pl-accent-1);
		z-index: var(--pl-full-player-index);
	}

	.wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		gap: calc(var(--pl-spacing) * 4);
		padding: calc(var(--pl-spacing) * 4);
	}

	.close {
		display: flex;
	}

	.content {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: calc(var(--pl-spacing) * 4);

		@container full-player (min-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.player {
		display: flex;
		flex-direction: column;
		margin: auto;
		block-size: 100%;
		inline-size: min(calc(15rem + 5cqi), 90cqw);
		gap: calc(var(--pl-spacing) * 8);
		align-items: center;
		justify-content: space-evenly;
	}
	.thumbnail {
		display: block;
		position: relative;
		aspect-ratio: 1/1;
		inline-size: 100%;
		block-size: auto;
		border: solid 1px;
		border-radius: var(--pl-radius-md);
	}
	.details {
		inline-size: 100%;

		& > .feed {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.controls {
		display: flex;
		flex-direction: column;
		gap: calc(var(--pl-spacing) * 3);
		inline-size: 100%;
	}
	.control {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		inline-size: 100%;
	}
	.seeker {
		display: flex;
		flex-wrap: wrap;
		inline-size: 100%;
		justify-content: space-between;

		& > :global(.slider) {
			inline-size: 100%;
			flex-shrink: 0;
		}
	}
	.volume {
		display: flex;
		flex-direction: row;
		gap: calc(var(--pl-spacing) * 2);
		align-items: center;
		inline-size: 100%;
	}

	:global(.tabs) {
		display: flex;
		flex-direction: column-reverse;

		@container full-player (min-width: 768px) {
			flex-direction: column;
		}
	}

	.virtual-item {
		display: flex;
		position: relative;
		flex-direction: row;
		block-size: 5em;
		inline-size: 100%;
		gap: calc(var(--pl-spacing) * 2);
		padding: calc(var(--pl-spacing) * 2);
		align-items: center;

		&:hover {
			background-color: var(--pl-accent-2);
		}

		& > .img {
			flex-shrink: 0;
			aspect-ratio: 1/1;
			inline-size: auto;
			block-size: 100%;
			overflow: hidden;
			position: relative;
			border: solid 1px;
			border-radius: var(--pl-radius);
		}

		& > .data {
			display: flex;
			flex-direction: column;
			inline-size: 100%;
			align-items: flex-start;
		}
	}
</style>
