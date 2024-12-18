<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";

	let { class: className }: SVGAttributes<SVGElement> = $props();
</script>

<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="38"
	height="38"
	viewBox="0 0 38 38"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	class={className}
>
	<g fill="none" fill-rule="evenodd">
		<g transform="translate(1 1)" stroke-width="2">
			<circle stroke-opacity=".5" cx="18" cy="18" r="18" />
			<path d="M36 18c0-9.94-8.06-18-18-18">
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 18 18"
					to="360 18 18"
					dur="1s"
					repeatCount="indefinite"
				/>
			</path>
		</g>
	</g>
</svg>

<style>
	svg {
		height: 100%;
		width: 100%;
		max-width: var(--space-9);

		@media (min-width: 768px) {
			max-width: var(--space-11);
		}
	}
</style>
