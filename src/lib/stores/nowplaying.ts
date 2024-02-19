import { writable } from 'svelte/store';
import type { Enclosure, AlternativeEnclosure } from '$lib/types';

export interface NowPlayingProps {
	podcast: {
		id: string;
		title: string;
		image: string;
	};
	content: {
		guid: string;
		title: string;
		enclosure: Enclosure;
		image: string;
		explicit?: boolean;
		altEnclosure?: AlternativeEnclosure[];
	};
	paused: boolean;
}
export const playing = writable<NowPlayingProps>({
	podcast: {
		id: '',
		title: '',
		image: ''
	},
	content: {
		guid: '',
		title: '',
		enclosure: {
			url: '',
			type: '',
			length: 0
		},
		image: '',
		altEnclosure: undefined
	},
	paused: true
});

export const player = writable({
	open: false,
	currentTime: 0
});

export const currentTime = writable(0);
