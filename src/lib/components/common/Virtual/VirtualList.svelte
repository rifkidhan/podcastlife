<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VirtualItem } from '@tanstack/virtual-core';
	import { onDestroy } from 'svelte';
	import { createVirtualizer } from './useVirtual.svelte';

	interface VirtualWindowProps {
		count: number;
		estimateSize: number;
		overscan?: number;
		gap?: number;
		virtualItems: Snippet<[VirtualItem]>;
		scrollElement: HTMLElement;
	}

	let {
		count,
		estimateSize,
		scrollElement,
		overscan = 5,
		gap = 5,
		virtualItems
	}: VirtualWindowProps = $props();

	const virtual = createVirtualizer<HTMLElement, HTMLDivElement>({
		count,
		estimateSize: () => estimateSize,
		overscan,
		getScrollElement: () => scrollElement,
		gap
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
	}

	.item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
</style>
