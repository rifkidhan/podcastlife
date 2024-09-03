<script lang="ts">
	import { Main, Head } from '$lib/components';

	let test_life = $state('al');
</script>

<Head title="About Me" />
<Main>
	<section class="container">
		<h1 class="text-display">About Podcastlife</h1>
	</section>
	<section>
		<p>
			{test_life}
		</p>
		<select name="test" id="test" bind:value={test_life}>
			<option value="all">All Language</option>
			<option value="en">English</option>
			<option value="id">Indonesia</option>
		</select>
	</section>
</Main>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		margin-left: auto;
		margin-right: auto;

		& h1 {
			font-size: var(--text-3xl);
			font-weight: 600;
		}
	}
</style>
