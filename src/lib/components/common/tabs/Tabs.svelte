<script lang="ts">
	import { createTabs, createSync } from '@melt-ui/svelte';
	import { crossfade } from 'svelte/transition';

	export let defaultValue: string | undefined = undefined;
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let tabs: { id: string; title: string }[];
	export let ref: HTMLElement | undefined = undefined;

	const {
		elements: { root, content, list, trigger },
		states,
		options
	} = createTabs({
		defaultValue
	});

	const sync = createSync({ ...options, ...states });

	$: sync.orientation(orientation, (v) => (orientation = v));

	$: value = states.value;

	const [send, receive] = crossfade({
		duration: 300
	});
</script>

<div {...$root} use:root {...$$restProps} bind:this={ref}>
	<div
		class="flex max-w-max flex-row overflow-hidden rounded-t-md border-2 border-b-0 shadow-drop"
		{...$list}
		use:list
	>
		{#each tabs as tabItem}
			<button
				{...$trigger(tabItem.id)}
				use:trigger
				class="relative flex min-w-[20%] px-4 py-3 data-[state=active]:text-white"
			>
				{#if $value === tabItem.id}
					<div
						in:send={{ key: 'trigger' }}
						out:receive={{ key: 'trigger' }}
						class="absolute inset-0 z-[49] h-full w-full bg-picton"
					/>
				{/if}
				<span class="z-50">
					{tabItem.title}
				</span>
			</button>
		{/each}
	</div>

	<slot active={$value}>
		<div
			class="flex min-h-[100px] w-full flex-col gap-5 rounded-md rounded-tl-none border-2 bg-accent-5 px-5 py-8 shadow-drop"
			{...$content(tabs[0].id)}
			use:content
		>
			Tabs Content
		</div>
	</slot>
</div>
