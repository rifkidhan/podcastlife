import type { RequestHandler } from './$types';
import { podcastAPI } from '$lib/server/podcasts';
import type { PodcastByCategory } from '$lib/types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	const cursor = url.searchParams.get('c');

	const res = await podcastAPI({
		endpoint: `/categories/${params.category}`,
		query: cursor ? { after: cursor } : undefined
	});

	const data = (await res.json()) as PodcastByCategory;

	return json({
		data: data.data,
		meta: data.meta
	});
};
