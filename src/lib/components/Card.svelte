<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLLiAttributes } from "svelte/elements";

	interface CardProps extends HTMLLiAttributes {
		url?: string;
		action?: Snippet;
		thumbnail?: Snippet;
		label?: string;
	}

	let { url, id, action, label, thumbnail, class: className, ...attrs }: CardProps = $props();
</script>

<li {id} title={label} aria-label={label} class="container" {...attrs}>
	<div class={["card", className]}>
		{#if url}
			<a href={url} aria-labelledby={id} draggable="true"></a>
		{/if}
		{#if thumbnail}
			<div class="thumbnail">
				{@render thumbnail()}
			</div>
		{/if}
		<div class="content">
			{@render attrs.children?.()}
		</div>
		{#if action}
			<div class="action">
				{@render action()}
			</div>
		{/if}
	</div>
</li>

<style>
	.container {
		container: card / inline-size;
		display: block;
		inline-size: 100%;
	}

	.card {
		display: grid;
		position: relative;
		border-radius: var(--pl-radius);
		overflow: hidden;
		border: solid 1px;
		inline-size: 100%;
		gap: calc(var(--pl-spacing) * 2);
		grid-template-columns: minmax(0, 1fr);

		@container card (width >= 250px) {
			padding: 0.5rem;
			grid-template-columns: auto minmax(0, 1fr) auto;
			align-items: center;
		}

		@container card (width >= 460px) {
			padding: 1rem;
			gap: 1rem;
		}

		a {
			block-size: 100%;
			inline-size: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}
	}

	.thumbnail {
		display: block;
		position: relative;
		overflow: hidden;
		aspect-ratio: 1 / 1;
		border: solid 1px;
		inline-size: 100cqi;

		@container card (width > 250px) and (width <= 768px) {
			border-radius: var(--pl-radius);
			inline-size: 12cqi;
			block-size: 12cqi;
		}

		@container card (width >= 768px) {
			border-radius: var(--pl-radius);
			inline-size: 8cqi;
			block-size: 8cqi;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		inline-size: 100%;
		@container card (width <= 250px) {
			padding-inline: 0.75rem;
		}
	}

	.action {
		display: flex;
		inline-size: 100%;
	}
</style>
