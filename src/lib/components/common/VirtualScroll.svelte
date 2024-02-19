<script lang="ts">
	import { createEventDispatcher, tick, onMount } from 'svelte';

	type T = $$Generic;
	export let data: Array<T>;

	const dispatch = createEventDispatcher();

	let viewport: HTMLElement;
	let content: HTMLElement;

	let a = 0;
	let b = data.length;
	let offset = 0;
	let top = 0;
	let bottom = 0;
	let heights: number[] = [];

	$: average = heights.reduce((a, b) => a + b, 0) / heights.length;

	const measure = (node: HTMLElement, id: number) => {
		const height = node.clientHeight;
		const currentHeight = heights[id];

		if (currentHeight !== height) {
			if (currentHeight !== undefined) {
				if (node.getBoundingClientRect().top < viewport.getBoundingClientRect().top) {
					viewport.scrollTop += height - currentHeight;
				}
			}

			heights[id] = height;
		}
	};

	const handleScroll = () => {
		let i = 0;
		let acc = 0;

		for (; i < data.length; i += 1) {
			const height = heights[i] ?? average;

			if (acc + height > viewport.scrollTop - offset) {
				a = i;
				top = acc;
				break;
			}
			acc += height;
		}
	};
</script>

<div bind:this={viewport} class="size-fit overflow-y-auto">
	<div bind:this={content} style:padding-top="{top}px" style:padding-bottom="{bottom}px">
		<slot />
	</div>
</div>
