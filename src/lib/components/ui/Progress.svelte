<script lang="ts">
	import type { HTMLProgressAttributes } from "svelte/elements";

	interface ProgressProps extends HTMLProgressAttributes {
		max: number;
		value: number;
	}

	let { max, value, ...attrs }: ProgressProps = $props();
</script>

<progress {max} {value} {...attrs}></progress>

<style>
	progress {
		display: block;
		appearance: none;
		height: 0.25rem;
		width: 100%;

		&[value]::-webkit-progress-bar {
			background-color: hsl(var(--pl-accent-40));
		}

		&[value]::-webkit-progress-value,
		&[value]::-moz-progress-bar {
			background-color: hsl(var(--pl-picton));
		}
	}
</style>
