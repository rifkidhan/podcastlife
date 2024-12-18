<script lang="ts">
	import { useUI, Button } from "$lib/components";
	import throttle from "$lib/utils/throttle";

	let visible = $state(true);
	let scroll = $state(0);
	let lastScroll = $state(0);

	const handleScroll = throttle(() => {
		visible = (lastScroll > scroll && lastScroll - scroll > 70) || scroll < 500;
		lastScroll = scroll;
	}, 100);

	const uiState = useUI();
</script>

<svelte:window bind:scrollY={scroll} onscroll={handleScroll} />

<header inert={uiState.menuOpen} class:border={scroll > 70} class:invisible={!visible}>
	<nav class="navigation">
		<a href="/" class="title">
			<span> podcastlife </span>
		</a>

		<div>
			<Button
				type="button"
				variant="picton"
				aria-label="Open main navigation"
				aria-controls="side-navigation"
				aria-expanded={uiState.menuOpen}
				onclick={() => (uiState.menuOpen = true)}
				icon="menu"
			/>
		</div>
	</nav>
</header>

<style>
	header {
		position: sticky;
		padding-inline: 5vw;
		inset-block-start: 0;
		width: 100%;
		height: var(--pl-header-height);
		border-bottom: 2px solid transparent;
		background-color: hsl(var(--pl-accent-5));
		z-index: 5;
		padding-block: var(--pl-header-padding);
		transition-property: border-color, transform;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;

		&:is(.border) {
			border-bottom-color: hsl(var(--pl-accent-95));
		}

		&:is(.invisible) {
			transform: translateY(-4rem);
		}
	}

	.navigation {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.title {
		display: block;
		font-weight: 600;
		font-size: clamp(1.25rem, calc(0.5rem + 2vw), 2rem);
		color: hsl(var(--pl-picton));
	}
</style>
