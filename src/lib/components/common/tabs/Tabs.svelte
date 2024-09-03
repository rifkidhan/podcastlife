<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { crossfade } from 'svelte/transition';

	interface TabsProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		tablist: { id: string; content: string }[];
		active: string;
	}

	let { children, tablist, active = $bindable(tablist[0].id), ...attrs }: TabsProps = $props();

	let tabList: HTMLDivElement;

	let focus = $state(0);

	const [send, receive] = crossfade({
		duration: 300
	});

	const onKeydown = (e: KeyboardEvent) => {
		if (!tabList) return;

		const tabs = tabList.querySelectorAll('button');

		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			tabs[focus].setAttribute('tabindex', '-1');
			if (e.key === 'ArrowRight') {
				focus++;

				if (focus >= tablist.length) {
					focus = 0;
				}
			} else if (e.key === 'ArrowLeft') {
				focus--;

				if (focus < 0) {
					focus = tablist.length - 1;
				}
			}

			tabs[focus].setAttribute('tabindex', '0');
			tabs[focus].focus();
		}
	};
</script>

<div {...attrs}>
	<div
		role="tablist"
		tabindex="0"
		aria-orientation="horizontal"
		class="wrapper"
		bind:this={tabList}
		onkeydown={onKeydown}
	>
		{#each tablist as list}
			<button
				id={list.id}
				type="button"
				role="tab"
				aria-selected={active === list.id ? true : false}
				aria-controls="{list.id}-panel"
				tabindex={active === list.id ? 0 : -1}
				class="tab"
				class:text-white={active === list.id}
				onclick={() => (active = list.id)}
			>
				{#if active === list.id}
					<span in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }} class="backdrop"
					></span>
				{/if}
				<span>{list.content}</span>
			</button>
		{/each}
	</div>
	{@render children()}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		overflow: hidden;
		border-top-left-radius: var(--space-2);
		border-top-right-radius: var(--space-2);
		border: 2px solid currentColor;
		border-bottom: none;
		box-shadow: var(--shadow-drop);
		max-width: max-content;

		.tab {
			display: inline-flex;
			position: relative;
			min-width: 10%;
			padding: var(--space-3) var(--space-4);

			&[aria-selected='true'] {
				color: var(--black);
			}
			& span:not(.backdrop) {
				z-index: 2;
			}
			& span:where(.backdrop) {
				position: absolute;
				inset: 0px;
				z-index: 1;
				width: 100%;
				height: 100%;
				background-color: var(--picton);
			}
		}
	}
</style>
