<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { Carousel, Head } from '$lib/components/common';

	export let data: LayoutData;
</script>

<Head title={$page.params.name} />
<main>
	<section>
		<h1 class="text-2xl uppercase">
			{$page.params.name}
		</h1>
	</section>
	<section class="container relative mx-auto flex flex-col gap-5">
		<h2 class="text-dt-display-md font-semibold">Trending in {$page.params.name}</h2>
		<Carousel items={data.trending} />
	</section>
	<slot />
</main>
