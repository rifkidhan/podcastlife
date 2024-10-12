import { mergeProps, splitProps, type ComponentProps } from 'solid-js';

interface SliderProps extends ComponentProps<'input'> {
	value: number;
	max?: number;
	min?: number;
	step?: number;
}

export default function Slider(props: SliderProps) {
	const mergedProps = mergeProps(
		{
			min: 0,
			max: 100,
			step: 1
		},
		props
	);

	const [local, attrs] = splitProps(mergedProps, ['value', 'min', 'max', 'step']);
	return (
		<input
			type="range"
			min={local.min}
			max={local.max}
			step={local.step}
			value={local.value}
			style={{ '--pl-slider-value': `${(local.value * 100) / local.max}%` }}
			class={`slider ${attrs.class ? attrs.class : ''}`}
			{...attrs}
		/>
	);
}
