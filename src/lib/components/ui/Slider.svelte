<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface SliderProps extends HTMLAttributes<HTMLDivElement> {
		min?: number;
		max?: number;
		now: number;
		orientation?: 'horizontal' | 'vertical';
		tooltip?: Snippet;
		disabled?: boolean;
	}

	let {
		min = 0,
		max = 0,
		now = $bindable(0),
		orientation = 'horizontal',
		class: className,
		tooltip,
		disabled,
		...attrs
	}: SliderProps = $props();

	let wrapper: HTMLDivElement | undefined = $state();

	let position = $derived.by(() => {
		if (!wrapper) return now;

		let { width, height } = wrapper.getBoundingClientRect();
		if (orientation === 'horizontal') {
			return (width / max) * now;
		}
		if (orientation === 'vertical') {
			return height % (now / max);
		}
	});

	const seek = (e: PointerEvent) => {
		if (!wrapper) return;
		e.preventDefault();
		e.stopPropagation();

		let { left, right, bottom, top } = wrapper.getBoundingClientRect();

		let percent =
			orientation === 'horizontal'
				? (e.clientX - left) / (right - left)
				: (e.clientY - bottom) / (top - bottom);

		now = Math.round(percent * (max - min) - min);
		if (now < min) now = min;
		if (now > max) now = max;
	};
	const sliderMove = (e: PointerEvent) => {
		seek(e);

		window.addEventListener('pointermove', seek);

		window.addEventListener(
			'pointerup',
			() => {
				window.removeEventListener('pointermove', seek);
			},
			{ once: true }
		);
	};
</script>

{#if !disabled}
	{#if tooltip}
		<div role="tooltip">
			{@render tooltip()}
		</div>
	{/if}

	<div class={className} class:root={true} bind:this={wrapper} {...attrs}>
		<div class="progress">
			<span
				class="fill"
				style:transform={`translateX(${position}px)`}
				style:left={`-${wrapper ? wrapper.getBoundingClientRect().width : 0}px`}
			></span>
		</div>
		<div
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={now}
			aria-orientation={orientation}
			tabindex="0"
			class="slider"
			style:transform={`translateX(${position}px)`}
			onpointerdown={sliderMove}
		></div>
	</div>
{/if}

<style>
	.root {
		display: flex;
		position: relative;
		height: var(--space-3);
		width: 100%;
		touch-action: pan-y;
		align-items: center;

		& > .slider {
			display: block;
			position: absolute;
			left: 0px;
			height: var(--space-3);
			width: var(--space-3);
			border-radius: 99999px;
			border: 2px solid currentColor;
			background-color: var(--white);
		}

		& > .progress {
			display: block;
			height: 3px;
			position: relative;
			width: 100%;
			overflow: hidden;
			background-color: var(--accent-40);

			& > .fill {
				display: block;
				position: absolute;
				top: 0px;
				height: 3px;
				width: 100%;
				background-color: var(--picton);
			}
		}
	}
</style>
