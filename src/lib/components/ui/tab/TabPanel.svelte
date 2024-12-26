<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";

	interface TabPanel extends HTMLAttributes<HTMLElement> {
		id: string;
		children: Snippet;
	}

	let { id, children, class: className, ...attrs }: TabPanel = $props();

	const tabs = getContext<{ readonly active: string }>("tab-active");
</script>

<div
	id={`${id}-panel`}
	role="tabpanel"
	aria-labelledby={id}
	tabindex="0"
	hidden={tabs.active !== id}
	class={["tab-panel", className]}
	{...attrs}
>
	{@render children()}
</div>
