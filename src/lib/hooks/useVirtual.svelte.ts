import {
	Virtualizer,
	windowScroll,
	observeWindowOffset,
	observeWindowRect,
	observeElementRect,
	observeElementOffset,
	elementScroll
} from '@tanstack/virtual-core';
import type { VirtualizerOptions, PartialKeys } from '@tanstack/virtual-core';
import type { Action } from 'svelte/action';
import { onDestroy } from 'svelte';

const virtualBase = <TScroll extends Element | Window, TItem extends Element>(
	opts: VirtualizerOptions<TScroll, TItem>
) => {
	let resolvedOptions: VirtualizerOptions<TScroll, TItem> = $state(opts);

	let instanced = $state(new Virtualizer<TScroll, TItem>(resolvedOptions));

	let virtualItems = $state(instanced.getVirtualItems());
	let totalSize = $state(instanced.getTotalSize());

	const setOptions = (options: Partial<VirtualizerOptions<TScroll, TItem>>) => {
		resolvedOptions = {
			...resolvedOptions,
			...options,
			onChange: (instance: Virtualizer<TScroll, TItem>, sync: boolean) => {
				instance._willUpdate();
				instanced = instance;
				virtualItems = instance.getVirtualItems();
				totalSize = instance.getTotalSize();
				options.onChange?.(instance, sync);
			}
		};
		instanced.measure();
	};

	const measureElement: Action<TItem> = (node) => {
		instanced.measureElement(node);

		return {
			update: () => {
				instanced.measureElement(node);
			}
		};
	};

	instanced = new Virtualizer<TScroll, TItem>(resolvedOptions);

	$effect.pre(() => {
		instanced.setOptions(resolvedOptions);
		instanced.measure();
	});

	$effect.pre(() => {
		instanced._willUpdate();
	});

	$effect(() => {
		virtualItems = instanced.getVirtualItems();
		totalSize = instanced.getTotalSize();
	});

	onDestroy(() => {
		instanced._didMount();
	});

	return {
		setOptions,
		get virtualItems() {
			return virtualItems;
		},
		get totalSize() {
			return totalSize;
		},
		instance: instanced,
		measureElement
	};
};

export const createVirtualizer = <T extends Element, U extends Element>(
	opts: PartialKeys<
		VirtualizerOptions<T, U>,
		'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
	>
) => {
	return virtualBase<T, U>({
		observeElementRect: observeElementRect,
		observeElementOffset: observeElementOffset,
		scrollToFn: elementScroll,
		...opts
	});
};

export const createWindowVirtualizer = <T extends Element>(
	options: PartialKeys<
		VirtualizerOptions<Window, T>,
		'getScrollElement' | 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
	>
) => {
	return virtualBase({
		getScrollElement: () => (typeof document !== 'undefined' ? window : null),
		observeElementRect: observeWindowRect,
		observeElementOffset: observeWindowOffset,
		scrollToFn: windowScroll,
		initialOffset: () => (typeof document !== 'undefined' ? window.scrollY : 0),
		...options
	});
};
