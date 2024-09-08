<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { useUI } from '$lib/components';

	interface MainProps extends HTMLAttributes<HTMLElement> {
		children: Snippet;
	}

	let uiState = $derived(useUI().menuOpen || useUI().playerModal);

	let { children, ...props }: MainProps = $props();
</script>

<main inert={uiState} {...props}>
	{@render children()}
</main>
