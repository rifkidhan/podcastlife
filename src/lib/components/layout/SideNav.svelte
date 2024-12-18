<script lang="ts">
	import ThemeSwitcher from "./ThemeSwitcher.svelte";
	import { useUI, Button } from "$lib/components";
	import { fly, fade } from "svelte/transition";
	import { categories } from "$lib/utils/constants";

	const menuItems = [
		{
			href: "/",
			title: "Home"
		},
		{
			href: "/categories",
			title: "Categories"
		},
		{
			href: "/live",
			title: "Live Podcast"
		},
		{
			href: "/about",
			title: "About"
		}
	];

	const uiState = useUI();

	let sideNav: HTMLDivElement | undefined = $state();

	const lightDismiss = (e: MouseEvent) => {
		if (!sideNav) return;

		if (!sideNav.contains(e.target as Node)) {
			uiState.menuOpen = false;
		}
	};
</script>

<svelte:document onclickcapture={lightDismiss} />

<div
	id="side-menu-wrapper"
	data-sidenav-open={uiState.menuOpen}
	inert={!uiState.menuOpen || uiState.playerModal}
	class="drawer"
>
	{#if uiState.menuOpen}
		<div
			class="backdrop"
			tabindex="-1"
			aria-hidden="true"
			transition:fade={{ duration: 250 }}
			inert
		></div>
		<div
			id="side-navigation"
			bind:this={sideNav}
			transition:fly={{ x: 500, opacity: 1 }}
			class="side-nav"
		>
			<nav class="wrapper">
				<div class="top">
					<ThemeSwitcher />
					<Button
						type="button"
						variant="picton"
						aria-label="Close side navigation"
						onclick={() => (uiState.menuOpen = false)}
						icon="close"
					/>
				</div>
				<ul class="menu">
					{#snippet listitem({
						title,
						href,
						classAdd
					}: {
						title: string;
						href: string;
						classAdd?: boolean;
					})}
						<li class:sub-list={classAdd}>
							<a {href} onclick={() => (uiState.menuOpen = false)}>
								<span>
									{title}
								</span>
							</a>
						</li>
					{/snippet}

					{#each menuItems as menu}
						{#if menu.title === "Categories"}
							<li>
								<details>
									<summary>
										{menu.title}
										<span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												aria-hidden="true"
												class="detail"
											>
												<path d="M5 12h14" />
												<path class="rotate" d="M12 5v14" />
											</svg>
										</span>
									</summary>
									<ul class="sub">
										{@render listitem({ title: "All Categories", href: menu.href, classAdd: true })}
										{#each categories as cat}
											{@render listitem({
												title: cat.title,
												href: `${menu.href}/${cat.id}`,
												classAdd: true
											})}
										{/each}
									</ul>
								</details>
							</li>
						{:else}
							{@render listitem({ title: menu.title, href: menu.href })}
						{/if}
					{/each}
				</ul>
			</nav>
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
		inset: 0;
		backdrop-filter: blur(8px);
		background-color: hsla(var(--pl-black), 0.5);
	}
	.side-nav {
		position: fixed;
		right: 0;
		top: 0;
		height: 100dvh;
		width: var(--pl-nav-width);
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: hsl(var(--pl-accent-5));
		padding-block: var(--pl-header-padding);
		border-left: 4px solid hsl(var(--pl-picton));
		scrollbar-gutter: stable;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin-inline: auto;
		gap: 1rem;

		& > .top {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			gap: 0.5rem;
			width: 100%;
		}
	}

	.menu {
		display: flex;
		flex-direction: column;
		& > li {
			font-size: clamp(1.8rem, 0.75rem + 2vw, 3rem);
			font-weight: 700;
			line-height: 1.2;
			padding-block: min(1rem, calc(2vw + 0.5rem));
			border-bottom: 2px solid hsl(var(--pl-accent-95));
		}
	}

	a:hover span {
		box-shadow: var(--pl-shadow-highlight);
	}

	details {
		--pl-rotate-plus-sign: 0deg;

		summary {
			cursor: default;
			list-style-type: none;
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			cursor: pointer;
		}

		&[open] {
			--pl-rotate-plus-sign: 90deg;
		}
	}
	.sub {
		display: flex;
		flex-direction: column;
		padding-inline-start: 1rem;
		gap: calc(0.5rem - 4px);
		padding-block: 1rem;
	}

	.detail {
		width: 100%;
		height: 100%;

		& > .rotate {
			transition: transform 150ms ease-in-out;
			transform-origin: center;
			transform: rotateZ(var(--pl-rotate-plus-sign));
		}
	}

	.sub-list {
		font-size: 0.75em;
		line-height: 1.2;
		font-weight: 500;
	}
</style>
