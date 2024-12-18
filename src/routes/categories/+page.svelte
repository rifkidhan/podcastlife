<script lang="ts">
	import { Head } from "$lib/components";
	import { categories } from "$lib/utils/constants";
</script>

<Head title="All Categories" />
<main class="page">
	<section>
		<h1 class="text-display">Categories</h1>
	</section>

	<section class="categories">
		{#each categories as cat}
			<a href={`/categories/${cat.id}`} class="category">
				{cat.title}
			</a>
		{/each}
	</section>
</main>

<style>
	main {
		width: 90dvw;
		margin-inline: auto;
	}
	.categories {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;

		@media (min-width: 768px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 2rem;
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.category {
		height: 6rem;
		background-color: hsl(var(--pl-picton));
		border-radius: var(--pl-border-radius-md);
		padding: 1rem 0.75rem;
		color: hsl(var(--pl-black));
		font-weight: 600;
	}
</style>
