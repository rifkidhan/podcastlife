<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	interface RunningProps extends HTMLAttributes<HTMLElement> {
		as?: string;
		children: Snippet;
	}

	let { as = "span", children, class: className, ...attrs }: RunningProps = $props();

	let runningText: HTMLElement | undefined = $state();
	let move = $state(false);
	let sumWidth = $state(0);

	const handleResize = () => {
		if (runningText && runningText.parentElement) {
			move = runningText.scrollWidth > runningText.parentElement.clientWidth;
			sumWidth = runningText.scrollWidth - runningText.parentElement.clientWidth;
		}
	};

	$effect.pre(handleResize);
</script>

<svelte:window onresize={handleResize} />

<svelte:element
	this={as}
	class={className}
	class:root={true}
	style:--pl-running-text-length={`-${Math.round(sumWidth + 20)}px`}
	style:--pl-running-text-duration={`${Math.floor((sumWidth * 3) / 100 + 3)}s`}
	{...attrs}
>
	<span bind:this={runningText} class:running-animation={move}>
		{@render children()}
	</span>
</svelte:element>

<style>
	@keyframes slide {
		from {
			transform: translateX(1px);
		}
		to {
			transform: translateX(calc(var(--pl-running-text-length)));
		}
	}
	.root {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow: hidden;
		user-select: none;
		width: 100%;

		&:hover {
			--pl-running-text-state: paused;
		}

		& > span {
			margin-block-end: var(--pl-running-text-margin, 0.5rem);
			display: block;
			white-space: nowrap;
			width: 100%;
			text-align: var(--pl-running-text-align, center);
		}
	}

	.running-animation {
		animation: slide var(--pl-running-text-duration) ease-in-out infinite alternate;
		animation-play-state: var(--pl-running-text-state, running);
	}
</style>
