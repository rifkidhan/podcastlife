import type { Chapter } from "$lib/data/types";
import { Persisted } from "./persisted.svelte";

export interface Track {
	feed: string;
	feedId: string;
	guid: string;
	title: string;
	enclosure: string;
	image: string;
	explicit?: boolean;
}

class AudioMetadata {
	#track: Track = $state({
		feed: "",
		feedId: "",
		title: "",
		image: "",
		enclosure: "",
		guid: "",
		explicit: false
	});
	// #trackId = $derived(this.#track.feedId + "_" + this.#track.guid);
	#duration = $state(0);
	#currentTime = $state(0);
	#paused = $state(true);
	#readyState = $state(0);
	#volume = $state(1);
	#state: "pause" | "loading" | "play" = $derived.by(() => {
		if (this.#readyState <= 2) return "loading";
		if (this.#paused) return "pause";

		return "play";
	});
	#chapters = new Persisted<string>("chapters", "{chapters: []}");

	get track() {
		return this.#track;
	}
	get paused() {
		return this.#paused;
	}
	set paused(v) {
		this.#paused = v;
	}
	get duration() {
		return this.#duration;
	}
	set duration(value) {
		this.#duration = value;
	}
	get currentTime() {
		return this.#currentTime;
	}
	set currentTime(v) {
		this.#currentTime = v;
	}
	get volume() {
		return this.#volume;
	}
	set volume(v) {
		this.#volume = v;
	}
	get readyState() {
		return this.#readyState;
	}
	set readyState(v) {
		this.#readyState = v;
	}
	get state() {
		return this.#state;
	}
	get chapters() {
		const parse = JSON.parse(this.#chapters.current);
		return parse.chapters as Chapter[];
	}
	async playTrack(options: Track & { chaptersUrl?: string }) {
		if (options.enclosure === this.#track.enclosure) {
			this.#paused = !this.#paused;
		} else {
			const { chaptersUrl, ...opts } = options;
			this.#track = opts;

			const chapters = await getChapters(chaptersUrl);
			this.#chapters.current = JSON.stringify({ chapters: chapters });
		}
	}
}

export const audiometadata = new AudioMetadata();

//helper for get chapters from chapters url
const getChapters = async (url?: string): Promise<Chapter[]> => {
	if (!url) return [];

	const res = await fetch(url, {
		headers: {
			"user-agent": "PodcastLife/1.0"
		}
	});

	if (!res.ok) {
		return [];
	}

	const json = await res.json();

	return json.chapters;
};
