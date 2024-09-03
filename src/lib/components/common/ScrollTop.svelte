<script lang="ts">
	import { browser } from '$app/environment';
	import { Button, Icons, useUI } from '$lib/components';

	let scroll = $state(0);

	const getPlayerOpen = useUI();

	let height = $derived.by(() => {
		if (getPlayerOpen.player) {
			return 5;
		}
		return 0;
	});

	const scrollToTop = () => {
		if (!browser) return;

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<svelte:window bind:scrollY={scroll} />
{#if scroll > 1000}
	<div class="scroll-button" style:--bottom={`${height}rem`}>
		<Button type="button" circle onclick={scrollToTop} title="Scroll to top button">
			<Icons icon="move-up" aria-hidden="true" />
		</Button>
	</div>
{/if}

<style>
	.scroll-button {
		position: fixed;
		bottom: calc(var(--space-10) + var(--bottom));
		right: var(--space-4);

		@media (min-width: 768px) {
			right: var(--space-8);
		}

		@media (min-width: 1024px) {
			right: var(--space-12);
		}
	}
</style>
