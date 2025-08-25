import type { PageServerLoad } from "./$types";
import { getTrendings, getRecents } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ setHeaders }) => {
	const [trendings, recents] = await Promise.all([getTrendings(), getRecents()]);

	if (!dev) {
		setHeaders({
			"cache-control": "private, max-age=7200"
		});
	}

	return {
		trendings,
		recents
	};
};
