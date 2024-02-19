import type { LayoutServerLoad } from './$types';
import { getTrending } from '$lib/server/podcasts';

export const load = (async ({ params }) => {
	const category = params.name;
	const { data } = await getTrending({ category, max: 5 });

	return {
		trending: data
	};
}) satisfies LayoutServerLoad;
