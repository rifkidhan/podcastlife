<script lang="ts">
	import type { PageProps } from "./$types";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import Card from "$lib/components/Card.svelte";
	import Image from "$lib/components/Image.svelte";
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { getTime } from "$lib/utils/time";

	let { data, params }: PageProps = $props();

	let paginate = $derived.by(() => {
		const pageNow = page.url.searchParams.get("page");
		if (typeof pageNow === "string") {
			return Number(pageNow);
		}
		return 1;
	});
</script>

{#key paginate}
	<section>
		{#await data.category}
			{#each { length: 30 }, _}
				<ul class="categories">
					<li class="skeleton"></li>
				</ul>
			{/each}
		{:then { data, meta }}
			<ul class="categories">
				{#each data as item (item.id)}
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
			</ul>
			<div class="page-control">
				<Button
					variant="theme"
					title="Previous page"
					onclick={() => {
						const base = `/podcast/${params.cat}`;
						const search = new URLSearchParams();

						if (paginate > 1) {
							search.set("page", `${paginate - 1}`);
							search.set("c", meta.page.cursor);
							search.set("back", "true");
						}

						const url = base + `${paginate > 2 ? "?" + search.toString() : ""}`;

						goto(url);
					}}
					disabled={paginate <= 1}
				>
					<Icon name="chevron-left" isHidden />
					<span>Prev</span>
				</Button>
				<Button
					variant="theme"
					title="Next page"
					onclick={() => {
						const base = `/podcast/${params.cat}`;
						const search = new URLSearchParams();
						if (meta.page.more) {
							search.set("page", `${paginate + 1}`);
							search.set("c", meta.page.cursor);
						}
						const url = base + `${meta.page.more ? "?" + search.toString() : ""}`;
						goto(url);
					}}
					disabled={!meta.page.more}
				>
					<Icon name="chevron-right" isHidden />
					<span>Next</span>
				</Button>
			</div>
		{/await}
	</section>
{/key}

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

	@keyframes pulse {
		50% {
			opacity: 0.5;
		}
	}
	.skeleton {
		display: block;
		border-radius: var(--pl-radius);
		height: 7rem;
		background-color: var(--pl-accent-3);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
