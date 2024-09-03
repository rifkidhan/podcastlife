<script lang="ts">
	import type { BasicFeed } from '$lib/types';
	import { Image } from '$lib/components';

	interface CarouselProps {
		items: BasicFeed[];
		label: string;
	}

	let { items, label }: CarouselProps = $props();
</script>

<div class="carousel">
	<ul role="group" aria-label={label} aria-live="polite" data-sveltekit-preload-data="tap">
		{#each items as item (item.id)}
			<li class="carousel-item">
				<a href="/podcast/{item.id}" class="wrapper">
					<div class="thumbnail" style:--tag="img-{item.id}">
						<Image src={item.image ?? ''} alt={item.title} full />
					</div>
					<div class="info">
						<div class="author" style:--tag="author-{item.id}">
							{item.author}
						</div>
						<h3 class="title" style:--tag="feed-{item.id}">
							<span>
								{item.title}
							</span>
						</h3>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.carousel {
		display: flex;
		width: 100%;

		& > ul {
			position: relative;
			display: flex;
			scroll-snap-type: x mandatory;
			scroll-padding-inline: var(--space-6);
			gap: var(--space-6);
			overflow-x: auto;
			padding-inline: var(--space-3);
			padding-bottom: var(--space-5);
			padding-top: var(--space-1);

			.carousel-item {
				position: relative;
				flex-shrink: 0;
				scroll-snap-align: start;
				scroll-snap-stop: always;
				width: 60%;

				@media (min-width: 768px) {
					width: 35%;
				}
				@media (min-width: 1024px) {
					width: 25%;
				}

				.wrapper {
					display: flex;
					width: 100%;
					height: 100%;
					flex-direction: column;
					gap: var(--space-3);
					overflow: hidden;
					border-radius: var(--space-2);
					border: 2px solid currentColor;
					transition-property: box-shadow, transform, filter;
					transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
					transition-duration: 150ms;

					&:hover {
						transform: translate(-0.25rem, -0.25rem);
						box-shadow: var(--shadow-drop);

						& > .thumbnail > :global(img) {
							transform: scale(1.05, 1.05);
						}
						& > * > .title span {
							box-shadow: var(--shadow-highlight);
						}
					}

					& > .thumbnail {
						display: block;
						position: relative;
						overflow: hidden;
						aspect-ratio: 1;
					}
					& > .info {
						display: flex;
						flex-direction: column;
						padding-inline: var(--space-2);
						padding-block: var(--space-3);

						& > .author {
							font-size: var(--text-sm);
							text-transform: uppercase;
							line-height: 1.25rem;
							color: var(--picton);
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;

							@media (min-width: 768px) {
								font-size: var(--text-base);
								line-height: 1.5rem;
							}
						}

						& > .title {
							font-size: var(--text-lg);
							line-height: 1.75rem;
							font-weight: 700;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;

							@media (min-width: 768px) {
								font-size: var(--text-xl);
								overflow: hidden;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 4;
							}
							@media (min-width: 1024px) {
								font-size: var(--text-2xl);
								line-height: 2rem;
							}
						}
					}
				}
			}
		}
	}
</style>
