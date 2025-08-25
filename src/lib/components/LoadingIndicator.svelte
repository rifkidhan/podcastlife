<script lang="ts">
	import Icon from "./Icon.svelte";
</script>

<div class="loading-indicator">
	<Icon name="podcastlife" aria-hidden="true" stroke="none" />
</div>

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}

	.loading-indicator {
		display: block;
		position: fixed;
		bottom: 5rem;
		left: 5vw;
		inline-size: 2.5rem;
		block-size: 2.5rem;
		animation: bounce 1s infinite;
		z-index: var(--pl-loading-indicator-index);

		& > :global(svg) {
			inline-size: 100%;
			inline-size: 100%;
			fill: var(--pl-primary);
		}
	}
</style>
