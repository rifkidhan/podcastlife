<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';

	interface TabPanel extends HTMLAttributes<HTMLElement> {
		id: string;
		children: Snippet;
	}

	let { id, children, ...attrs }: TabPanel = $props();

	const tabs = getContext<{ readonly active: string }>('tab-active');
</script>

<div
	id={`${id}-panel`}
	role="tabpanel"
	aria-labelledby={id}
	tabindex="0"
	hidden={tabs.active !== id}
	class:tab-panel={true}
	{...attrs}
>
	{@render children()}
</div>

<style>
	.tab-panel {
		width: 100%;
		border-radius: var(--pl-border-radius-md);
		border-top-left-radius: 0;
		border: 2px solid hsl(var(--pl-accent-95));
		background-color: hsl(var(--pl-accent-5));
		box-shadow: var(--pl-shadow-drop);
		padding: 2rem 1.5rem;
		height: 50lvh;
		overflow-y: auto;
		overscroll-behavior-y: auto;
		scrollbar-gutter: stable both;
		scrollbar-width: thin;
	}
</style>
