<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1 class="inline-flex  flex-col gap-y-5">
		<span class="md:text-lg">
			{$page.error?.message}
		</span>
	</h1>
</main>
