<script lang="ts">
	import throttle from '$lib/utils/throttle';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { Button, Icons, useUI } from '$lib/components';

	let visible = $state(true);

	let scroll = $state(0);
	let lastScroll = $state(0);

	const handleScroll = throttle(() => {
		visible = (lastScroll > scroll && lastScroll - scroll > 70) || scroll < 500;
		lastScroll = scroll;
	}, 100);

	const menu = useUI();

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

<header inert={menu.menuOpen} class:border={scroll > 70 && visible} class:show={!visible}>
	<div class="wrapper container">
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
		top: 0px;
		width: 100%;
		height: var(--space-12);
		align-items: center;
		justify-content: center;
		background-color: var(--accent-5);
		z-index: 5;
		padding-block: var(--space-1);
		transition-property: border-color, transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;

		@media (min-width: 768px) {
			padding-block: var(--space-3);
		}

		@media (min-width: 1024px) {
			height: var(--space-16);
		}

		& > .wrapper {
			margin-inline: auto;
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
	.show {
		transform: translateY(-4rem);
	}
	.border {
		border-bottom: 2px solid currentColor;
	}

	.logo {
		font-size: var(--text-xl);
		font-weight: 600;
		color: color-mix(in srgb, var(--picton), black 20%);

		@media (min-width: 768px) {
			font-size: var(--text-2xl);
		}

		@media (min-width: 1024px) {
			font-size: var(--text-3xl);
		}
	}

	:global([data-theme='dark']) .logo {
		color: var(--picton);
	}
</style>
