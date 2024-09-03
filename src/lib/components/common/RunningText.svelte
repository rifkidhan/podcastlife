<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface RunningProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	let { children, class: className, ...attrs }: RunningProps = $props();

	let runningText: HTMLDivElement | undefined = $state();
	let move = $state(false);
	let sumWidth = $state(0);

	const handleResize = () => {
		if (runningText && runningText.parentElement) {
			move = runningText.scrollWidth > runningText.parentElement.clientWidth;
			sumWidth = runningText.scrollWidth - runningText.parentElement.clientWidth;
		}
	};

	$effect.pre(() => {
		handleResize();
	});
</script>

<svelte:window onresize={handleResize} />

<div
	bind:this={runningText}
	class={className}
	class:running-animation={move}
	class:root={true}
	style:--running-keyframe={`-${sumWidth + 15}px`}
	style:--running-duration={`${Math.floor((sumWidth * 3) / 100 + 3)}s`}
	{...attrs}
>
	{@render children()}
</div>

<style>
	@keyframes slide {
		from {
			transform: translateX(1px);
		}
		to {
			transform: translateX(var(--running-keyframe));
		}
	}
	.root {
		display: flex;
		position: relative;
		max-width: fit-content;
		flex-shrink: 0;
		flex-direction: row;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.running-animation {
		animation: slide var(--running-duration) ease-in-out infinite alternate;
	}
</style>
