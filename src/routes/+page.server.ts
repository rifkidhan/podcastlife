import type { PageServerLoad } from './$types';
import { getTrending, getRecentPodcast } from '$lib/server/podcasts';

export const load = (async ({ setHeaders }) => {
	const [trending, recent] = await Promise.all([getTrending({}), getRecentPodcast()]);

	return {
		trending: trending.data,
		recents: recent.data
	};
}) satisfies PageServerLoad;
