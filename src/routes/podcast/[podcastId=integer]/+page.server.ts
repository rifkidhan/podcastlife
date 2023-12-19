import type { PageServerLoad } from './$types';
import { getPodcast } from '$lib/server/podcast';
import sanitize from '$lib/utils/sanitize';

export const load = (async ({ params }) => {
	const id = params.podcastId;

	const { podcast } = await getPodcast(id);

	const { data: feed, episodes, live } = podcast;

	return {
		podcast: {
			...feed,
			description: sanitize(feed.description ?? '')
		},
		episodes: episodes,
		live: live
	};
}) satisfies PageServerLoad;
