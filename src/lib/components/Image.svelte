<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";
	import { blurhashToCssGradientString } from "@unpic/placeholder";

	interface ImgProps extends Omit<HTMLImgAttributes, "decoding" | "loading" | "fetchpriority"> {
		full?: boolean;
		blurdata?: string;
		priority?: boolean;
	}

	const imageOff =
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZDM2MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==";

	let {
		src,
		alt,
		priority = false,
		blurdata,
		full,
		class: className,
		...attrs
	}: ImgProps = $props();

	let error = $state(false);

	let imgSrc = $derived.by(() => {
		let imgSrc = src;

		if (error) {
			imgSrc = imageOff;
		}

		return imgSrc;
	});

	let blur = $derived(
		blurdata && !error
			? blurhashToCssGradientString(blurdata, 4, 4)
			: "linear-gradient(to bottom, var(--pl-accent-2) 20%, var(--pl-accent-2) 100%)"
	);
</script>

<img
	loading={priority ? "eager" : "lazy"}
	decoding="async"
	fetchpriority={priority ? "high" : "auto"}
	src={imgSrc}
	{alt}
	onerror={() => (error = true)}
	class={[className, { full }]}
	style:background-image={blur}
	style:background-size="cover"
	style:background-repeat="no-repeat"
	{...attrs}
/>
