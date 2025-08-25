<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface ButtonProps extends HTMLButtonAttributes {
		variant?: "primary" | "secondary" | "theme" | "text";
		size?: "sm" | "md" | "lg" | "full" | "square";
		disabled?: boolean;
		type?: "button" | "reset" | "submit";
	}

	let {
		children,
		type = "button",
		variant = "primary",
		size = "md",
		disabled,
		class: className,
		...attrs
	}: ButtonProps = $props();
</script>

<button {type} class={[variant, size, className]} {disabled} {...attrs}>
	{@render children?.()}
</button>

<style>
	button {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--pl-radius);
		border: 1px solid var(--pl-accent-6);
		text-align: center;
		font-weight: 500;
		white-space: nowrap;
		gap: var(--pl-spacing);
		transition-property: transform, box-shadow;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;
		transform: translate(-2px, -2px);
		box-shadow: var(--pl-shadow-drop-sm);

		&:hover,
		&:focus {
			transform: translate(0);
			box-shadow: none;
		}

		& > :global(svg) {
			pointer-events: none;
			flex-shrink: 0;
		}

		&[disabled] {
			transform: none;
			filter: grayscale(100%);
			box-shadow: none;
			cursor: not-allowed;
		}
	}

	.theme {
		background-color: var(--pl-accent-1);
		color: var(--pl-accent-6);
		&[disabled] {
			background-color: color-mix(in oklab, var(--pl-accent-2), black 30%);
		}
	}

	.primary {
		background-color: var(--pl-primary);
		color: var(--pl-black);
	}

	.secondary {
		background-color: var(--pl-secondary);
		color: var(--pl-black);
	}

	.text {
		transform: none;
		border: none;
		background-color: transparent;

		&:hover,
		&:focus {
			transform: none;
			box-shadow: none;
			background-color: var(--pl-accent-2);
		}
	}

	.sm {
		block-size: calc(var(--pl-spacing) * 6);
		padding-inline: calc(var(--pl-spacing) * 1);

		@media (min-width: 768px) {
			padding-inline: calc(var(--pl-spacing) * 8);
			block-size: calc(var(--pl-spacing) * 3);
		}
	}

	.md {
		block-size: calc(var(--pl-spacing) * 7);
		padding-inline: calc(var(--pl-spacing) * 2);
		padding-block: calc(var(--pl-spacing) * 1);

		@media (min-width: 768px) {
			block-size: calc(var(--pl-spacing) * 9);
			padding-inline: calc(var(--pl-spacing) * 4);
			padding-block: calc(var(--pl-spacing) * 2);
		}
	}

	.lg {
		block-size: calc(var(--pl-spacing) * 8);
		padding-inline: calc(var(--pl-spacing) * 4);
		@media (min-width: 768px) {
			block-size: calc(var(--pl-spacing) * 10);
			padding-inline: calc(var(--pl-spacing) * 6);
		}
	}

	.full {
		inline-size: 100%;
		padding-inline: calc(var(--pl-spacing) * 4);
	}

	.square {
		inline-size: calc(var(--pl-spacing) * 7);
		block-size: calc(var(--pl-spacing) * 7);

		@media (min-width: 768px) {
			inline-size: calc(var(--pl-spacing) * 9);
			block-size: calc(var(--pl-spacing) * 9);
		}
	}
</style>
