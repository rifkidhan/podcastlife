<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";
	import Button from "./Button.svelte";
	import Icon from "./Icon.svelte";

	interface CarouselProps {
		children?: Snippet;
		class?: ClassValue;
	}

	let { children, class: className }: CarouselProps = $props();

	let viewport: HTMLElement | undefined = $state();
	let api: EmblaCarouselType | undefined = $state();
	let prevButtonDisable = $state(true);
	let nextButtonDisable = $state(false);
	let progress = $state(0);

	let embla_options: EmblaOptionsType = {
		align: "center",
		loop: false,
		slidesToScroll: "auto"
	};

	$effect(() => {
		if (!viewport) return;
		api = EmblaCarousel(viewport, embla_options);

		return () => {
			api?.destroy();
		};
	});

	$effect(() => {
		if (!api) return;

		const buttonState = (e: EmblaCarouselType) => {
			prevButtonDisable = !e.canScrollPrev();
			nextButtonDisable = !e.canScrollNext();
		};

		api.on("init", buttonState).on("reInit", buttonState).on("select", buttonState);
	});

	$effect(() => {
		if (!api) return;

		const progressState = (e: EmblaCarouselType) => {
			progress = Math.max(0, Math.min(1, e.scrollProgress()));
		};

		api
			.on("init", progressState)
			.on("reInit", progressState)
			.on("scroll", progressState)
			.on("slideFocus", progressState);
	});

	const prevOnclick = () => {
		if (api) api.scrollPrev();
	};

	const nextOnclick = () => {
		if (api) api.scrollNext();
	};
</script>

<div class={["carousel", className]}>
	<div class="viewport" bind:this={viewport}>
		<ul class="container" aria-live="polite">
			{@render children?.()}
		</ul>
	</div>
	<div class="controls">
		<progress value={progress} max={1} class="progress-bar"></progress>
		<div class="buttons">
			<Button
				id="prev"
				type="button"
				size="square"
				title="Previous slide"
				onclick={prevOnclick}
				disabled={prevButtonDisable}
			>
				<Icon name="chevron-left" isHidden />
				<span class="sr-only">previous slide</span>
			</Button>
			<Button
				id="next"
				type="button"
				size="square"
				title="Next slide"
				onclick={nextOnclick}
				disabled={nextButtonDisable}
			>
				<Icon name="chevron-right" isHidden />
				<span class="sr-only">next slide</span>
			</Button>
		</div>
	</div>
</div>

<style>
	.carousel {
		container: carousel / inline-size;
		display: flex;
		flex-direction: column;
	}

	.viewport {
		--carousel-column-gap: calc(0.125rem + 2cqi);
		--carousel-column-width: 35cqw;
		overflow: hidden;

		@container carousel (width >= 462px) {
			--carousel-column-width: 25cqw;
		}

		@container carousel (width >= 876px) {
			--carousel-column-width: 20cqw;
		}
	}

	.container {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: calc(var(--carousel-column-width) - var(--carousel-column-gap));
		column-gap: var(--carousel-column-gap);
		touch-action: pan-y pinch-zoom;
		padding-block-start: calc(0.125rem + 1.2cqi);
		padding-block-end: calc(0.125rem + 3cqi);
	}

	.controls {
		display: flex;
		gap: calc(var(--pl-spacing) * 4);
		justify-content: space-between;

		& > .buttons {
			display: flex;
			flex-shrink: 0;
			gap: calc(var(--pl-spacing) * 4);
		}

		& > .progress-bar {
			height: 0.5rem;
			inline-size: 35%;
			align-self: center;
			overflow: hidden;
			border-radius: var(--pf-radius);
			border: solid 1px;
			display: block;
			appearance: none;

			&[value]::-webkit-progress-bar {
				background-color: var(--pl-accent-1);
			}

			&[value]::-webkit-progress-value,
			&[value]::-moz-progress-bar {
				background-color: var(--pl-primary);
			}
		}
	}
</style>
