<script lang="ts">
	import type { LayoutProps } from "./$types";
	import Carousel from "$lib/components/Carousel.svelte";
	import Card from "$lib/components/Card.svelte";
	import Image from "$lib/components/Image.svelte";

	let { children, data }: LayoutProps = $props();

	let trendings = $derived(data.trending);
</script>

<h1 class="text-display">{data.meta.title}</h1>

<section>
	<h2 class="text-lg">Trending on this week</h2>

	<Carousel>
		{#each trendings as item}
			<Card id={item.id} label={item.title} class="feed" url={`/podcast/${item.id}`}>
				{#snippet thumbnail()}
					<Image src={item.image} alt={item.title} blurdata={item.hash} full />
				{/snippet}
				<div class="author text-sm">{item.author}</div>
				<div class="title">{item.title}</div>
			</Card>
		{/each}
	</Carousel>
</section>

{@render children()}

<style>
	.author {
		text-transform: uppercase;
		color: var(--pl-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		font-weight: 700;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		min-block-size: 4ch;
		margin-block-end: calc(var(--pl-spacing) * 2);
	}
</style>
