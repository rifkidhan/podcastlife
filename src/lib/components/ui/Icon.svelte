<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	import { Icons } from "./Icons";

	interface IconProps extends SVGAttributes<SVGElement> {
		name: keyof typeof Icons;
		size?: number;
	}

	let { name, stroke = "currentColor", fill = "none", size = 24, ...attrs }: IconProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	{fill}
	{stroke}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...attrs}
>
	{@html Icons[name]}
</svg>
