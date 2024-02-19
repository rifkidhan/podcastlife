<script lang="ts">
	import { createSwitch, createSync } from '@melt-ui/svelte';
	import { spring } from 'svelte/motion';

	export let checked = false;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let name = 'switch';
	export let disabled = false;
	export let value = '';

	const {
		elements: { root, input },
		states,
		options
	} = createSwitch();

	const sync = createSync({ ...options, ...states });

	$: {
		options.name.update((update) => (update = name));
	}

	$: sync.disabled(disabled, (v) => (disabled = v));
	$: sync.value(value);
	$: sync.name(name);
	$: sync.defaultChecked(checked);
	$: sync.checked(checked, (v) => (checked = v));

	const thumb = spring(0);

	$: $thumb = checked ? 28 : 0;
</script>

<button
	{...$root}
	use:root
	class:primary={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	class:disabled
	on:click
	title={name}
>
	<span class="thumb">
		<slot />
	</span>
</button>
<input {...$input} use:input />

<style lang="postcss">
	button {
		@apply relative flex h-5 w-10 flex-col items-start justify-center rounded-full transition-colors md:h-[36px] md:w-16;
	}
	.primary {
		@apply bg-picton-60 text-picton-60 data-[state='unchecked']:bg-accent-40;
		&:hover {
			@apply bg-picton-70 data-[state='unchecked']:bg-accent-50;
		}
	}

	.secondary {
		@apply bg-cerise text-cerise data-[state='unchecked']:bg-accent-40;
		&:hover {
			@apply bg-cerise-70 data-[state='unchecked']:bg-accent-40;
		}
	}

	.thumb {
		@apply inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-5 transition dark:bg-accent-95 md:h-[36px] md:w-[36px];
	}

	:global([data-state='checked']) .thumb {
		@apply translate-x-5 md:translate-x-7;
	}

	.disabled,
	.disabled:hover,
	.disabled:focus {
		@apply cursor-not-allowed opacity-50;
	}
</style>
