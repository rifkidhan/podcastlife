<script lang="ts">
	import { Image } from 'lucide-svelte';

	export let src: string;
	export let alt: string;

	let error = false;
	let loaded = false;

	let imageSrc = src;
	$: if (src === '') {
		error = true;
	}
</script>

{#if error}
	<span class="inline-flex h-full w-full items-center justify-center bg-accent-20 text-accent-50">
		<Image class="h-8 w-8" />
	</span>
{:else}
	<img
		loading="lazy"
		decoding="async"
		src={imageSrc}
		{alt}
		on:load={() => (loaded = true)}
		on:error={() => (error = true)}
		class:blur={!loaded}
		class:bg-accent-20={true}
		class:transition={true}
		{...$$restProps}
	/>
{/if}
