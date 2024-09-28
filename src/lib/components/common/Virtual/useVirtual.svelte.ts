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

const base = <TScroll extends Element | Window, TItem extends Element>(
	opts: VirtualizerOptions<TScroll, TItem>
) => {
	let resolvedOptions: VirtualizerOptions<TScroll, TItem> = $state(opts);

	let instanced = $state(new Virtualizer(resolvedOptions));

	let virtualItems = $state(instanced.getVirtualItems());
	let totalSize = $state(instanced.getTotalSize());

	const setOptions = (newOptions: Partial<VirtualizerOptions<TScroll, TItem>>) => {
		resolvedOptions = {
			...instanced.options,
			...newOptions,
			onChange: (instance: Virtualizer<TScroll, TItem>, sync: boolean) => {
				instanced = instance;
				virtualItems = instance.getVirtualItems();
				totalSize = instance.getTotalSize();
				newOptions.onChange?.(instance, sync);
			}
		};
	};

	const measureElement: Action<TItem> = (node) => {
		instanced.measureElement(node);

		return {
			update: () => {
				instanced.measureElement(node);
			}
		};
	};

	const cleanup = $effect.root(() => {
		$effect.pre(() => {
			instanced.setOptions(resolvedOptions);
			instanced.measure();
		});

		$effect.pre(() => {
			instanced._willUpdate();
		});

		$effect.pre(() => {
			virtualItems = instanced.getVirtualItems();
			totalSize = instanced.getTotalSize();
		});

		return () => {
			instanced._didMount();
		};
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
		measureElement,
		cleanup
	};
};

export const createVirtualizer = <T extends Element, U extends Element>(
	opts: PartialKeys<
		VirtualizerOptions<T, U>,
		'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
	>
) => {
	return base<T, U>({
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
	return base({
		getScrollElement: () => (typeof document !== 'undefined' ? window : null),
		observeElementRect: observeWindowRect,
		observeElementOffset: observeWindowOffset,
		scrollToFn: windowScroll,
		initialOffset: () => (typeof document !== 'undefined' ? window.scrollY : 0),
		...options
	});
};
