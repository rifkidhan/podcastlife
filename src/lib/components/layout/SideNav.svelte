<script lang="ts">
	import { Button, Icons, useUI } from '$lib/components';
	import ThemeSwitcher from '../common/ThemeSwitcher.svelte';
	import { fly, fade } from 'svelte/transition';
	import { categories } from '$lib/utils/constants';
	// import { page } from '$app/stores';

	const menuItems = [
		{
			href: '/',
			title: 'Home'
		},
		{
			href: '/categories',
			title: 'Categories'
		},
		{
			href: '/live',
			title: 'Live Podcast'
		},
		{
			href: '/about',
			title: 'About'
		}
	];

	const open = useUI();
</script>

<div
	id="side-menu-wrapper"
	data-sidenav-open={open.menuOpen}
	inert={!open.menuOpen || open.playerModal}
	class="drawer"
>
	{#if open.menuOpen}
		<div class="backdrop" aria-hidden="true" transition:fade={{ duration: 250 }}></div>
		<div id="side-menu" transition:fly={{ x: 350, opacity: 1 }} class="menu">
			<div class="wrapper container">
				<div class="top">
					<ThemeSwitcher />
					<Button
						type="button"
						id="close-menu-button"
						variant="picton"
						onclick={() => (open.menuOpen = false)}
					>
						<Icons icon="close" />
					</Button>
				</div>
				<nav>
					{#snippet list({ href, title, classes })}
						<li class:list-item={classes}>
							<a {href} onclick={() => (open.menuOpen = false)}>{title}</a>
						</li>
					{/snippet}
					<ul>
						{#each menuItems as menu}
							{#if menu.title === 'Categories'}
								<li>
									<details>
										<summary>
											{menu.title}
										</summary>
										<ul>
											{@render list({ href: menu.href, title: 'All Categories', classes: true })}

											{#each categories as item}
												{@render list({
													href: `/categories/${item.id}`,
													title: item.title,
													classes: true
												})}
											{/each}
										</ul>
									</details>
								</li>
							{:else}
								{@render list({ href: menu.href, title: menu.title })}
							{/if}
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	{/if}
</div>

<style>
	.drawer {
		z-index: 20;
		position: relative;
	}
	.backdrop {
		position: fixed;
		inset: 0px;
		backdrop-filter: blur(8px);
		background-color: hsla(var(--pl-black), 0.5);
	}
	.menu {
		position: fixed;
		right: 0;
		top: 0;
		height: 100dvh;
		width: var(--pl-nav-width);
		overflow-y: auto;
		overflow-x: hidden;
		background-color: hsl(var(--pl-accent-5));

		@media (min-width: 768px) {
			border-left: 4px solid hsl(var(--pl-picton));
		}

		@media (min-width: 1024px) {
			padding-inline: 2.5rem;
		}

		&:focus {
			outline: 2px solid transparent;
			outline-offset: 2px;
		}

		& > .wrapper {
			margin-inline: auto;
			display: flex;
			flex-direction: column;
			gap: var(--space-8);
			padding-block: var(--pl-header-padding);

			& .top {
				display: flex;
				flex-direction: row;
				column-gap: var(--space-3);
			}

			& nav ul {
				display: flex;
				flex-direction: column;
				row-gap: var(--space-8);
			}
		}
	}

	li {
		font-size: var(--text-2xl);
		font-weight: 700;

		@media (min-width: 768px) {
			font-size: var(--text-4xl);
		}

		:where(a:hover) {
			text-decoration: underline;
			text-decoration-color: hsl(var(--pl-picton));
		}
	}

	li :where(details) {
		& summary {
			cursor: pointer;
			list-style-type: none;
		}
		& ul {
			display: flex;
			flex-direction: col;
			row-gap: var(--space-2);
			margin-block: var(--space-4);
			margin-inline-start: var(--space-2);

			@media (min-width: 768px) {
				row-gap: var(--space-4);
				margin-inline-start: var(--space-4);
			}
		}
	}
	li:is(.list-item) {
		font-weight: 500;
	}
</style>
