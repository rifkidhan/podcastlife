<script lang="ts">
	import { Image } from 'lucide-svelte';

	export let src: string;
	export let alt: string;

	let error = false;
	let loaded = false;
</script>

{#if error}
	<span class="inline-flex h-full w-full items-center justify-center bg-accent-20 text-accent-50">
		<Image class="h-8 w-8" />
	</span>
{:else}
	<img
		{src}
		{alt}
		loading="lazy"
		decoding="async"
		on:load={() => (loaded = true)}
		on:error={() => (error = true)}
		class:blur={!loaded}
		class:transition={true}
		{...$$restProps}
	/>
{/if}
