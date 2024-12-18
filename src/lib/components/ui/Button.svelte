<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Icons } from "./Icons";
	import Icon from "./Icon.svelte";

	interface ButtonProps extends HTMLButtonAttributes {
		children?: Snippet;
		variant?: "primary" | "picton" | "cerise" | "text";
		size?: "sm" | "md" | "lg" | "fit" | "full";
		circle?: boolean;
		disabled?: boolean;
		loading?: boolean;
		type?: "button" | "reset" | "submit";
		icon?: keyof typeof Icons;
	}

	let {
		children,
		type = "button",
		variant = "primary",
		size = "md",
		circle = false,
		disabled,
		loading,
		icon,
		...attrs
	}: ButtonProps = $props();
</script>

<button
	{type}
	class:primary={variant === "primary"}
	class:picton={variant === "picton"}
	class:text={variant === "text"}
	class:cerise={variant === "cerise"}
	class:sm={size === "sm"}
	class:md={size === "md"}
	class:lg={size === "lg"}
	class:fit={size === "fit"}
	class:full={size === "full"}
	class:circle
	{disabled}
	data-loading={loading}
	{...attrs}
>
	<span>
		{#if loading}
			<Icon name="spinner" aria-hidden="true" class="animate-spin" />
		{:else if icon}
			<Icon name={icon} aria-hidden="true" />
		{/if}
	</span>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	button {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--pl-border-radius-sm);
		border: 2px solid hsl(var(--pl-accent-95));
		text-align: center;
		font-weight: 500;
		transition-property: transform, box-shadow;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;

		&:hover {
			transform: translate(-2px, -2px);
			box-shadow: var(--pl-shadow-drop-sm);
		}

		&:where(.sm, .md, .lg) {
			width: var(--pl-button-width);
			height: var(--pl-button-width);
			padding: var(--pl-button-padding);
		}

		&:where(.fit, .full) {
			width: var(--pl-button-width);
			padding-inline: 0.5rem;
			padding-block: 0.75;
		}

		&[disabled]:not([data-loading]) {
			transform: none;
			border-color: hsl(var(--pl-accent-30));
			background-color: hsl(var(--pl-accent-50));
			filter: grayscale(100%);
			box-shadow: none;
			cursor: not-allowed;
			color: hsl(var(--pl-accent-95));
		}

		&[data-loading="true"] {
			cursor: not-allowed;
			transform: none;
			box-shadow: none;
		}
	}

	.primary {
		background-color: hsl(var(--pl-accent-5));
		color: hsl(var(--pl-accent-95));
		&:focus {
			background-color: hsl(var(--pl-accent-10));
		}
	}

	.picton {
		background-color: hsl(var(--pl-picton));
		color: hsl(var(--pl-black));
		&:focus {
			background-color: color-mix(in srgb, hsl(var(--pl-picton)), black 10%);
		}
	}

	.cerise {
		background-color: hsl(var(--pl-cerise));
		color: hsl(var(--pl-black));
		&:focus {
			background-color: color-mix(in srgb, hsl(var(--pl-cerise)), black 10%);
		}
	}

	.text {
		transform: none;
		border: none;
		background-color: transparent;
		&:focus {
			background-color: hsl(var(--pl-accent-20));
		}

		&:hover {
			transform: none;
			box-shadow: none;
			background-color: hsl(var(--pl-accent-10));
		}
	}

	.circle {
		border-radius: 99999px;
	}

	.sm {
		--pl-button-width: 1.25rem;
		--pl-button-padding: 0.125rem;

		@media (min-width: 768px) {
			--pl-button-width: 1.75rem;
			--pl-button-padding: 0.25rem;
		}
	}

	.md {
		--pl-button-width: 1.75rem;
		--pl-button-padding: 0.125rem;

		@media (min-width: 768px) {
			--pl-button-width: 2.25rem;
			--pl-button-padding: 0.25rem;
		}
	}

	.lg {
		--pl-button-width: 2.25rem;
		--pl-button-padding: 0.25rem;

		@media (min-width: 768px) {
			--pl-button-width: 2.75rem;
			--pl-button-padding: 0.5rem;
		}
	}

	.fit {
		--pl-button-width: fit-content;
	}

	.full {
		--pl-button-width: 100%;
	}
</style>
