<script lang="ts">
	const categories = [
		'arts',
		'business',
		'comedy',
		'education',
		'fiction',
		'history',
		'health-fitness',
		'kids-family',
		'leisure',
		'music',
		'news',
		'politics',
		'science',
		'society-culture',
		'sports',
		'technology',
		'true-crime',
		'tv-film'
	];
</script>

<main class="container mx-auto">
	<ul class="grid w-full grid-cols-6 gap-5">
		{#each categories as cat}
			<li class="capitalize">
				<a href="/categories/{cat}">
					{cat}
				</a>
			</li>
		{/each}
	</ul>
</main>
