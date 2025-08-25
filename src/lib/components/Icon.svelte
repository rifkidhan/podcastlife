<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	import { ICONS } from "./icons";

	interface IconProps extends Omit<SVGAttributes<SVGElement>, "height" | "width"> {
		name: keyof typeof ICONS;
		size?: number;
		isHidden?: boolean;
	}

	let {
		name,
		stroke = "currentColor",
		fill = "none",
		size = 24,
		isHidden,
		...attrs
	}: IconProps = $props();
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
	aria-hidden={isHidden}
	{...attrs}
>
	{@html ICONS[name]}
</svg>
