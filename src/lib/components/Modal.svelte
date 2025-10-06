<script lang="ts">
	import type { HTMLDialogAttributes } from "svelte/elements";
	import Button from "./Button.svelte";
	import Icon from "./Icon.svelte";

	interface ModalProps extends HTMLDialogAttributes {
		title?: string;
	}

	let { title, children, ...attrs }: ModalProps = $props();

	const uid = $props.id();

	let modal = $state() as HTMLDialogElement;

	let open = $state(false);

	export const openModal = () => {
		modal.showModal();
		open = true;
	};
</script>

<dialog
	bind:this={modal}
	closedby="any"
	aria-labelledby={`${uid}-title`}
	aria-hidden={!open}
	{...attrs}
>
	<div class="wrapper">
		<div class="top">
			<div id={`${uid}-title`} class="title text-md font-lancip">
				{title}
			</div>
			<div class="action">
				<Button
					size="square"
					title="Close"
					onclick={() => {
						modal.close();
						open = false;
					}}
				>
					<Icon name="close" isHidden />
					<span class="sr-only">Close modal</span>
				</Button>
			</div>
		</div>
		<hr />
		<div class="content">
			{@render children?.()}
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-inline-size: 90dvw;
		max-block-size: 90dvh;
		margin: auto;
		overflow: hidden;

		opacity: 0;
		transform: translateY(-100%);
		transition:
			opacity 500ms ease-in-out,
			transform 500ms ease-in-out,
			overlay 500ms ease-in-out allow-discrete,
			display 500ms ease-in-out allow-discrete;

		&::backdrop {
			background-color: transparent;
			transition:
				display 500ms ease-in-out allow-discrete,
				overlay 500ms ease-in-out allow-discrete,
				background-color 500ms ease-in-out;
		}

		&:open {
			opacity: 1;
			transform: translateY(0);

			&::backdrop {
				background-color: color-mix(in oklab, var(--pl-black) 50%, transparent);
			}
		}
	}

	@starting-style {
		dialog:open {
			opacity: 0;
			transform: translateY(-100%);
		}
	}
	@starting-style {
		dialog:open::backdrop {
			background-color: transparent;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		border-radius: var(--pl-radius-md);
		border: solid 1px;
		background-color: var(--pl-accent-1);
	}
	.top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--pl-spacing) * 4);

		.title {
			font-weight: 500;
		}

		.action {
			flex-shrink: 0;
		}
	}

	.content {
		display: block;
		position: relative;
		padding: calc(var(--pl-spacing) * 4);
		text-wrap: wrap;
		overflow-wrap: break-word;
		color: color-mix(in oklab, var(--pl-accent-6), white 20%);
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-gutter: stable;
		max-block-size: 80dvh;
	}
</style>
