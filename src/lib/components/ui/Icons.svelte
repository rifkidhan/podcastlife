<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	interface IconsProps extends SVGAttributes<SVGElement> {
		icon?:
			| 'chevron-left'
			| 'chevron-right'
			| 'chevron-up'
			| 'chevron-down'
			| 'image-off'
			| 'play'
			| 'pause'
			| 'menu'
			| 'close'
			| 'move-up'
			| 'explicit'
			| 'podcastlife';
	}

	let { icon = 'podcastlife', ...attrs }: IconsProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...attrs}
>
	{#if icon === 'chevron-left'}
		<path d="m15 18-6-6 6-6" />
	{:else if icon === 'chevron-right'}
		<path d="m9 18 6-6-6-6" />
	{:else if icon === 'chevron-up'}
		<path d="m18 15-6-6-6 6" />
	{:else if icon === 'chevron-down'}
		<path d="m6 9 6 6 6-6" />
	{:else if icon === 'image-off'}
		<line x1="2" x2="22" y1="2" y2="22" />
		<path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
		<line x1="13.5" x2="6" y1="13.5" y2="21" />
		<line x1="18" x2="21" y1="12" y2="15" />
		<path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
		<path d="M21 15V5a2 2 0 0 0-2-2H9" />
	{:else if icon === 'play'}
		<polygon points="6 3 20 12 6 21 6 3" />
	{:else if icon === 'pause'}
		<rect x="14" y="4" width="4" height="16" rx="1" />
		<rect x="6" y="4" width="4" height="16" rx="1" />
	{:else if icon === 'menu'}
		<line x1="4" x2="20" y1="12" y2="12" />
		<line x1="4" x2="20" y1="6" y2="6" />
		<line x1="4" x2="20" y1="18" y2="18" />
	{:else if icon === 'close'}
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	{:else if icon === 'move-up'}
		<path d="M8 6L12 2L16 6" />
		<path d="M12 2V22" />
	{:else if icon === 'explicit'}
		<path
			d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zm-4-4h-4v-2h4v-2h-4V9h4V7H9v10h6z"
		/>
	{:else}
		<circle cx="12" cy="12" r="12" fill="#006BAB" />
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z"
			fill="#FFF5F5"
		/>
	{/if}
</svg>
