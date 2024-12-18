<script lang="ts">
	import { page } from "$app/stores";
	import { Head } from "$lib/components";
</script>

<Head title={$page.error?.message} />
<main class="page">
	<h1 class="text-display">
		<span class="status">
			{$page.status}
		</span>
		<span class="message">
			{$page.error?.message}
		</span>
	</h1>
</main>

<style>
	main {
		width: 90vw;
		justify-content: center;
		margin-inline: auto;
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
		color: hsl(var(--pl-picton));
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
