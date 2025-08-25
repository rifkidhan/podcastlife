<script lang="ts">
	import { page } from "$app/state";
</script>

<div class="error">
	<h1 class="text-display">
		<span class="status">
			{page.status}
		</span>
		<span class="message font-lancip">
			{page.error?.message}
		</span>
	</h1>
</div>

<style>
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		inline-size: 100%;
		max-inline-size: 92dvw;
		margin-inline: auto;
		gap: 2rem;
	}

	h1 {
		width: max-content;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		@media (min-width: 768px) {
			width: min-content;
			flex-direction: row;
		}
	}

	.status {
		color: var(--pl-primary);
		font-size: 2.35em;
		top: 0;
	}

	.message {
		font-size: 0.75em;

		@media (min-width: 768px) {
			font-size: 1em;
		}
	}
</style>
