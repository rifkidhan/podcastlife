<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";
	import { crossfade } from "svelte/transition";
	import { setTabContext, type ListType } from "./context";

	interface TabProps {
		list: ListType;
		class?: ClassValue;
		children?: Snippet;
	}

	let { list, class: className, children }: TabProps = $props();

	const [send, receive] = crossfade({
		duration: 300
	});

	let active = $state(list[0].id);

	setTabContext(() => active);

	let focus = $state(0);
</script>

<div class={className}>
	<div
		class="tablist"
		role="tablist"
		tabindex="0"
		aria-orientation="horizontal"
		onkeydown={(e) => {
			const tablist = e.currentTarget as HTMLElement;
			const tabs = tablist.querySelectorAll("button");

			if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
				// tabs[focus].setAttribute("tabindex", "-1");

				if (e.key === "ArrowRight") {
					focus++;
					if (focus >= list.length) {
						focus = 0;
					}
				} else if (e.key === "ArrowLeft") {
					focus--;

					if (focus < 0) {
						focus = list.length - 1;
					}
				}
			}

			// tabs[focus].setAttribute("tabindex", "0");
			tabs[focus].focus();
		}}
	>
		{#each list as item, i (item.id)}
			<button
				type="button"
				role="tab"
				aria-selected={active === item.id}
				aria-controls={`${item.id}-panel`}
				tabindex={active === item.id || focus === i ? 0 : -1}
				onclick={() => (active = item.id)}
				class="tab"
			>
				{#if active === item.id}
					<span class="backdrop" in:send={{ key: "tab" }} out:receive={{ key: "tab" }}></span>
				{/if}
				<span>{item.title}</span>
			</button>
		{/each}
	</div>
	{@render children?.()}
</div>

<style>
	.tablist {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		overflow: hidden;
		border-top-left-radius: var(--pl-radius-md);
		border-top-right-radius: var(--pl-radius-md);
		border: solid 1px;

		@media (max-width: 768px) {
			border-bottom: none;
		}
	}

	.tab {
		display: block;
		position: relative;
		padding-block: calc(var(--pl-spacing) * 3);
		padding-inline: calc(var(--pl-spacing) * 4);

		&[aria-selected="true"] {
			color: var(--pl-black);
		}

		.backdrop {
			position: absolute;
			inset: 0;
			z-index: -1;
			inline-size: 100%;
			block-size: 100%;
			background-color: var(--pl-primary);
		}
	}
</style>
