<script lang="ts">
	import { player } from '$lib/stores/nowplaying';
	const years = new Date().getFullYear();
</script>

<footer
	class="relative w-full border-t-2 bg-accent-5 py-4 text-accent-95"
	class:mb-20={$player.open}
>
	<div class="container mx-auto flex flex-col gap-5">
		<div class="">Semua Text</div>
		<span class="h-[1px] w-full bg-accent-95" />
		<div class="flex flex-row gap-x-2">
			<span>
				{years}
			</span>
			<span>Podcastlife</span>
		</div>
	</div>
</footer>
