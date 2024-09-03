<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
		min: number;
		max: number;
		now: number;
		label?: string;
	}

	let { min, max, now, label, class: className, ...attrs }: ProgressProps = $props();
</script>

<div
	role="progressbar"
	aria-label={label}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={now}
	class:root={true}
	class={className}
	{...attrs}
>
	<span
		style:clip-path={`polygon(0 0, ${(100 * now) / max}% 0, ${(100 * now) / max}% 100%, 0 100%)`}
	></span>
</div>

<style>
	.root {
		display: block;
		position: relative;
		height: 3px;
		width: 100%;
		overflow: hidden;
		background-color: var(--accent-40);

		span {
			position: absolute;
			left: 0px;
			top: 0px;
			height: 100%;
			width: 100%;
			background-color: var(--picton);
		}
	}
</style>
