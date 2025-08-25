<script lang="ts">
	import { CATEGORIES } from "$lib/utils/constants";
</script>

<h1 class="text-display font-lancip">Podcast</h1>
<section>
	<h2 class="text-lg font-lancip">Categories</h2>
	<ul class="categories">
		{#each CATEGORIES as cat}
			<li class="category">
				<a href={`/podcast/${cat.id}`}>
					{cat.title}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.categories {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: calc(var(--pl-spacing) * 8);

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.category {
		block-size: 6em;
		overflow: hidden;
		border: solid 1px;
		border-radius: var(--pl-radius);
		background-color: var(--pl-primary);
		box-shadow: var(--pl-shadow-drop);
		transform: translate(-5px);
		transition-property: transform, box-shadow;
		transition-timing-function: ease-in-out;
		transition-duration: 150ms;

		&:has(a:hover) {
			box-shadow: none;
			transform: translate(0);
		}

		a {
			padding: calc(var(--pl-spacing) * 2);
			display: flex;
			align-items: end;
			block-size: 100%;
			inline-size: 100%;
			font-weight: 600;
			color: var(--pl-black);
		}

		&:nth-child(2n + 2) {
			background-color: var(--pl-secondary);
		}
		&:nth-child(3n + 3) {
			background-color: var(--pl-tertiary);
		}
	}
</style>
