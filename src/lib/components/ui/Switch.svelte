<script lang="ts">
	// import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface SwitchProps extends HTMLInputAttributes {
		checked: boolean;
	}

	let { checked = $bindable() }: SwitchProps = $props();
</script>

<input type="checkbox" bind:checked />
