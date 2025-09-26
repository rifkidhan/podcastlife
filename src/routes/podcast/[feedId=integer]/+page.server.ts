import type { PageServerLoad } from "./$types";
import { getPodcast } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ setHeaders, params }) => {
	const podcast = await getPodcast(params.feedId);

	const { feed, episodes, lives } = podcast;

	if (!dev) {
		setHeaders({
			"cache-control": "private, max-age=7200"
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
