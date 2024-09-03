<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createWindowVirtualizer } from '$lib/hooks/useVirtual.svelte';
	import type { VirtualItem } from '@tanstack/virtual-core';

	interface Props {
		count: number;
		updateCount?: boolean;
		estimateSize: number;
		updateSize?: boolean;
		overscan?: number;
		gap?: number;
		virtualItems: Snippet<[VirtualItem]>;
	}

	let {
		count,
		updateCount = $bindable(false),
		estimateSize,
		updateSize = $bindable(false),
		overscan = 5,
		gap = 5,
		virtualItems
	}: Props = $props();

	const virtual = createWindowVirtualizer<HTMLDivElement>({
		count,
		estimateSize: () => estimateSize,
		overscan,
		gap
	});

	$effect(() => {
		if (updateCount) {
			virtual.setOptions({
				count
			});
			updateCount = false;
		}
	});

	$effect(() => {
		if (updateSize) {
			virtual.setOptions({
				estimateSize: () => estimateSize
			});

			updateSize = false;
		}
	});
</script>

<div role="list" class="virtual-list" style:height={`${virtual.totalSize}px`}>
	{#each virtual.virtualItems as item (item.index)}
		<div
			role="listitem"
			class="item"
			style:height={`${item.size}px`}
			style:transform={`translateY(${item.start}px)`}
			data-index={item.index}
		>
			{@render virtualItems(item)}
		</div>
	{/each}
</div>

<style>
	.virtual-list {
		position: relative;
		width: 100%;

		& > .item {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
</style>
