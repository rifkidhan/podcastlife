<script lang="ts">
	export let title: string | undefined = undefined;
	export let description = 'podcastlife is a podcast web apps.';

	const template = 'podcastlife';
</script>

<svelte:head>
	<title>{title ? title + ' | ' : ''}{template}</title>
	<meta name="description" content={description} />
</svelte:head>
