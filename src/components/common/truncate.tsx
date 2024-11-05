import Button from '$components/ui/button'
import { Show, createMemo, createSignal, onMount } from 'solid-js'
import type { JSXElement } from 'solid-js'
import s from './truncate.module.css'

interface TruncateProps {
	truncate?: number
	children: JSXElement
}

export default function Truncate(props: TruncateProps) {
	const [open, setOpen] = createSignal(false)
	const [scrollHeight, setScrollHeight] = createSignal(1000)
	const [parentHeight, setParentHeight] = createSignal(0)

	let rootElement!: HTMLDivElement
	let element!: HTMLDivElement

	onMount(() => {
		setScrollHeight(element.scrollHeight)
		setParentHeight(rootElement.getBoundingClientRect().height)
	})

	const isTruncate = createMemo(() => {
		if (parentHeight() === 0) return false

		return scrollHeight() > parentHeight()
	})

	return (
		<div
			ref={rootElement}
			class={s.root}
			style={{ '--pl-description-truncate': props.truncate ?? 3 }}
		>
			<div
				ref={element}
				data-open-more={open()}
				class={s.truncate}
				classList={{ [s.mask]: isTruncate() }}
			>
				{props.children}
			</div>
			<Show when={isTruncate()}>
				<Button type="button" variant="text" size="full" onClick={() => setOpen(!open())}>
					{open() ? 'Show Less' : 'Show More'}
				</Button>
			</Show>
		</div>
	)
}
