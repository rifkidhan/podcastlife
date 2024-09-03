<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import { useUI } from '$lib/components';

	const menu = useUI();

	const years = new SvelteDate().getFullYear();
</script>

<footer inert={menu.menuOpen === true}>
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
		border-top: 2px solid currentColor;
		background-color: var(--accent-5);
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
