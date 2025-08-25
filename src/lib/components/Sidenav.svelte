<script lang="ts">
	import { fly, fade } from "svelte/transition";
	import { CATEGORIES } from "$lib/utils/constants";
	import { useUI } from "$lib/state/ui.svelte";
	import Button from "./Button.svelte";
	import ThemeSwitch from "./ThemeSwitch.svelte";
	import Icon from "./Icon.svelte";

	const NAVIGATIONS = [
		{
			href: "/",
			title: "Home"
		},
		{
			href: "/podcast",
			title: "Podcast"
		},
		{
			href: "/podcast",
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

	let sideNav: HTMLElement | undefined = $state();
</script>

<svelte:window
	onclickcapture={(e) => {
		if (!sideNav) return;

		if (!sideNav.contains(e.target as Node)) {
			useUI.menuOpen = false;
		}
	}}
	onkeydowncapture={(e) => {
		if (e.key === "Escape") {
			useUI.menuOpen = false;
		}
	}}
/>

<div class="drawer" role="dialog" inert={!useUI.menuOpen}>
	<div
		class="backdrop"
		tabindex="-1"
		aria-hidden="true"
		inert
		transition:fade|global={{ duration: 250 }}
	></div>
	<nav id="side-navigation" bind:this={sideNav} transition:fly|global={{ x: 500, opacity: 1 }}>
		<div class="top">
			<ThemeSwitch />
			<Button
				size="square"
				aria-controls="side-navigation"
				onclick={() => (useUI.menuOpen = false)}
			>
				<Icon name="close" isHidden />
				<span class="sr-only">close navigation</span>
			</Button>
		</div>
		<hr />
		<ul class="navigation">
			{#snippet listItem(href: string, title: string)}
				<li>
					<a {href} onclick={() => (useUI.menuOpen = false)}>
						<span>{title}</span>
					</a>
				</li>
			{/snippet}
			{#each NAVIGATIONS as nav}
				{#if nav.title === "Categories"}
					<li>
						<details>
							<summary>
								{nav.title}
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
										class="sign"
									>
										<path d="M5 12h14" />
										<path class="rotate" d="M12 5v14" />
									</svg>
								</span>
							</summary>
							<ul class="sub">
								{#each CATEGORIES as cat}
									{@render listItem(`${nav.href}/${cat.id}`, cat.title)}
								{/each}
							</ul>
						</details>
					</li>
				{:else}
					<li>
						{@render listItem(nav.href, nav.title)}
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</div>

<style>
	.drawer {
		z-index: var(--pl-sidenav-index);
		position: relative;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		backdrop-filter: blur(8px);
		background-color: var(--pl-black);
		opacity: 0.5;
	}

	#side-navigation {
		container: navigation / inline-size;
		display: flex;
		flex-direction: column;
		position: fixed;
		gap: calc(var(--pl-spacing) * 4);
		right: 0;
		top: 0;
		block-size: 100dvh;
		inline-size: var(--pl-nav-width);
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: var(--pl-accent-1);
		padding-block: var(--pl-header-padding);
		scrollbar-gutter: stable;
		scrollbar-width: thin;

		@media screen and (min-width: 768px) {
			border-left: 4px solid var(--pl-primary);
		}
	}

	a:hover span {
		box-shadow: var(--pl-shadow-highlight);
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-inline: auto;
		gap: calc(var(--pl-spacing) * 2);
		inline-size: 90cqw;
	}

	.navigation {
		display: flex;
		flex-direction: column;
		inline-size: 90cqw;
		margin-inline: auto;

		& > li {
			font-size: clamp(1.8rem, 0.75rem + 2vw, 3rem);
			font-weight: 600;
			line-height: 1.2;
			padding-block: min(1rem, calc(2vw + 0.5rem));
			border-bottom: 1px solid var(--pl-accent-6);
		}
	}

	.sub {
		display: flex;
		flex-direction: column;
		padding-inline-start: 1rem;
		gap: calc(0.5rem - 4px);
		padding-block: 1rem;

		& > li {
			font-size: 0.75em;
			line-height: 1.2;
			font-weight: 500;
		}
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

	.sign {
		width: 100%;
		height: 100%;

		& > .rotate {
			transition: transform 150ms ease-in-out;
			transform-origin: center;
			transform: rotateZ(var(--pl-rotate-plus-sign));
		}
	}
</style>
