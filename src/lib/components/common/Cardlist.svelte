<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { AlternativeEnclosure } from '$lib/types';
	import { Button, Icons, Image } from '$lib/components';
	import { playerState } from '$lib/stores/player.svelte';
	import { getTime } from '$lib/utils/time';

	interface CardlistProps extends HTMLAttributes<HTMLDivElement> {
		type?: 'podcast' | 'live';
		status?: 'live' | 'pending' | 'ended';
		podcast: string;
		title?: string;
		image: string;
		explicit?: boolean | undefined;
		pubDate?: string;
		start?: string;
		end?: string;
		podcastId: string;
		linked?: boolean;
		guid: string;
		enclosure: string;
		altEnclosure?: AlternativeEnclosure[];
	}

	let {
		type = 'podcast',
		status = 'ended',
		podcast,
		title,
		image,
		explicit = false,
		pubDate,
		start,
		end,
		podcastId,
		guid,
		enclosure,
		linked = false,
		class: className,
		altEnclosure,
		...attrs
	}: CardlistProps = $props();
</script>

<div class={className} class:cardlist={true} {...attrs}>
	<div
		class="thumbnail"
		class:border={type === 'live' && status === 'live'}
		style:--tag={`episode-${guid}-thumbnail`}
	>
		<Image src={image} alt={title ?? podcast} full />
	</div>
	<div class="wrapper">
		<div class="content">
			<div class="title">
				{#if linked}
					<a
						href={`/podcast/${podcastId}`}
						class="line-clamp-1 max-w-fit text-picton hover:underline md:line-clamp-2"
					>
						{podcast}
					</a>
				{/if}
				{#if type === 'live'}
					<h3 class="linked" class:explicit>
						<span>{title}</span>
					</h3>
				{:else}
					<a
						href="/podcast/{podcastId}/{encodeURIComponent(guid)}"
						{title}
						data-sveltekit-preload-data="tap"
					>
						<h3 class="linked" class:explicit style:--tag={`episode-${guid}-title`}>
							<span>{title}</span>
						</h3>
					</a>
				{/if}
			</div>
			<div class="text-sm">
				{#if pubDate}
					{getTime(pubDate)}
				{/if}
				{#if type === 'live'}
					{#if status === 'live' && end}
						Ended at {getTime(end)}
					{/if}
					{#if status === 'pending' && start}
						Start at {getTime(start)}
					{/if}
					{#if status === 'ended' && end}
						Ended at {getTime(end)}
					{/if}
				{/if}
			</div>
		</div>
		<Button
			type="button"
			variant="picton"
			title={playerState.podcast.enclosure === enclosure && !playerState.paused ? 'Pause' : 'Play'}
			loading={playerState.podcast.enclosure === enclosure && playerState.loading}
			onclick={() => {
				playerState.feed = {
					id: podcastId,
					title: podcast
				};
				playerState.podcast = {
					title: title ?? podcast,
					image,
					enclosure: enclosure,
					explicit: explicit ?? false,
					guid,
					altEnclosure
				};
				if (playerState.podcast.enclosure === enclosure) {
					playerState.paused = !playerState.paused;
				}
			}}
		>
			{#if playerState.podcast.enclosure === enclosure && !playerState.paused}
				<Icons icon="pause" aria-hidden="true" />
			{:else}
				<Icons icon="play" aria-hidden="true" />
			{/if}
		</Button>
	</div>
</div>

<style>
	.cardlist {
		display: grid;
		position: relative;
		width: 100%;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		align-content: center;
		place-items: center;
		gap: var(--space-3);
		border-radius: var(--space-2);
		border: 2px solid currentColor;
		padding: var(--space-3) var(--space-4);
		transition-property: box-shadow, transform;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;

		&:hover {
			transform: translate(-0.25rem, -0.25rem);
			box-shadow: var(--shadow-drop);

			& :is(.linked span) {
				box-shadow: var(--shadow-highlight);
			}
		}

		@media (min-width: 1024px) {
			gap: var(--space-5);
		}

		& > .thumbnail {
			display: block;
			position: relative;
			width: 100%;
			overflow: hidden;
			aspect-ratio: 1;

			&:is(.border) {
				border: 4px solid var(--cinnabar);
			}
		}
		& > .wrapper {
			display: flex;
			align-items: center;
			grid-column: span 5 / span 5;
			width: 100%;
			height: 100%;
			gap: var(--space-1);

			& > .content {
				display: flex;
				position: relative;
				height: 100%;
				width: 95%;
				flex-direction: column;
				justify-content: space-between;
				gap: var(--space-1);

				@media (min-width: 1024px) {
					gap: var(--space-2);
				}

				& > .title {
					display: flex;
					flex-direction: column;
					width: 100%;

					& :is(.linked) {
						font-size: clamp(var(--text-sm), 0.2rem + 2vw, var(--text-2xl));
						line-height: 1.5;
						text-wrap: pretty;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;

						@media (min-width: 768px) {
							font-weight: 600;
							-webkit-line-clamp: 2;
						}
					}
				}
			}
		}
	}
</style>
