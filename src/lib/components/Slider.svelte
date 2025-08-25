<script lang="ts">
	import type { ClassValue } from "svelte/elements";
	interface SliderProps {
		min?: number;
		max?: number;
		step?: number;
		value: number;
		class?: ClassValue;
		useSlider?: boolean;
	}

	let {
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(),
		useSlider,
		class: className
	}: SliderProps = $props();
</script>

{#if useSlider}
	<input
		type="range"
		bind:value
		{max}
		{min}
		{step}
		class={className}
		style:--pl-slider-value={`${(value * 100) / max}%`}
	/>
{:else}
	<progress {max} {value} aria-live="polite" class={className}></progress>
{/if}

<style>
	input[type="range" i] {
		--pl-slider-thumb-scale: 0;
		display: block;
		appearance: none;
		block-size: var(--pl-spacing);
		inline-size: 100%;
		cursor: pointer;
		border: none;
		background: linear-gradient(
			to right,
			var(--pl-primary) var(--pl-slider-value),
			var(--pl-accent-2) var(--pl-slider-value)
		);

		&:hover {
			--pl-slider-thumb-scale: 1;
		}

		&::-webkit-slider-thumb,
		&::-moz-range-thumb {
			appearance: none;
			inline-size: calc(var(--pl-spacing) * 3);
			block-size: calc(var(--pl-spacing) * 3);
			background-color: var(--pl-primary);
			border: solid 1px;
			border-radius: 9999px;
			transition-property: transform;
			transition-duration: 50ms;
			transition-timing-function: ease-in-out;
			transform: scale(var(--pl-slider-thumb-scale));
		}
	}
	progress {
		display: block;
		appearance: none;
		block-size: var(--pl-spacing);
		inline-size: 100%;

		&[value]::-webkit-progress-bar {
			background-color: var(--pl-accent-2);
		}

		&[value]::-webkit-progress-value,
		&[value]::-moz-progress-bar {
			background-color: var(--pl-primary);
		}
	}
</style>
