<script lang="ts">
	import type { Snippet } from "svelte";
	import { MediaQuery } from "svelte/reactivity";
	import Image from "./Image.svelte";
	import RunningText from "./RunningText.svelte";
	import Modal from "./Modal.svelte";
	import Icon from "./Icon.svelte";

	interface InfoProps {
		img?: string;
		img_hash?: string;
		title?: string;
		author?: string;
		author_link?: string;
		description?: string;
		explicit?: boolean;
		misc?: Snippet;
		action?: Snippet;
	}

	let {
		img,
		img_hash,
		title = "Untitled",
		description = "No description",
		author,
		author_link,
		misc,
		action,
		explicit
	}: InfoProps = $props();

	let fullDescription: Modal | undefined = $state();

	let descriptionHeight = $state(0);
	let summary: HTMLElement | undefined = $state();

	let descriptionTruncate = $derived.by(() => {
		if (!summary) return false;

		return summary.scrollHeight > descriptionHeight;
	});

	const smallScreen = new MediaQuery("max-width: 1024px");
</script>

<div class="info">
	<div class="thumbnail">
		<Image src={img} alt={title} blurdata={img_hash} full priority />
	</div>
	<div class="header">
		<div class="title">
			<div class="author text-md">
				{#if author_link}
					<a href={author_link}>
						{#if explicit}
							<span>
								<Icon
									name="explicit"
									stroke="none"
									aria-label="explicit content"
									class="explicit"
								/>
							</span>
						{/if}
						<span>{author}</span>
					</a>
				{:else}
					{#if explicit}
						<Icon name="explicit" stroke="none" aria-label="explicit content" class="explicit" />
					{/if}
					{author}
				{/if}
			</div>
			<h1 class="text-xl font-lancip">
				<RunningText textAlign={smallScreen.current ? "center" : "left"}>
					{title}
				</RunningText>
			</h1>
		</div>
		{#if misc}
			<div class="misc list-with-dot text-sm">
				{@render misc()}
			</div>
		{/if}
	</div>
	<div class="description" bind:clientHeight={descriptionHeight}>
		<div class="summary" bind:this={summary} data-truncate={descriptionTruncate}>
			{@html description}
		</div>

		{#if descriptionTruncate}
			<button type="button" class="description-modal-button" onclick={fullDescription?.openModal}
				>show more</button
			>
			<Modal bind:this={fullDescription} {title}>
				{@html description}
			</Modal>
		{/if}
	</div>
	{#if action}
		<div class="action">
			{@render action()}
		</div>
	{/if}
</div>

<style>
	.info {
		display: grid;
		grid-template-areas:
			"thumbnail"
			"title"
			"action"
			"description";
		gap: 1rem;
		grid-template-columns: minmax(0, 1fr);
		justify-items: center;
		inline-size: 92dvw;
		margin-inline: auto;
		margin-block: 2rem;

		@media (min-width: 1024px) {
			grid-template-areas:
				"thumbnail title title"
				"thumbnail description description"
				"thumbnail action .";
			grid-template-columns: auto 1fr auto;
			grid-template-rows: 1fr auto auto;
			justify-items: start;
			gap: 2rem;
		}
	}

	.thumbnail {
		grid-area: thumbnail;
		display: block;
		position: relative;
		overflow: hidden;
		aspect-ratio: 1;
		border-radius: var(--pl-radius-md);
		width: 300px;
		border: solid 1px;
		box-shadow: var(--pl-shadow-drop);
	}

	.header {
		grid-area: title;
		align-self: self-start;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		align-items: flex-start;

		& > .title {
			inline-size: 100%;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			align-items: center;

			@media (min-width: 1024px) {
				border-left: 4px solid var(--pl-primary);
				padding-left: 1rem;
				align-items: flex-start;
			}

			& > h1 {
				inline-size: 100%;
			}

			& > .text-md {
				text-transform: uppercase;
				color: var(--pl-primary);
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				line-clamp: 2;
			}
		}
	}

	.author a:hover span {
		color: var(--pl-accent-6);
		box-shadow: var(--pl-shadow-highlight);
	}

	.misc {
		display: inline-flex;
		text-transform: capitalize;
		font-weight: 500;
		color: color-mix(in oklab, var(--pl-accent-6), white 20%);
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		@media (max-width: 1024px) {
			margin-inline: auto;
		}
	}

	.description {
		grid-area: description;
		align-self: flex-start;
		display: block;
		position: relative;
		inline-size: 100%;
		max-block-size: 6em;

		.summary {
			color: color-mix(in oklab, var(--pl-accent-6), white 20%);
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			inline-size: calc(100% - 2em);

			&[data-truncate="true"] {
				mask-image:
					linear-gradient(0deg, transparent 0, transparent 1lh, black 1lh),
					linear-gradient(279deg, transparent 0, transparent 5em, black);
			}
		}

		.description-modal-button {
			color: var(--pl-primary);
			position: absolute;
			bottom: 0;
			right: 2ch;
			background-color: var(--pl-accent-1);
		}
	}

	.action {
		grid-area: action;
		display: flex;
		flex-direction: row;
		gap: 3rem;
		align-items: center;
	}
</style>
