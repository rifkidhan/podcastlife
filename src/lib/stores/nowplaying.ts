import { writable } from 'svelte/store';
import type { Episode, LiveEpisode } from '$lib/utils/parser';

interface Player {
	podcastName: string;
	type: 'podcast' | 'live';
	content?: Episode | LiveEpisode;
	paused: boolean;
}

interface NowPlaying {
	podcast: {
		id: string;
		title: string;
		image: string;
	};
	content: {
		guid: string;
		title: string;
		url: string;
		image: string;
		explicit?: boolean;
	};
	paused: boolean;
}
export const playing = writable<NowPlaying>({
	podcast: {
		id: '',
		title: '',
		image: ''
	},
	content: {
		guid: '',
		title: '',
		url: '',
		image: ''
	},
	paused: true
});

interface Basic {
	podcastName: string;
	type: 'podcast' | 'live';
	paused: boolean;
}

interface Podcast extends Basic {
	content?: Episode;
}

interface Live extends Basic {
	content?: LiveEpisode;
}

export const play = (isPodcast: boolean) => {
	const podcast = writable<Podcast>({
		podcastName: '',
		type: 'podcast',
		content: undefined,
		paused: true
	});
};

export const player = writable({
	open: false,
	currentTime: 0
});

export const currentTime = writable(0);
