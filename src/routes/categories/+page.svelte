<script lang="ts">
	import type { PageData } from './$types';
	import { Head } from '$lib/components/common';

	export let data: PageData;
</script>

<Head title="Categories" />

<main class="container mx-auto">
	<ul class="grid w-full grid-cols-6 gap-5">
		{#each data.categories as cat}
			<li class="capitalize">
				<a href="/categories/{cat.id}">
					{cat.title}
				</a>
			</li>
		{/each}
	</ul>
</main>
