<script lang="ts">
	import type { ClassValue } from "svelte/elements";

	interface SliderProps {
		min?: number;
		max?: number;
		orientation?: "horizontal" | "vertical";
		step?: number;
		value: number;
		class?: ClassValue;
	}

	let {
		min = 0,
		max = 100,
		orientation = "horizontal",
		step = 1,
		value = $bindable(0),
		class: className
	}: SliderProps = $props();
</script>

<div class="slider">
	<button role="slider" aria-label="slider" aria-valuemax={max} aria-valuenow={value}></button>
</div>
