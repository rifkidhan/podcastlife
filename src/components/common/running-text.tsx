import {
	createEffect,
	createSignal,
	splitProps,
	createMemo,
	mergeProps,
	onCleanup
} from 'solid-js';
import type { JSXElement } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import s from './running-text.module.css';
import { getWindowSize } from '$lib/utils/helper';

interface RunningTextProps {
	as?: 'h1' | 'div' | 'span';
	class?: string;
	children: JSXElement;
	marginBottom?: string;
	isTitle?: boolean;
	title?: string;
	maximizeChange?: number;
	textAlign?: 'left' | 'center';
}

export default function RunningText(props: RunningTextProps) {
	const mergedProps = mergeProps(
		{
			maximizeChange: 1024
		},
		props
	);
	const [local, attrs] = splitProps(mergedProps, [
		'marginBottom',
		'isTitle',
		'maximizeChange',
		'textAlign'
	]);
	const [scrollWidth, setScrollWidth] = createSignal(0);
	const [parentWidth, setParentWidth] = createSignal(0);
	const [windowSize] = getWindowSize();

	const textAlignTitle = createMemo(() => {
		if (local.isTitle) {
			return windowSize() > local.maximizeChange ? 'left' : 'center';
		}
		if (local.textAlign) {
			return local.textAlign;
		}

		return 'left';
	});

	let runningText!: HTMLSpanElement;

	const move = createMemo(() => scrollWidth() > parentWidth());
	const sumWidth = createMemo(() => scrollWidth() - parentWidth());

	const handleResize = () => {
		if (runningText.parentElement && attrs.title) {
			setScrollWidth(runningText.scrollWidth);
			setParentWidth(runningText.parentElement.clientWidth);
		}
	};

	createEffect(handleResize);

	createEffect(() => {
		window.addEventListener('resize', handleResize);

		onCleanup(() => {
			window.removeEventListener('resize', handleResize);
		});
	});

	return (
		<Dynamic
			component={attrs.as ?? 'span'}
			class={`${s.root} ${attrs.class ? attrs.class : ''}`}
			title={attrs.title}
			style={{
				'--pl-running-text-length': `-${Math.round(sumWidth() + 20)}px`,
				'--pl-running-text-duration': `${Math.floor((sumWidth() * 3) / 100 + 3)}s`,
				'--pl-running-text-align': textAlignTitle(),
				'--pl-running-text-margin': local.marginBottom ?? '0.5rem'
			}}
		>
			<span ref={runningText} classList={{ [s['running-animation']]: move() }}>
				{attrs.children}
			</span>
		</Dynamic>
	);
}
