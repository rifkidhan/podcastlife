<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { themes } from '$lib/stores/theme';
	import { Switch } from '$lib/components/base';
	import { Sun, Moon } from 'lucide-svelte';

	function toggle() {
		const upcoming_theme = $themes.current === 'light' ? 'dark' : 'light';

		if (
			upcoming_theme ===
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		) {
			// Switch the preference to `system`
			$themes.preference = 'system';
		} else {
			// Switch the preference to `light` or `dark`
			$themes.preference = upcoming_theme;
		}

		$themes.current = upcoming_theme;
	}

	const callback = (e: MediaQueryListEvent) =>
		themes.set({ preference: $themes.preference, current: e.matches ? 'dark' : 'light' });

	let mediaQuery: MediaQueryList;

	$: if (browser) {
		mediaQuery?.removeEventListener('change', callback);

		if ($themes.preference === 'system') {
			mediaQuery = window.matchMedia('(prefer-color-scheme: dark)');
			mediaQuery.addEventListener('change', callback);
		}
	}

	onDestroy(() => {
		return mediaQuery?.removeEventListener('change', callback);
	});
</script>

<Switch
	name="Theme Switcher"
	value={$themes.current}
	checked={$themes.current === 'dark'}
	on:click={toggle}
>
	{#if $themes.current === 'dark'}
		<Moon class="size-[16px] md:size-[22px]" />
	{:else}
		<Sun class="size-[16px] md:size-[22px]" />
	{/if}
</Switch>
