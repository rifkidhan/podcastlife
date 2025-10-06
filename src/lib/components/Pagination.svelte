<script lang="ts" generics="T">
	import type { Snippet } from "svelte";
	import Button from "./Button.svelte";
	import Icon from "./Icon.svelte";

	interface PaginationProps {
		data: T[];
		limit?: number;
		page: number;
		rootElement?: HTMLElement;
		children: Snippet<[T]>;
	}

	let { data, page = $bindable(1), limit = 30, rootElement, children }: PaginationProps = $props();

	let totalPage = $derived(Math.ceil(data.length / limit));

	let start = $derived((page - 1) * limit);
	let end = $derived(Math.min(start + limit, data.length));

	let showData = $derived(data.slice(start, end));

	const scrollToRoot = () => {
		if (!rootElement) return;
		rootElement.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const prevButton = () => {
		if (page <= 1) return;

		page--;
		scrollToRoot();
	};

	const nextButton = () => {
		if (page >= totalPage) return;

		page++;
		scrollToRoot();
	};
</script>

<ul class="pagination">
	{#each showData as item, i (i)}
		{@render children(item)}
	{/each}
</ul>

{#if data.length > limit}
	<div class="page-control">
		<Button variant="theme" title="Previous page" onclick={prevButton} disabled={page <= 1}>
			<Icon name="chevron-left" isHidden />
			<span>Prev</span>
		</Button>
		<div>
			<span>{page}</span>
			<span>/</span>
			<span>{totalPage}</span>
		</div>
		<Button variant="theme" title="Next page" onclick={nextButton} disabled={page >= totalPage}>
			<Icon name="chevron-right" isHidden />
			<span>Next</span>
		</Button>
	</div>
{/if}

<style>
	.pagination {
		display: flex;
		flex-direction: column;
		gap: calc(var(--pl-spacing) * 6);
	}

	.page-control {
		display: flex;
		flex-direction: row;
		gap: calc(var(--pl-spacing) * 4);
		align-items: center;
		justify-content: center;
	}
</style>
