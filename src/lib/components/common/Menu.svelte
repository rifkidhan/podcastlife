<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import { Menu, X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { page } from '$app/stores';

	const {
		elements: { trigger, content, close, portalled, overlay },
		states: { open }
	} = createDialog();

	const menuItem = [
		{
			href: '/',
			screen: 'Home'
		},
		{
			href: '/categories',
			screen: 'Categories'
		},
		{
			href: '/live',
			screen: 'Live Now'
		},
		{
			href: '/about',
			screen: 'About'
		}
	];
</script>

<button class="btn btn-square btn-picton" {...$trigger} use:trigger title="Open Menu">
	<Menu />
</button>
<div {...$portalled} use:portalled>
	{#if $open}
		<div
			{...$overlay}
			use:overlay
			class="fixed inset-0 z-[102] bg-black/50 backdrop-blur-sm"
			transition:fade={{ duration: 250 }}
		/>
		<div
			{...$content}
			use:content
			class="fixed right-0 top-0 z-[103] block h-full min-h-screen w-full overflow-y-auto overflow-x-hidden border-l-2 bg-accent-5 focus:outline-none md:max-w-lg lg:max-w-md"
			transition:fly={{
				x: 350,
				opacity: 1
			}}
		>
			<div
				class="absolute -right-[30%] top-[50%] z-0 block -rotate-90 align-bottom text-[180px] font-black uppercase tracking-tighter text-accent-20"
			>
				menu
			</div>
			<div class="container relative mx-auto flex flex-col items-center justify-center gap-10 py-5">
				<div class="flex w-full items-center justify-between">
					<div class="block text-xl font-semibold text-picton md:text-2xl lg:text-3xl">
						podcastlife
					</div>
					<div class="inline-flex items-center justify-between gap-2">
						<ThemeSwitcher />
						<button
							{...$close}
							use:close
							class="btn btn-square btn-primary text-picton"
							title="Close Menu"
						>
							<X />
						</button>
					</div>
				</div>
				<ul class="flex w-full flex-col gap-5 text-left">
					{#each menuItem as menu}
						<li
							class="text-2xl font-bold hover:underline lg:text-4xl"
							class:text-picton={$page.url.pathname === menu.href}
						>
							<a href={menu.href} {...$close} use:close>
								{menu.screen}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>
