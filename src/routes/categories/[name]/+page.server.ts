import type { PageServerLoad } from './$types';
import { getPodcastsByCategory, getTrending } from '$lib/server/podcast';

export const load = (async ({ params }) => {
	const category = params.name.toUpperCase().replace('-', '_');

	const [trending, podcast] = await Promise.all([
		await getTrending({ category, limit: 5 }),
		await getPodcastsByCategory({ category })
	]);

	return {
		trending: trending.trending,
		feeds: podcast.data
	};
}) satisfies PageServerLoad;
