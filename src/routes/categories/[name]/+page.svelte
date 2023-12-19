<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: trending = data.trending;
	$: podcast = data.feeds;
	$: ({ name } = $page.params);

	// $: console.log(trending);
</script>

<main>
	<h1 class="text-3xl font-bold uppercase">
		{name}
	</h1>
</main>
