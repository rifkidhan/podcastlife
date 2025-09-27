import type { PageServerLoad } from "./$types";
import { getTrendings, getRecents } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ setHeaders }) => {
	const [trendings, recents] = await Promise.all([getTrendings(), getRecents()]);

	if (!dev) {
		setHeaders({
			"Netlify-CDN-Cache-Control": "public, max-age=7200, stale-while-revalidate=7200",
			"Cache-Control": "public, max-age=0, must-revalidate"
		});
	}

	return {
		trendings,
		recents
	};
};
