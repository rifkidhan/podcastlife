<script lang="ts">
	import { Main, Head } from '$lib/components';
	import { categories } from '$lib/utils/constants';
</script>

<Head title="Categories" />
<Main>
	<section class="container full">
		<h1 class="text-display">Categories</h1>
	</section>
	<section class="container full list">
		{#each categories as cat}
			<div class="listitem">
				<a href="/categories/{cat.id}">
					{cat.title}
				</a>
			</div>
		{/each}
	</section>
</Main>

<style>
	.list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-5);

		@media (min-width: 768px) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: var(--space-10);
		}

		& > .listitem {
			display: block;
			position: relative;
			width: 100%;
			height: var(--space-20);

			& > a {
				width: 100%;
				height: 100%;
				background-color: var(--picton);
				display: flex;
				text-transform: capitalize;
				color: var(--black);
				padding-block: var(--space-2);
				padding-inline: var(--space-3);
				align-items: center;
				font-size: clamp(var(--text-sm), 0.5rem + 2vw, var(--text-lg));
				line-height: 1.2;
				font-weight: 600;
			}
		}
	}
</style>
