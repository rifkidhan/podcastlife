import type { PageServerLoad } from './$types';
import { podcastAPI } from '$lib/server/api';
import type { SingleEpisode } from '$lib/types';
import sanitize from '$lib/utils/sanitize';
import transcript from '$lib/utils/transcript';

interface Chapter {
	startTime: number;
	title: string;
	img?: string;
	url?: string;
}

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const guid = params.guid;
	const feedId = params.podcastId;

	const res = await podcastAPI({
		endpoint: '/episodes/single',
		query: {
			feedId,
			guid
		}
	});

	const { data: episode } = (await res.json()) as SingleEpisode;

	const getTranscript = async (url?: string) => {
		if (!url || typeof url !== 'string') return [];

		const data = await fetch(url);

		if (!data.ok) return [];

		const result = await data.text();

		return transcript(result);
	};

	const getChapters = async (url?: string) => {
		if (!url || typeof url !== 'string') return [];

		const data = await fetch(url);

		if (!data.ok) return [];

		const result = await data.json();
		return result.chapters as Chapter[];
	};

	setHeaders({
		'cache-control': 'public, max-age=360'
	});

	return {
		episode: {
			...episode,
			description: episode.description && sanitize(episode.description)
		},
		chapters: getChapters(episode.chapters ? episode.chapters : undefined),
		transcripts: getTranscript(episode.transcripts ? episode.transcripts[0].url : undefined)
	};
};
