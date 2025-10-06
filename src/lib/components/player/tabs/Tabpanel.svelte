<script lang="ts">
	import type { Snippet } from "svelte";
	import { getTabContext } from "./context";

	interface TabpanelProps {
		id: string;
		children?: Snippet;
	}

	let { id, children }: TabpanelProps = $props();

	const tab = getTabContext();
	let active = $derived(tab.active);
</script>

<div
	id={`${id}-panel`}
	role="tabpanel"
	aria-labelledby={id}
	tabindex="0"
	hidden={active !== id}
	class="tab-panel"
>
	{@render children?.()}
</div>
