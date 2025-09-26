<script lang="ts">
	import type { PageProps } from "./$types";
	import { SvelteURL } from "svelte/reactivity";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import Card from "$lib/components/Card.svelte";
	import Image from "$lib/components/Image.svelte";
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { getTime } from "$lib/utils/time";

	let { data, params }: PageProps = $props();

	let categories = $derived(data.category);
	let meta = $derived(data.info);

	let paginate = $derived.by(() => {
		const pageNow = page.url.searchParams.get("page");
		if (typeof pageNow === "string") {
			return Number(pageNow);
		}
		return 1;
	});

	const previousPage = () => {
		const base = `/podcast/${params.cat}`;
		const search = new URLSearchParams();

		if (paginate > 1) {
			search.set("page", `${paginate - 1}`);
			search.set("c", meta.cursor);
			search.set("back", "true");
		}

		const url = base + `${paginate > 2 ? "?" + search.toString() : ""}`;

		goto(url);
	};
	const nextPage = () => {
		const base = `/podcast/${params.cat}`;
		const search = new URLSearchParams();
		if (meta.more) {
			search.set("page", `${paginate + 1}`);
			search.set("c", meta.cursor);
		}
		const url = base + `${meta.more ? "?" + search.toString() : ""}`;
		goto(url);
	};
	$inspect(paginate);
</script>

<section>
	<ul class="categories">
		{#each categories as item (item.id)}
			<Card>
				{#snippet thumbnail()}
					<Image src={item.image} alt={item.title ?? "untitled"} blurdata={item.hash} full />
				{/snippet}
				<div class="time text-sm list-with-dot">
					{#if item.newestItemPubdate}
						<span>
							{getTime(item.newestItemPubdate)}
						</span>
					{/if}
				</div>
				<h3 class="cat-title font-lancip">
					<a href={`/podcast/${item.id}`}>
						<span>
							{#if item.explicit}
								<Icon
									name="explicit"
									stroke="none"
									aria-label="explicit content"
									class="explicit"
								/>
							{/if}
							{item.title}
						</span>
					</a>
				</h3>
				<div class="summary text-sm">
					{@html item.description}
				</div>
			</Card>
		{/each}
		<div class="page-control">
			<Button
				variant="theme"
				title="Previous page"
				onclick={() => previousPage()}
				disabled={paginate <= 1}
			>
				<Icon name="chevron-left" isHidden />
				<span>Prev</span>
			</Button>
			<Button variant="theme" title="Next page" onclick={() => nextPage()} disabled={!meta.more}>
				<Icon name="chevron-right" isHidden />
				<span>Next</span>
			</Button>
		</div>
	</ul>
</section>

<style>
	.categories {
		display: flex;
		flex-direction: column;
		gap: calc(var(--pl-spacing) * 8);
	}
	.cat-title {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		& > a:hover span {
			color: var(--pl-accent-6);
			box-shadow: var(--pl-shadow-highlight);
		}
	}

	.summary {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		color: var(--pl-accent-5);
		@media (max-width: 768px) {
			display: none;
		}
	}

	.page-control {
		display: flex;
		flex-direction: row;
		gap: calc(var(--pl-spacing) * 4);
		align-items: center;
		justify-content: center;
	}
</style>
