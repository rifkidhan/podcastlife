import type { Action } from 'svelte/action';
import { afterUpdate, onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { animate as animateDom, inView as inViewDom } from 'motion';
import type {
	MotionKeyframesDefinition,
	AnimationOptionsWithOverrides,
	AnimationControls,
	InViewOptions
} from 'motion';

interface SegmentParams {
	keyframe?: MotionKeyframesDefinition;
	options?: AnimationOptionsWithOverrides;
	inView?: boolean;
	inViewOptions?: InViewOptions;
	play?: boolean;
}

type AnimateAction = Action<HTMLElement, SegmentParams | undefined>;

type Void = () => void;

export const createAnimate = (options?: SegmentParams) => {
	let animateOption = options;

	let play = options?.play ?? true;

	const animate: AnimateAction = (node, params) => {
		if (params) {
			animateOption = { ...animateOption, ...params };
		}

		if (!animateOption?.keyframe) {
			throw Error('No one parameter');
		}
		const { keyframe, options, inView, inViewOptions } = animateOption;
		play = animateOption.play ?? true;

		let view: Void | undefined = undefined;
		let animation: AnimationControls;

		let intersecting = false;

		if (inView) {
			view = inViewDom(
				node,
				(info) => {
					const control = animateDom(info.target, keyframe, options);
				},
				inViewOptions
			);
		} else {
			animation = animateDom(node, keyframe, options);
			if (!play) {
				animation.cancel();
			}
		}

		return {
			update: (params) => {
				if (params) {
					animateOption = { ...animateOption, ...params };
				}
				play = animateOption?.play ?? true;
				if (!animateOption?.keyframe) {
					throw Error('No one parameter');
				}
				if (!play) {
					animation.cancel();
				} else {
					animation = animateDom(node, animateOption.keyframe, animateOption.options);
				}
			},
			destroy: () => {
				if (typeof view === 'function') {
					view();
				} else {
					if (play) {
						animation.finish;
					}
				}
			}
		};
	};

	return {
		animate,
		options: animateOption
	};
};
