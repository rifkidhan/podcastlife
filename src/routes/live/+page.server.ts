import type { PageServerLoad } from "./$types";
import { getLivePodcast } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ setHeaders }) => {
	const data = await getLivePodcast();

	if (!dev) {
		setHeaders({
			"Netlify-CDN-Cache-Control": "public, max-age=120, stale-while-revalidate=360",
			"Cache-Control": "public, max-age=0, must-revalidate"
		});
	}

	return {
		live: data,
		meta: {
			title: "Live"
		}
	};
};
