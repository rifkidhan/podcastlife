import type { PageServerLoad } from "./$types";
import { podcastAPI } from "$lib/server/api";
import type { SingleEpisode } from "$lib/types";
import transcript from "$lib/utils/transcript";

interface Chapter {
	startTime: number;
	title: string;
	img?: string;
	url?: string;
}

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const guid = atob(params.guid);
	const feedId = params.podcastId;

	const res = await podcastAPI({
		endpoint: "/episodes/single",
		query: {
			feedId,
			guid
		}
	});

	const { data: episode } = (await res.json()) as SingleEpisode;

	const getTranscript = async (url?: string) => {
		if (!url || typeof url !== "string") return [];

		const data = await fetch(url);

		if (!data.ok) return [];

		const result = await data.text();

		return transcript(result);
	};

	const getChapters = async (url?: string) => {
		if (!url || typeof url !== "string") return [];

		const data = await fetch(url);

		if (!data.ok) return [];

		const result = await data.json();
		return result.chapters as Chapter[];
	};

	setHeaders({
		"cache-control": "private, max-age=360"
	});

	return {
		chapters: getChapters(episode.chapters ? episode.chapters : undefined),
		transcripts: getTranscript(episode.transcripts ? episode.transcripts[0].url : undefined),
		episode
	};
};
