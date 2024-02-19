<script lang="ts">
	import { createDialog, createSync } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let role: 'dialog' | 'alertdialog' = 'dialog';
	export let preventScroll = true;
	export let forceVisible = false;
	export let portalElement = 'div';
	export let open = false;
	export let overlay = false;
	export let closeOnEscape = true;
	export let closeOnOutsideClick = true;

	const dispatch = createEventDispatcher();

	const {
		elements: { content, close, portalled, overlay: contentOverlay, title, description },
		states
	} = createDialog({
		role,
		preventScroll,
		forceVisible,
		closeOnEscape,
		closeOnOutsideClick
	});

	const sync = createSync(states);

	$: sync.open(open, (v) => (open = v));

	$: slotContent = {
		content: $content,
		title: $title,
		description: $description,
		close: $close
	};

	$: actions = {
		content: content,
		title: title,
		description: description,
		close: close
	};

	$: if (!open) {
		dispatch('close');
	}
</script>

<svelte:element this={portalElement} {...$portalled} use:portalled>
	{#if open}
		{#if overlay}
			<div
				{...$contentOverlay}
				use:contentOverlay
				class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
				transition:fade={{ duration: 250 }}
			/>
		{/if}
		<slot contents={slotContent} {actions} />
	{/if}
</svelte:element>
