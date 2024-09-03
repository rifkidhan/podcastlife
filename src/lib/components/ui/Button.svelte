<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import LoadingCircle from './LoadingCircle.svelte';

	interface ButtonProps extends HTMLButtonAttributes {
		children: Snippet;
		variant?: 'primary' | 'picton' | 'text';
		size?: 'sm' | 'md' | 'lg' | 'fit' | 'full';
		circle?: boolean;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'reset' | 'submit';
	}

	let {
		children,
		type = 'button',
		variant = 'primary',
		size = 'md',
		circle = false,
		disabled,
		loading,
		...attrs
	}: ButtonProps = $props();
</script>

<button
	{type}
	class:primary={variant === 'primary'}
	class:picton={variant === 'picton'}
	class:text={variant === 'text'}
	class:sm={size === 'sm'}
	class:md={size === 'md'}
	class:lg={size === 'lg'}
	class:fit={size === 'fit'}
	class:full={size === 'full'}
	class:circle
	class:disabled
	class:loading
	disabled={loading || disabled}
	{...attrs}
>
	{#if loading}
		<LoadingCircle />
	{:else}
		{@render children()}
	{/if}
</button>

<style>
	button {
		display: inline-flex;
		position: relative;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--space-1_5);
		border: 2px solid var(--accent-95);
		text-align: center;
		font-weight: 600;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;

		&:hover {
			transform: translate(-2px, -2px);
			box-shadow: var(--shadow-drop-sm);
		}
	}
	.primary {
		border-color: var(--accent-95);
		background-color: var(--accent-5);
		color: var(--accent-95);
		&:focus {
			background-color: var(--accent-10);
		}
	}
	.picton {
		background-color: var(--picton);
		color: var(--black);
		&:focus {
			background-color: color-mix(in srgb, var(--picton), black 20%);
		}
	}

	.text {
		transform: none;
		border: none;
		background-color: transparent;
		box-shadow: none;
		&:focus {
			background-color: var(--accent-10);
		}
		&:hover {
			transform: none;
			box-shadow: none;
		}
	}

	.circle {
		border-radius: 99999px;
	}

	.loading {
		cursor: not-allowed;
	}

	.sm {
		width: var(--space-5);
		height: var(--space-5);
		padding: 2px;

		@media (min-width: 768px) {
			width: var(--space-7);
			height: var(--space-7);
			padding: var(--space-1);
		}
	}

	.md {
		width: var(--space-7);
		height: var(--space-7);
		padding: 2px;

		@media (min-width: 768px) {
			width: var(--space-9);
			height: var(--space-9);
			padding: var(--space-1_5);
		}
	}

	.lg {
		width: var(--space-9);
		height: var(--space-9);
		padding: var(--space-1);

		@media (min-width: 768px) {
			width: var(--space-11);
			height: var(--space-11);
			padding: var(--space-2);
		}
	}

	.fit {
		width: fit-content;
		padding-inline: var(--space-3);
		padding-block: var(--space-2);
	}

	.full {
		width: 100%;
		padding-inline: var(--space-3);
		padding-block: var(--space-2);
	}

	.disabled,
	.disabled:hover,
	.disabled:focus {
		transform: none;
		border-color: var(--accent-30);
		background-color: var(--accent-50);
		filter: grayscale(100%);
		box-shadow: none;
		cursor: not-allowed;
		color: var(--accent-95);
	}
</style>
