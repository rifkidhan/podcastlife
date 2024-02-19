<script lang="ts">
	import { createPagination } from '@melt-ui/svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let total: number;
	export let limit: number;
	export let target: number | undefined = undefined;

	const dispatch = createEventDispatcher<{ pagenow: { start: number; end: number } }>();

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { range, pages }
	} = createPagination({
		count: total,
		perPage: limit,
		defaultPage: 1,
		siblingCount: 1
	});

	const gotoTopList = () => {
		if (target) {
			window.scrollTo({
				top: target,
				behavior: 'smooth'
			});
		}
	};

	$: dispatch('pagenow', {
		start: $range.start,
		end: $range.end
	});
</script>

<div class="flex w-full flex-col items-center" aria-label="pagination" {...$root} use:root>
	<div class="flex flex-row flex-wrap items-center justify-center gap-1 lg:gap-3">
		<button
			class="btn btn-primary btn-square disabled:btn-disabled size-12 data-[selected]:bg-accent-95 data-[selected]:text-accent-5"
			{...$prevButton}
			use:prevButton
			on:click={() => {
				if (target) {
					gotoTopList();
				}
			}}
		>
			<ChevronLeft />
		</button>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<span>...</span>
			{:else}
				<button
					class="btn btn-primary btn-square disabled:btn-disabled size-12 data-[selected]:bg-accent-95 data-[selected]:text-accent-5"
					{...$pageTrigger(page)}
					use:pageTrigger
					on:click={() => {
						if (target) {
							gotoTopList();
						}
					}}
				>
					{page.value}
				</button>
			{/if}
		{/each}
		<button
			class="btn btn-primary btn-square disabled:btn-disabled size-12 data-[selected]:bg-accent-95 data-[selected]:text-accent-5"
			{...$nextButton}
			use:nextButton
			on:click={() => {
				if (target) {
					gotoTopList();
				}
			}}
		>
			<ChevronRight />
		</button>
	</div>
</div>
