import type { Action } from 'svelte/action';
import { afterUpdate, onDestroy } from 'svelte';
import { browser } from '$app/environment';
import { timeline } from 'motion';
import type {
	TimelineSegment,
	AnimationListOptions,
	MotionKeyframesDefinition,
	TimelineOptions
} from 'motion';

interface SegmentParams {
	keyframe: MotionKeyframesDefinition;
	options?: AnimationListOptions;
}

type SegmentAction = Action<HTMLElement, SegmentParams>;

export const createTimeline = (options?: TimelineOptions) => {
	let segments: TimelineSegment[] = [];

	const segment: SegmentAction = (node, params) => {
		let segment: TimelineSegment = [node, params.keyframe];

		if (params.options) {
			segment = [node, params.keyframe, params.options];
		}

		segments.push(segment);

		return {
			destroy: () => {
				segments.filter((val) => val !== segment);
			}
		};
	};

	const control = () => timeline(segments, options);

	afterUpdate(() => {
		if (browser) {
			control();
		}
	});

	onDestroy(() => {
		control().finish;
	});

	return {
		segment,
		control
	};
};
