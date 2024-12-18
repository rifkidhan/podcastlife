<script lang="ts">
	import { Icon } from "$lib/components";
	import { Themes } from "./theme.svelte";
	import { crossfade } from "svelte/transition";

	const themes = new Themes();
	let theme = $derived(themes.theme);

	const [send, receive] = crossfade({
		duration: 300
	});
</script>

<button
	id="theme-selector"
	type="button"
	class="theme-selector"
	data-selected={theme}
	aria-label="Theme Switcher"
	onclick={themes.update}
	title="Theme Switcher"
>
	<span class="theme-icon" aria-hidden="true" data-selected={theme === "auto"}>
		{#if theme === "auto"}
			<span in:send={{ key: "trigger" }} out:receive={{ key: "trigger" }} class="selected"></span>
		{/if}
		<Icon name="computer" />
	</span>
	<span class="theme-icon" aria-hidden="true" data-selected={theme === "light"}>
		{#if theme === "light"}
			<span in:send={{ key: "trigger" }} out:receive={{ key: "trigger" }} class="selected"></span>
		{/if}
		<Icon name="sun" />
	</span>
	<span class="theme-icon" aria-hidden="true" data-selected={theme === "dark"}>
		{#if theme === "dark"}
			<span in:send={{ key: "trigger" }} out:receive={{ key: "trigger" }} class="selected"></span>
		{/if}
		<Icon name="moon" />
	</span>
</button>

<style>
	.theme-selector {
		--pl-theme-icon-size: 1.75rem;
		--pl-theme-selector-gap: 0.25rem;

		position: relative;
		display: flex;
		border-radius: 99999px;
		border: 2px solid hsl(var(--pl-accent-95));
		gap: var(--pl-theme-selector-gap);
		height: min-content;
		overflow: hidden;
	}

	.theme-icon {
		width: var(--pl-theme-icon-size);
		height: var(--pl-theme-icon-size);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		z-index: 1;
		color: hsl(var(--pl-accent-70));

		&[data-selected="true"] {
			color: hsl(var(--pl-black));
		}
	}

	.selected {
		width: var(--pl-theme-icon-size);
		height: var(--pl-theme-icon-size);
		display: block;
		position: absolute;
		background-color: hsl(var(--pl-picton));
		top: 0;
		border-radius: 9999px;
		z-index: -1;
	}
</style>
