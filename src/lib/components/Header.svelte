<script lang="ts">
	import { TITLE_SITE } from "$lib/utils/constants";
	import { useUI } from "$lib/state/ui.svelte";
	import Button from "./Button.svelte";
	import Icon from "./Icon.svelte";
</script>

<header inert={useUI.inert}>
	<div class="wrapper">
		<a href="/" class="home font-lancip" title="Home">{TITLE_SITE}</a>
		<Button
			size="square"
			aria-controls="side-navigation"
			aria-expanded={useUI.menuOpen}
			onclick={() => (useUI.menuOpen = true)}
			title="Open navigation"
		>
			<Icon name="menu" isHidden />
			<span class="sr-only">open navigation</span>
		</Button>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		inline-size: 100%;
		block-size: var(--pl-header-height);
		z-index: 2;
		background-color: var(--pl-accent-1);
		border-bottom: solid 1px var(--pl-accent-6);
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		max-width: 92dvw;
		margin-inline: auto;
		align-items: center;
		justify-content: space-between;
		block-size: 100%;
	}

	.home {
		font-weight: 600;
		font-size: clamp(1.25rem, calc(0.5rem + 2vw), 2rem);
		color: var(--pl-primary);
	}
</style>
