<script lang="ts">
	import throttle from '$lib/utils/throttle';
	import ThemeSwitcher from '../common/ThemeSwitcher.svelte';
	import { Button, Icons, useUI } from '$lib/components';

	let visible = $state(true);

	let scroll = $state(0);
	let lastScroll = $state(0);

	const handleScroll = throttle(() => {
		visible = (lastScroll > scroll && lastScroll - scroll > 70) || scroll < 500;
		lastScroll = scroll;
	}, 100);

	const menu = useUI();
	let uiState = $derived(useUI().menuOpen || useUI().playerModal);

	const menuItems = [
		{
			href: '/categories',
			title: 'Categories'
		},
		{
			href: '/live',
			title: 'Live Podcasts'
		},
		{
			href: '/about',
			title: 'About'
		}
	];
</script>

<svelte:window bind:scrollY={scroll} onscroll={handleScroll} />

<header inert={uiState} class:border={scroll > 70 && visible} class:invisible={!visible}>
	<div class="wrapper container full">
		<div>
			<a href="/" class="logo"> podcastlife </a>
		</div>
		<div class="nav">
			{#each menuItems as item}
				<a href={item.href}>{item.title}</a>
			{/each}
		</div>
		<div class="buttons">
			<div class="menu">
				<Button
					type="button"
					title="Open Menu Button"
					aria-controls="side-menu"
					aria-expanded={menu.menuOpen}
					onclick={() => (menu.menuOpen = true)}
				>
					<Icons icon="menu" aria-hidden="true" />
				</Button>
			</div>
			<div class="switch">
				<ThemeSwitcher />
			</div>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		position: sticky;
		top: 0;
		width: 100%;
		height: var(--pl-header-height);
		align-items: center;
		justify-content: center;
		background-color: hsl(var(--pl-accent-5));
		z-index: 5;
		padding-block: var(--pl-header-padding);
		transition-property: border-color, transform;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;
		border-bottom: 2px solid transparent;

		&:is(.border) {
			border-bottom-color: hsl(var(--pl-accent-95));
		}

		&:is(.invisible) {
			transform: translateY(-4rem);
		}

		& > .wrapper {
			display: flex;
			position: relative;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			& > .nav {
				display: none;

				@media (min-width: 1024px) {
					display: flex;
					flex-direction: row;
					column-gap: var(--space-4);
				}
			}

			& > .buttons {
				display: flex;
				flex-direction: row;
				column-gap: var(--space-2);

				& > .menu {
					display: block;

					@media (min-width: 1024px) {
						display: none;
					}
				}

				& > .switch {
					display: none;

					@media (min-width: 1024px) {
						display: block;
					}
				}
			}
		}
	}

	.logo {
		font-size: clamp(1.25rem, calc(0.5rem + 2vw), 1.8rem);
		font-weight: 600;
		color: color-mix(in srgb, hsl(var(--pl-picton)), black 25%);
	}

	:global([data-theme='dark']) .logo {
		color: hsl(var(--pl-picton));
	}
</style>
