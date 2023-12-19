<script lang="ts">
	import Menu from './Menu.svelte';
	import throttle from '$lib/utils/throttle';

	let visible = true;

	let scroll = 0;
	let lastScroll = 0;

	const handleScroll = throttle(() => {
		visible = (lastScroll > scroll && lastScroll - scroll > 70) || scroll < 500;
		lastScroll = scroll;
	}, 100);
</script>

<svelte:window bind:scrollY={scroll} on:scroll={handleScroll} />

<nav
	class="sticky top-0 z-[100] flex h-12 w-full items-center justify-center bg-accent-5 py-1 transition md:py-3 lg:h-16"
	class:border-b-2={scroll > 70 && visible}
	class:-translate-y-16={!visible}
>
	<div class="container relative mx-auto flex flex-row items-center justify-between">
		<div>
			<a
				href="/"
				class="text-xl font-semibold text-picton-60 dark:text-picton md:text-2xl lg:text-3xl"
			>
				podcastlife
			</a>
		</div>
		<div class="flex flex-row">
			<Menu />
		</div>
	</div>
</nav>
