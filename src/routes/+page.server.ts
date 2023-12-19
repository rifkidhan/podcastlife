import type { PageServerLoad } from './$types';
import { podcastApi } from '$lib/server/podcasts';
import { getTrending } from '$lib/server/podcast';

export const load = (async () => {
	// const data = await podcastApi('/podcasts/trending');

	// const trendingFeeds = data.data.feeds;
	// console.log(trendingFeeds);

	const { trending } = await getTrending({});
	return {
		trending: trending
	};
}) satisfies PageServerLoad;
