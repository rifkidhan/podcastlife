<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onDestroy } from 'svelte';
	import { createWindowVirtualizer } from '$lib/hooks/useVirtual.svelte';
	import type { VirtualItem } from '@tanstack/virtual-core';

	interface Props {
		count: number;
		estimateSize: number;
		overscan?: number;
		gap?: number;
		virtualItems: Snippet<[VirtualItem]>;
		updateCount?: (count: number) => void;
		loading?: boolean;
	}

	let {
		count,
		estimateSize,
		overscan = 5,
		gap = 5,
		loading = false,
		virtualItems
	}: Props = $props();

	let initialCount = $state(1);
	let initialSize = $state(1);

	const virtual = createWindowVirtualizer<HTMLDivElement>({
		count,
		estimateSize: () => estimateSize,
		overscan,
		gap
	});

	initialCount = count;
	initialSize = estimateSize;

	$effect.pre(() => {
		if (initialCount !== count) {
			virtual.setOptions({
				count
			});
			initialCount = count;
		}
	});

	$effect.pre(() => {
		if (initialSize !== estimateSize) {
			virtual.setOptions({
				estimateSize: () => estimateSize
			});
			initialSize = estimateSize;
		}
	});

	onDestroy(virtual.cleanup);
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
			{#if loading}
				<div></div>
			{:else}
				{@render virtualItems(item)}
			{/if}
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
