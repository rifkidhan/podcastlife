<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	interface RunningTextProps extends HTMLAttributes<HTMLSpanElement> {
		textAlign?: "center" | "left";
	}

	let { textAlign = "left", class: className, children, ...attrs }: RunningTextProps = $props();

	let runningTextElement: HTMLSpanElement | undefined = $state();
	let move = $state(false);
	let calcWidth = $state(0);
	let parentWidth = $state(0);

	const resizeHandler = () => {
		if (!runningTextElement) return;
		move = runningTextElement.scrollWidth > parentWidth;
		calcWidth = runningTextElement.scrollWidth - parentWidth;
	};

	$effect.pre(resizeHandler);
</script>

<span
	class={["running-text", className]}
	{...attrs}
	bind:clientWidth={parentWidth}
	style:--pl-running-text-length={`-${Math.round(calcWidth + 20)}px`}
	style:--pl-running-text-duration={`${Math.floor((calcWidth * 3) / 100 + 3)}s`}
	style:--pl-running-text-align={textAlign}
>
	<span bind:this={runningTextElement} class={["inner", { "running-animation": move }]}>
		{@render children?.()}
	</span>
</span>

<style>
	@keyframes slide {
		from {
			transform: translateX(1px);
		}
		to {
			transform: translateX(var(--pl-running-text-length));
		}
	}

	.running-text {
		display: flex;
		flex-direction: row;
		overflow: hidden;
		flex-wrap: nowrap;
		inline-size: 100%;
		padding-block: var(--pl-spacing);

		&:hover {
			--pl-running-text-state: paused;
		}
	}

	.inner {
		display: block;
		white-space: nowrap;
		inline-size: 100%;
		text-align: var(--pl-running-text-align, left);
	}

	.running-animation {
		animation: slide var(--pl-running-text-duration) ease-in-out infinite alternate;
		animation-play-state: var(--pl-running-text-state, running);
	}
</style>
