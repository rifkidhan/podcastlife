<script lang="ts">
	import { TITLE_SITE } from "$lib/utils/constants";
	import { useUI } from "$lib/state/ui.svelte";
	import throttle from "$lib/utils/throttle";
	import Button from "./Button.svelte";
	import Icon from "./Icon.svelte";

	let visible = $state(true);
	let lastScroll = $state(0);

	const handleScroll = throttle(() => {
		const scroll = window.scrollY;
		visible = (lastScroll > scroll && lastScroll - scroll > 80) || scroll < 200;
		lastScroll = scroll;
	}, 100);
</script>

<svelte:window onscroll={handleScroll} />

<header class={["pl-header", { invisible: !visible }]} inert={useUI.inert}>
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
	.pl-header {
		position: sticky;
		top: 0;
		inline-size: 100%;
		block-size: var(--pl-header-height);
		z-index: var(--pl-header-index);
		background-color: var(--pl-accent-1);
		border-bottom: solid 1px var(--pl-accent-6);
		transition: transform ease-in-out 200ms;

		&:is(.invisible) {
			transform: translateY(-4rem);
		}
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
