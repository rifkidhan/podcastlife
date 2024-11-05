import { Show, type JSXElement } from 'solid-js'

interface PopoverProps {
	children?: JSXElement
	condition: boolean
	target: HTMLElement
}

export default function Popover(props: PopoverProps) {
	return (
		<Show when={props.condition}>
			<div>{props.children}</div>
		</Show>
	)
}
