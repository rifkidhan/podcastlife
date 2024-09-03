import type { PageServerLoad } from './$types';
import { podcastAPI } from '$lib/server/podcasts';
import type { Trending, RecentPodcast } from '$lib/types';

const getTrending = async () => {
	const res = await podcastAPI({ endpoint: '/podcasts/trending', query: { max: String(10) } });

	const data = (await res.json()) as Trending;

	return data;
};
const getRecent = async () => {
	const res = await podcastAPI({ endpoint: '/podcasts/recent' });

	const data = (await res.json()) as RecentPodcast;

	return data;
};

export const load: PageServerLoad = async ({ setHeaders }) => {
	const [trending, recent] = await Promise.all([getTrending(), getRecent()]);

	setHeaders({
		'cache-control': 'public, max-age=1800, stale-while-revalidate=1800'
	});

	return {
		trendings: trending.data,
		recents: recent.data
	};
};
