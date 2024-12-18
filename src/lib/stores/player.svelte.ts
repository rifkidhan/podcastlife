import type { AlternativeEnclosure } from "$lib/types";

interface FeedPlaying {
	id: string;
	title: string;
}

interface PodcastPlaying {
	guid: string;
	title: string;
	enclosure: string;
	image: string;
	explicit?: boolean;
	altEnclosure?: AlternativeEnclosure[];
}

let feed: FeedPlaying = $state({
	title: "",
	id: ""
});

let podcast: PodcastPlaying = $state({
	title: "",
	image: "",
	enclosure: "",
	guid: "",
	explicit: false
});

let paused = $state(true);
let loading = $state(true);
let duration = $state(0);
let currentTime = $state(0);

export const playerDetail = () => {
	return {
		get feed() {
			return feed;
		},
		set feed(value) {
			feed = value;
		},
		get podcast() {
			return podcast;
		},
		set podcast(value) {
			podcast = value;
		},
		get paused() {
			return paused;
		},
		set paused(value) {
			paused = value;
		},
		get loading() {
			return loading;
		},
		set loading(value) {
			loading = value;
		},
		get duration() {
			return duration;
		},
		set duration(value) {
			duration = value;
		},
		get currentTime() {
			return currentTime;
		},
		set currentTime(value) {
			currentTime = value;
		}
	};
};
