<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { createAnimate } from '$lib/utils/motion';
	export let component = 'span';

	let runningText: HTMLElement;
	let letsMove = false;
	let sumWidth = 0;

	const { animate } = createAnimate({});

	const handleResize = () => {
		if (runningText && runningText.parentElement) {
			letsMove = runningText.scrollWidth > runningText.parentElement.clientWidth;
			sumWidth = runningText.scrollWidth - runningText.parentElement.clientWidth;
		}
	};

	afterUpdate(() => {
		handleResize();
	});
</script>

<svelte:window on:resize={handleResize} />

<svelte:element
	this={component}
	bind:this={runningText}
	{...$$restProps}
	class="relative flex max-w-fit shrink-0 flex-row flex-nowrap whitespace-nowrap"
	use:animate={{
		keyframe: {
			x: [0, -(sumWidth + 15)]
		},
		options: {
			duration: Math.floor((sumWidth * 3) / 100 + 3),
			repeat: Infinity,
			easing: 'ease-in-out',
			direction: 'alternate'
		},
		play: letsMove
	}}
>
	<slot />
</svelte:element>
