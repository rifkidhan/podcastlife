import type { PageServerLoad } from './$types';
import type { Podcast } from '$lib/types';
import { podcastAPI } from '$lib/server/api';
import sanitize from '$lib/utils/sanitize';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const res = await podcastAPI({ endpoint: `/podcasts/podcast/feed/${params.podcastId}` });

	const { data } = (await res.json()) as Podcast;

	const { feed, episodes, lives } = data;

	setHeaders({
		'cache-control': 'public, max-age=360'
	});

	return {
		podcast: {
			...feed,
			description: feed.description ? sanitize(feed.description ?? '') : ''
		},
		episodes,
		live: lives
	};
};
