import { mergeProps, splitProps, type ComponentProps } from 'solid-js'

interface ProgressProps extends ComponentProps<'progress'> {
	value: number
	max: number
}
export default function Progress(props: ProgressProps) {
	const mergedProps = mergeProps(
		{
			max: 100
		},
		props
	)

	const [local, attrs] = splitProps(mergedProps, ['max', 'value'])
	return (
		<progress
			max={local.max}
			value={local.value}
			class={`progress ${attrs.class && attrs.class}`}
			{...attrs}
		/>
	)
}
