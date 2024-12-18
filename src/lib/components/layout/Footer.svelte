<script lang="ts">
	import { SvelteDate } from "svelte/reactivity";

	let { inert }: { inert?: boolean } = $props();

	const years = new SvelteDate().getFullYear();
</script>

<footer {inert}>
	<div class="text-sm">
		<span>{years},</span>
		<span>&copy; Podcastlife.</span>
		<div>Created by Rifkidhan.</div>
	</div>
</footer>

<style>
	footer {
		padding-inline: 5vw;
		border-top: 2px solid hsl(var(--pl-accent-95));
		padding-block: var(--pl-header-padding);
	}
</style>
