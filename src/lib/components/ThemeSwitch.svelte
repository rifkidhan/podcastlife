<script lang="ts">
	import { crossfade } from "svelte/transition";
	import { theme } from "$lib/state/theme.svelte";
	import Icon from "./Icon.svelte";

	const onClick = () => {
		if (document.startViewTransition) {
			document.documentElement.style.viewTransitionName = "theme";
			document
				.startViewTransition(async () => {
					theme.current = theme.current === "light" ? "dark" : "light";
				})
				.finished.then(() => {
					document.documentElement.style.viewTransitionName = "none";
				});
		} else {
			theme.current = theme.current === "light" ? "dark" : "light";
		}
	};

	const [send, receive] = crossfade({
		duration: 300
	});
</script>

<button
	class="theme-switch"
	type="button"
	role="switch"
	title="Toggle theme"
	value={theme.current}
	aria-live="polite"
	aria-checked={theme.current === "dark"}
	aria-label="Toggle theme"
	onclick={onClick}
>
	<span class="theme-icon" aria-hidden="true" data-selected={theme.current === "light"}>
		{#if theme.current === "light"}
			<span in:send={{ key: "trigger" }} out:receive={{ key: "trigger" }} class="selected"></span>
		{/if}
		<Icon name="sun" isHidden />
	</span>
	<span class="theme-icon" aria-hidden="true" data-selected={theme.current === "dark"}>
		{#if theme.current === "dark"}
			<span in:send={{ key: "trigger" }} out:receive={{ key: "trigger" }} class="selected"></span>
		{/if}
		<Icon name="moon" isHidden />
	</span>
</button>

<style>
	.theme-switch {
		--pl-theme-icon-size: calc(var(--pl-spacing) * 7);
		display: flex;
		position: relative;
		border: solid 1px var(--pl-accent-6);
		gap: var(--pl-spacing);
		overflow: hidden;
	}

	.theme-icon {
		inline-size: var(--pl-theme-icon-size);
		block-size: var(--pl-theme-icon-size);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--pl-spacing);
		z-index: 1;
		color: color-mix(in oklab, var(--pl-accent-6) 70%, transparent);

		&[data-selected="true"] {
			color: var(--pl-black);
		}
	}

	.selected {
		inline-size: var(--pl-theme-icon-size);
		block-size: var(--pl-theme-icon-size);
		display: block;
		position: absolute;
		background-color: var(--pl-primary);
		top: 0;
		z-index: -1;
	}
</style>
