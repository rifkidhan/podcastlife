<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { untrack } from "svelte";
	import { Button } from "$lib/components";

	interface DescriptionProps extends HTMLAttributes<HTMLDivElement> {
		as?: string;
		children: Snippet;
		truncate?: number;
	}
	let { as = "span", children, truncate = 3, ...attrs }: DescriptionProps = $props();

	let open = $state(false);
	let parentHeight = $state(0);
	let elementHeight = $state(1000);
	let isTruncate = $state(true);

	let element: HTMLElement | undefined = $state();

	$effect.pre(() => {
		if (!element) return;
		elementHeight = element.scrollHeight;
		untrack(() => {
			isTruncate = elementHeight > parentHeight;
		});
	});
</script>

<div
	class:root={true}
	bind:clientHeight={parentHeight}
	style:--pl-description-truncate={truncate}
	{...attrs}
>
	<svelte:element
		this={as}
		bind:this={element}
		data-open-more={open}
		class="truncate"
		class:mask={isTruncate}
	>
		{@render children()}
	</svelte:element>

	{#if isTruncate}
		<Button type="button" variant="text" size="full" onclick={() => (open = !open)}>
			{open ? "Show Less" : "Show More"}
		</Button>
	{/if}
</div>

<style>
	.root {
		display: block;
	}

	.truncate {
		overflow-wrap: break-word;

		&[data-open-more="false"] {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: var(--pl-description-truncate);
			line-clamp: var(--pl-description-truncate);
		}
	}
	.mask {
		&[data-open-more="false"] {
			mask-image: linear-gradient(
				to top,
				transparent 0%,
				hsla(var(--pl-accent-95)) 90%,
				transparent 100%
			);
		}
	}
</style>
