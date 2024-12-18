<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface SliderProps extends HTMLInputAttributes {
		min?: number;
		max?: number;
		step?: number;
		value: number;
	}

	let { min = 0, max = 100, step = 1, value = $bindable(), ...attrs }: SliderProps = $props();
</script>

<input
	type="range"
	bind:value
	{max}
	{min}
	{step}
	{...attrs}
	style:--pl-slider-value={`${(value * 100) / max}%`}
/>

<style>
	input[type="range" i] {
		--pl-slider-thumb-scale: 0;
		display: block;
		appearance: none;
		height: 0.25rem;
		width: 100%;
		cursor: pointer;
		border: none;
		background: linear-gradient(
			to right,
			hsl(var(--pl-picton)) var(--pl-slider-value),
			hsl(var(--pl-accent-40)) var(--pl-slider-value)
		);

		&:hover {
			--pl-slider-thumb-scale: 1;
		}

		&::-webkit-slider-thumb,
		&::-moz-range-thumb {
			appearance: none;
			width: 0.75rem;
			height: 0.75rem;
			background-color: hsl(var(--pl-picton));
			border: 2px solid hsl(var(--pl-accent-95));
			border-radius: 9999px;
			transition-property: transform;
			transition-duration: 50ms;
			transition-timing-function: ease-in-out;
			transform: scale(var(--pl-slider-thumb-scale));
		}
	}
</style>
