import type { PageServerLoad } from "./$types";
import { getPodcast } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ setHeaders, params }) => {
	const podcast = await getPodcast(params.feedId);

	const { feed, episodes, lives } = podcast;

	if (!dev) {
		setHeaders({
			"Netlify-CDN-Cache-Control": "public, max-age=7200, stale-while-revalidate=7200",
			"Cache-Control": "public, max-age=0, must-revalidate"
		});
	}

	return {
		podcast: feed,
		episodes,
		live: lives,
		meta: {
			title: feed.title
		}
	};
};
