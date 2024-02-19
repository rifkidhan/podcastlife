import type { PageServerLoad } from './$types';
import { getLiveStream } from '$lib/server/podcasts';

export const load = (async () => {
	const { data } = await getLiveStream();

	return { live: data };
}) satisfies PageServerLoad;
