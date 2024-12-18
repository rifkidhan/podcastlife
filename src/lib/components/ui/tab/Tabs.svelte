<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { crossfade } from "svelte/transition";
	import { setContext } from "svelte";

	interface TabsProps extends HTMLAttributes<HTMLElement> {
		list: { id: string; content: string }[];
		children: Snippet;
		tabColor?: "picton" | "cerise";
	}

	let { list, children, tabColor = "picton", ...attrs }: TabsProps = $props();

	let active = $state(list[0].id);

	const toChildren = {
		get active() {
			return active;
		}
	};

	setContext("tab-active", toChildren);

	const [send, receive] = crossfade({
		duration: 300
	});

	let focus = $state(0);

	const onKeyDown = (e: KeyboardEvent) => {
		const tablist = e.currentTarget as HTMLElement;

		const tabs = tablist.querySelectorAll("button");

		if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			tabs[focus].setAttribute("tabindex", "-1");
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

			tabs[focus].setAttribute("tabindex", "0");
			tabs[focus].focus();
		}
	};
</script>

<div {...attrs}>
	<div
		role="tablist"
		tabindex="0"
		class="tablist"
		aria-orientation="horizontal"
		onkeydown={onKeyDown}
	>
		{#each list as item (item.id)}
			<button
				id={item.id}
				type="button"
				role="tab"
				aria-selected={active === item.id ? true : false}
				aria-controls={`${item.id}-panel`}
				tabindex={active === item.id ? 0 : -1}
				onclick={() => (active = item.id)}
				class="tab"
			>
				{#if active === item.id}
					<span
						in:send={{ key: "tab" }}
						out:receive={{ key: "tab" }}
						class="backdrop"
						class:backdrop-picton={tabColor === "picton"}
						class:backdrop-cerise={tabColor === "cerise"}
					></span>
				{/if}
				<span>
					{item.content}
				</span>
			</button>
		{/each}
	</div>
	{@render children()}
</div>

<style>
	.tablist {
		display: flex;
		flex-direction: row;
		overflow: hidden;
		border-top-left-radius: var(--pl-border-radius-md);
		border-top-right-radius: var(--pl-border-radius-md);
		border: 2px solid hsl(var(--pl-accent-95));
		border-bottom: none;
		box-shadow: var(--pl-shadow-drop);
		max-width: max-content;
	}

	.tab {
		display: block;
		position: relative;
		min-width: 10%;
		padding: 0.75rem 1rem;
		font-weight: 600;

		&[aria-selected="true"] {
			color: hsl(var(--pl-black));
		}

		& > span:not(.backdrop) {
			z-index: 2;
			position: relative;
		}
	}

	.backdrop {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
	}

	.backdrop-picton {
		background-color: hsl(var(--pl-picton));
	}

	.backdrop-cerise {
		background-color: hsl(var(--pl-cerise));
	}
</style>
