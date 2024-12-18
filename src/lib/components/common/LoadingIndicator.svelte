<script lang="ts">
	import { Icon } from "$lib/components";
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
		height: 2.5rem;
		width: 2.5rem;
		animation: bounce 1s infinite;

		& > :global(svg) {
			width: 100%;
			height: 100%;
			fill: hsl(var(--pl-picton));
		}
	}
</style>
