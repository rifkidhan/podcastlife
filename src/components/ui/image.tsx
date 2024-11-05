import { createSignal, splitProps, type ComponentProps } from 'solid-js'

interface ImageProps extends ComponentProps<'img'> {
	full?: boolean
	src: string
	alt: string
	blurdata?: string
}

export default function Image(props: ImageProps) {
	const [local, attrs] = splitProps(props, ['src', 'alt', 'loading', 'full', 'blurdata'])
	const [load, setLoad] = createSignal(false)

	const imageOff =
		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZDM2MzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg=='

	const backgroundImage = () =>
		local.blurdata
			? `url(data:image/png;base64,${local.blurdata})`
			: 'linear-gradient(to bottom, hsl(var(--pl-accent-20)) 20%, hsl(var(--pl-accent-20)) 100%)'

	let imageRef!: HTMLImageElement

	const imageLoad = () => {
		setLoad(true)
	}

	const imageError = () => {
		imageRef.src = imageOff
	}

	return (
		<img
			ref={imageRef}
			loading={local.loading ?? 'lazy'}
			decoding="async"
			width={attrs.width}
			height={attrs.height}
			fetchpriority={local.loading === 'eager' ? 'high' : 'auto'}
			src={local.src}
			alt={local.alt}
			class={attrs.class}
			classList={{ blur: !load() && !local.blurdata, full: local.full }}
			onload={imageLoad}
			onerror={imageError}
			style={{
				'background-image': backgroundImage(),
				'background-size': 'cover',
				'background-repeat': 'no-repeat'
			}}
		/>
	)
}
