<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { useUI } from '$lib/components';

	interface MainProps extends HTMLAttributes<HTMLElement> {
		children: Snippet;
	}

	const menu = useUI();

	let { children, ...props }: MainProps = $props();
</script>

<main inert={menu.menuOpen} {...props}>
	{@render children()}
</main>
