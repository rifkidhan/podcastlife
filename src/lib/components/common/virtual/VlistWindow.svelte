<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VirtualItem } from '@tanstack/virtual-core';
	import { createWindowVirtualizer } from './virtual.svelte';
	import { onDestroy } from 'svelte';

	interface Props {
		count: number;
		estimateSize: number;
		overscan?: number;
		gap?: number;
		virtualItems: Snippet<[VirtualItem]>;
	}

	let { count, estimateSize, overscan = 5, gap = 5, virtualItems, ...opts }: Props = $props();

	const vlist = createWindowVirtualizer<HTMLDivElement>({
		count,
		estimateSize: () => estimateSize,
		overscan,
		gap,
		...opts
	});

	let instance = $derived(vlist.instance);
	let options = $derived(vlist.options);
	let totalSize = $derived(vlist.totalSize);
	let getVirtualItems = $derived(vlist.virtualItems);

	const cleanup = $effect.root(() => {
		$effect.pre(() => {
			console.log();
			instance.setOptions(options);
			instance.measure();
		});
		$effect.pre(() => {
			instance._willUpdate();
		});
		return () => instance._didMount();
	});

	onDestroy(() => cleanup());
</script>

<div role="list" class="vlist" style:height={`${totalSize}px`}>
	{#each getVirtualItems as item (item.index)}
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
	.vlist {
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
