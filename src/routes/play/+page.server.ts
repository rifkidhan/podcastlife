import type { PageServerLoad } from './$types';
import { getPlayNowMetadata } from '$lib/server/podcast';
import sanitize from '$lib/utils/sanitize';
import { type Segment } from 'transcriptator';
import transcript from '$lib/utils/transcript';
import { error } from '@sveltejs/kit';

export const load = (async ({ url, fetch }) => {
	const guid = url.searchParams.get('g');
	const feedId = url.searchParams.get('f');

	if (!guid || !feedId) {
		error(400, { message: 'Bad Request' });
	}
	const { episode } = await getPlayNowMetadata({ guid, feedId });

	let chapters;
	let transcripts: Segment[] | undefined = [];

	if (episode.chapters || episode.transcripts) {
		const [getChapters, getTranscripts] = await Promise.all([
			fetch(episode.chapters ? episode.chapters : '').then((res) => {
				if (res.ok) {
					return res.json();
				}
				return undefined;
			}),
			fetch(episode.transcripts ? episode.transcripts[0].url : '').then((res) => {
				if (res.ok) {
					return res.text();
				}
				return undefined;
			})
		]);
		transcripts = getTranscripts ? transcript(getTranscripts) : undefined;
		chapters = getChapters;
	}

	return {
		episode: {
			...episode,
			description: episode.description && sanitize(episode.description)
		},
		chapters: chapters ? chapters.chapters : undefined,
		transcript: transcripts && transcripts.length > 0 ? transcripts : undefined
	};
}) satisfies PageServerLoad;
