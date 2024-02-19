import type { PageServerLoad } from './$types';
import { getPodcast } from '$lib/server/podcasts';
import sanitize from '$lib/utils/sanitize';

export const load = (async ({ params, setHeaders }) => {
	const id = params.podcastId;

	const { data } = await getPodcast(id);

	const { feed, episodes, lives } = data;

	return {
		podcast: {
			...feed,
			description: sanitize(feed.description ?? '')
		},
		episodes: episodes,
		live: lives
	};
}) satisfies PageServerLoad;
