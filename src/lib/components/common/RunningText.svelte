<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { createAnimate } from '$lib/utils/motion';
	export let component = 'span';

	let runningText: HTMLElement;
	let letsMove = false;
	let sumWidth = 0;

	const { animate } = createAnimate({});

	afterUpdate(() => {
		if (runningText && runningText.parentElement) {
			letsMove = runningText.scrollWidth > runningText.parentElement.clientWidth;
			sumWidth = runningText.scrollWidth - runningText.parentElement.clientWidth;
		}
	});
</script>

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
			duration: sumWidth / 100 + 2,
			repeat: Infinity,
			easing: 'ease-in-out',
			direction: 'alternate'
		},
		play: letsMove
	}}
>
	<slot />
</svelte:element>

<style>
	.animatiton {
		animation-name: running;
		animation-duration: var(--duration);
		animation-fill-mode: both;
		animation-iteration-count: infinite;
	}
	@keyframes running {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(var(--transform));
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
