<script>
	import { useUI, Button } from "$lib/components";
	import { scrollY } from "svelte/reactivity/window";

	const uiState = useUI();

	let height = $derived.by(() => {
		if (uiState.player) {
			return 4;
		}

		return 0;
	});

	const onClick = () => {
		window?.scrollTo({ top: 0, behavior: "smooth" });
	};
</script>

{#if scrollY.current > 1000}
	<div inert={uiState.menuOpen} class="scroll-button" style:--bottom={`${height}rem`}>
		<Button type="button" circle onclick={onClick} title="Scroll to top" icon="move-up" />
	</div>
{/if}

<style>
	.scroll-button {
		position: fixed;
		bottom: calc(var(--pl-scroll-button-bottom) + var(--bottom));
		right: var(--pl-scroll-button-right);
	}
</style>
