<script lang="ts">
	import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
	import type { BasicFeed } from "$lib/types";
	import { browser } from "$app/environment";
	import EmblaCarousel from "embla-carousel";
	import { Button } from "$lib/components";
	import Card from "./Card.svelte";

	let { items, label }: { items: BasicFeed[]; label: string } = $props();

	let carousel: HTMLDivElement | undefined = $state();
	let embla: EmblaCarouselType | undefined = $state();
	let prevButtonDisable = $state(true);
	let nextButtonDisable = $state(false);

	const emblaOptions: EmblaOptionsType = {
		align: "start",
		loop: false,
		slidesToScroll: "auto"
	};

	$effect(() => {
		if (carousel && browser) {
			const setEmbla = EmblaCarousel(carousel, emblaOptions);
			embla = setEmbla;
		}

		return () => {
			if (embla) {
				embla.destroy();
			}
		};
	});

	$effect(() => {
		if (!embla) return;

		embla.on("select", (e) => {
			prevButtonDisable = !e.canScrollPrev();
			nextButtonDisable = !e.canScrollNext();
		});
	});

	const prevOnclick = () => {
		if (embla) embla.scrollPrev();
	};
	const nextOnclick = () => {
		if (embla) embla.scrollNext();
	};
</script>

<div class="carousel">
	<div bind:this={carousel} class="viewport">
		<ul class="container" aria-label={label}>
			{#each items as item (item.id)}
				<Card
					id={item.id}
					title={item.title}
					image={item.image}
					author={item.author ?? "untitled"}
					loading={embla ? false : true}
					explicit={item.explicit}
					blurhash={item.blurhash}
				/>
			{/each}
		</ul>
	</div>

	<div>
		<Button
			type="button"
			variant="picton"
			icon="prev"
			onclick={prevOnclick}
			disabled={prevButtonDisable}
		/>

		<Button
			type="button"
			variant="picton"
			icon="next"
			onclick={nextOnclick}
			disabled={nextButtonDisable}
		/>
	</div>
</div>

<style>
	.carousel {
		--pl-carousel-column-width: 38%;
		--pl-carousel-gap: 0.25rem;
		--pl-carousel-container-gap: calc(var(--pl-carousel-gap) * 2);
		display: flex;
		flex-direction: column;
		gap: var(--pl-carousel-gap);

		@media (min-width: 768px) {
			--pl-carousel-column-width: 33%;
			--pl-carousel-gap: 0.5rem;
		}
		@media (min-width: 1024px) {
			--pl-carousel-column-width: 25%;
		}
		@media (min-width: 1280px) {
			--pl-carousel-column-width: 20%;
		}
	}
	.viewport {
		overflow: hidden;
	}

	.container {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: calc(var(--pl-carousel-column-width) - var(--pl-carousel-container-gap));
		column-gap: var(--pl-carousel-container-gap);
		touch-action: pan-y pinch-zoom;
		padding-block: var(--pl-carousel-container-gap);
		padding-inline: var(--pl-carousel-container-gap);
	}
</style>
