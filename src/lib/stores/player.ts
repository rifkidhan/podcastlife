import type { AlternativeEnclosure } from '$lib/types';
import { createSignal } from 'solid-js';

export interface FeedPlaying {
	id: string;
	title: string;
}

export interface PodcastPlaying {
	guid: string;
	title: string;
	enclosure: string;
	image: string;
	explicit?: boolean;
	altEnclosure?: AlternativeEnclosure[];
}

interface PlayNow {
	feed: FeedPlaying;
	podcast: PodcastPlaying;
}

const [playNow, setPlayNow] = createSignal<PlayNow>({
	feed: {
		title: '',
		id: ''
	},
	podcast: {
		title: '',
		image: '',
		enclosure: '',
		guid: ''
	}
});

const [paused, setPaused] = createSignal(true);
const [loading, setLoading] = createSignal(true);
const [duration, setDuration] = createSignal(0);
const [currentTime, setCurrentTime] = createSignal(0);

export const playerDetail = () => {
	return {
		playNow,
		setPlayNow,
		paused,
		setPaused,
		loading,
		setLoading,
		duration,
		setDuration,
		currentTime,
		setCurrentTime
	};
};
