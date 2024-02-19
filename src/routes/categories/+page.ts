import type { PageLoad } from './$types';
import { categories } from '$lib/utils/constants';

export const load = (async () => {
	return {
		categories
	};
}) satisfies PageLoad;
