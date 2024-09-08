<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import { useUI } from '$lib/components';

	let uiState = $derived(useUI().menuOpen || useUI().playerModal);

	const years = new SvelteDate().getFullYear();
</script>

<footer inert={uiState}>
	<div class="wrapper container">
		<div>Semua Text</div>
		<span class="line"></span>
		<div class="copy">
			<span>{years},</span>
			<span>&copy; Podcastlife.</span>
		</div>
	</div>
</footer>

<style>
	footer {
		position: relative;
		width: 100%;
		border-top: 2px solid hsl(var(--pl-accent-95));
		background-color: hsl(var(--pl-accent-5));
		padding-block: var(--space-4);

		& > .wrapper {
			display: flex;
			flex-direction: column;
			gap: var(--space-5);
			margin-inline: auto;

			& > .line {
				height: 1px;
				width: 100%;
				background-color: var(--accent-95);
			}
			& > .copy {
				display: flex;
				flex-direction: row;
				column-gap: var(--space-2);
			}
		}
	}
</style>
