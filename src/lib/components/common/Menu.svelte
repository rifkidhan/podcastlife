<script lang="ts">
	import { createCollapsible } from '@melt-ui/svelte';
	import { Menu, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { page } from '$app/stores';
	import { Modal } from '$lib/components/base';
	import { categories } from '$lib/utils/constants';

	let open = false;

	const {
		elements: { root: collapseRoot, content: collapseContent, trigger: collapseTrigger },
		states: { open: collapseOpen }
	} = createCollapsible({
		forceVisible: true
	});

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

	let years = new Date().getFullYear();
</script>

<button
	class="btn btn-square btn-picton"
	aria-haspopup="dialog"
	aria-expanded={open}
	title="Open Menu"
	on:click={() => (open = true)}
>
	<Menu />
</button>
<Modal
	{open}
	on:close={() => (open = false)}
	overlay
	portalElement="aside"
	let:actions={action}
	let:contents={content}
>
	<div
		{...content.content}
		use:action.content
		class="fixed right-0 top-0 z-[102] block h-full min-h-screen w-full overflow-y-auto overflow-x-hidden bg-accent-5 focus:outline-none md:max-w-lg md:border-l-2 lg:max-w-md"
		transition:fly={{
			x: 350,
			opacity: 1
		}}
	>
		<div
			{...content.title}
			use:action.title
			class="absolute -right-[30%] top-[50%] block -rotate-90 align-bottom text-[180px] font-black uppercase tracking-tighter text-accent-20"
		>
			Menu
		</div>
		<span {...content.description} use:action.description class="sr-only"> Menu Navigation </span>
		<div
			class="container relative mx-auto flex h-dvh flex-col items-center justify-between gap-10 py-5"
		>
			<div class="flex w-full items-center justify-between">
				<div class="block text-xl font-semibold text-picton md:text-2xl lg:text-3xl">
					podcastlife
				</div>
				<div class="inline-flex items-center justify-between gap-2">
					<ThemeSwitcher />
					<button
						{...content.close}
						use:action.close
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
						<a href={menu.href} {...content.close} use:action.close>
							{menu.screen}
						</a>
					</li>
				{/each}
			</ul>
			<div class="inline-flex w-full flex-row gap-x-2">
				<span>
					{years},
				</span>
				<span>Podcastlife</span>
				<span> by </span>
				<a href="https://rifkidhan.my.id" target="_blank" rel="noopener noreferrer"> Rifkidhan </a>
			</div>
		</div>
		<div class="absolute bottom-0 block w-full"></div>
	</div>
</Modal>
