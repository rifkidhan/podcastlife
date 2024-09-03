<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface TabsContent extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		id: string;
		active: string;
		ref?: HTMLElement;
	}

	let { children, id, active, ref = $bindable(), ...attrs }: TabsContent = $props();
</script>

<div
	id="{id}-panel"
	class="tab-content"
	role="tabpanel"
	aria-labelledby={id}
	tabindex="0"
	hidden={active !== id}
	{...attrs}
	bind:this={ref}
>
	{@render children()}
</div>

<style>
	.tab-content {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 12rem);
		width: 100%;
		gap: var(--space-5);
		border-radius: var(--space-2);
		border-top-left-radius: 0px;
		border: 2px solid currentColor;
		padding: var(--space-8) var(--space-5);
		box-shadow: var(--shadow-drop);
		background-color: var(--accent-5);
		overflow-y: auto;
	}
</style>
