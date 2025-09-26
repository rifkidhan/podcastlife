<script lang="ts">
	import type { Snippet } from "svelte";
	import { getTabContext } from "./context";

	interface TabpanelProps {
		id: string;
		children?: Snippet;
	}

	let { id, children }: TabpanelProps = $props();

	let tab = getTabContext();
</script>

<div
	id={`${id}-panel`}
	role="tabpanel"
	aria-labelledby={id}
	tabindex="0"
	hidden={tab.active !== id}
	class="tab-panel"
>
	{@render children?.()}
</div>
