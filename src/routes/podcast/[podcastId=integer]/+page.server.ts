import type { PageServerLoad } from "./$types";
import type { Podcast } from "$lib/types";
import { podcastAPI } from "$lib/server/api";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const res = await podcastAPI({ endpoint: `/podcasts/podcast/feed/${params.podcastId}` });

	const { data } = (await res.json()) as Podcast;

	const { feed, episodes, lives } = data;

	setHeaders({
		"cache-control": "private, max-age=360"
	});

	return {
		podcast: feed,
		episodes,
		live: lives
	};
};
