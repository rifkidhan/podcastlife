<script lang="ts">
	import { Image, Icon } from "$lib/components";
	import { fade } from "svelte/transition";

	interface CardProps {
		id: string;
		image: string;
		title: string;
		author: string;
		loading?: boolean;
		explicit?: boolean;
		blurhash?: string;
	}

	let { id, image, title, author, loading, blurhash, explicit }: CardProps = $props();
</script>

{#snippet isLoading()}
	<span class="pulse-img" transition:fade></span>
{/snippet}

<li class={["card", { skeleton: loading }]}>
	<a href={`/podcast/${id}`} aria-label={title + " by " + author} draggable="true">
		<div class="thumbnail">
			{#if loading}
				{@render isLoading()}
			{:else}
				<Image src={image} alt={title} blurdata={blurhash} full />
			{/if}
		</div>
		<div class="content">
			<div class="author text-sm">{author}</div>
			<h3 class="title">
				{#if explicit}
					<span>
						<Icon name="explicit" aria-hidden="true" size={18} stroke="none" class="explicit" />
					</span>
				{/if}
				{title}
			</h3>
		</div>
	</a>
</li>

<style>
	.card {
		display: flex;
		position: relative;
		flex-direction: column;
		border-radius: var(--pl-border-radius-md);
		overflow: hidden;
		border: 2px solid hsl(var(--pl-accent-95));
		transition-property: box-shadow, transform;
		transition-duration: 150ms;
		transition-timing-function: ease-in-out;
		user-select: none;

		&:hover {
			transform: translate(-0.25rem, -0.25rem);
			box-shadow: var(--pl-shadow-drop);
		}

		& > a {
			position: relative;
		}
	}

	.thumbnail {
		display: block;
		position: relative;
		overflow: hidden;
		aspect-ratio: 1 / 1;
		border-bottom: 2px solid hsl(var(--pl-accent-95));
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-block: 1rem;
		padding-inline: 0.75rem;
	}
	.author {
		text-transform: uppercase;
		color: hsl(var(--pl-picton));
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
	}

	.skeleton {
		animation: var(--pl-animation-pulse);
	}

	.pulse-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		aspect-ratio: 1 / 1;
		background-color: hsl(var(--pl-accent-50));
		position: absolute;
		inset: 0;
	}
</style>
