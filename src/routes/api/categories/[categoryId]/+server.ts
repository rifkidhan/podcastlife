import type { RequestHandler } from './$types';
import { podcastAPI } from '$lib/server/api';
import { json, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	const cursor = url.searchParams.get('c');

	const res = await podcastAPI({
		endpoint: `/categories/${params.categoryId}`,
		query: cursor ? { after: cursor } : undefined
	});

	if (!res.ok) {
		error(res.status, { message: res.statusText });
	}

	const data = await res.json();

	return json({
		data: data.data,
		meta: data.meta
	});
};
