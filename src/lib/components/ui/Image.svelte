<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";

	interface ImgProps extends HTMLImgAttributes {
		src: string;
		alt: string;
		full?: boolean;
		blurdata?: string;
	}

	const imageOff =
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZDM2MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==";

	let {
		src,
		alt,
		width,
		height,
		decoding = "async",
		loading = "lazy",
		class: className,
		full,
		blurdata,
		...attrs
	}: ImgProps = $props();

	let error = $state(false);
	let loaded = $state(false);

	let imgSrc = $derived.by(() => {
		let imgSrc = src;

		if (error) {
			imgSrc = imageOff;
		}

		return imgSrc;
	});
</script>

<img
	{loading}
	{decoding}
	{width}
	{height}
	fetchpriority={loading === "eager" ? "high" : "auto"}
	src={imgSrc}
	{alt}
	onload={() => (loaded = true)}
	onerror={() => (error = true)}
	class={[className, { blur: !error && !loaded && !blurdata }, full]}
	style:background-image={blurdata
		? `url(data:image/png;base64,${blurdata})`
		: "linear-gradient(to bottom, hsl(var(--pl-accent-20)) 20%, hsl(var(--pl-accent-20)) 100%)"}
	style:background-size="cover"
	style:background-repeat="no-repeat"
	{...attrs}
/>
