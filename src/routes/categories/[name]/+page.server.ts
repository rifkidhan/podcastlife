import type { PageServerLoad } from './$types';
import { getPodcastsByCategory } from '$lib/server/podcasts';

export const load = (async ({ params, url }) => {
	const category = params.name;
	const before = url.searchParams.get('before');
	const after = url.searchParams.get('after');

	const { data, meta } = await getPodcastsByCategory({ category, before, after });

	return {
		feeds: data,
		meta: meta.page
	};
}) satisfies PageServerLoad;
