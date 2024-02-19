<script lang="ts">
	import { createTabs, createSync } from '@melt-ui/svelte';

	export let contentId: string;
	export let value: string;
	export let ref: HTMLElement | undefined = undefined;

	const {
		elements: { content },
		states
	} = createTabs();

	const sync = createSync(states);

	$: sync.value(value, (v) => (value = v));
</script>

<div
	class="flex min-h-[100px] w-full flex-col gap-5 rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
	{...$content(contentId)}
	use:content
	bind:this={ref}
>
	<slot />
</div>

<style lang="postcss">
	[hidden] {
		@apply hidden;
	}
</style>
