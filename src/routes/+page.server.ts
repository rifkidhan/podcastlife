import type { PageServerLoad } from "./$types";
import { podcastAPI } from "$lib/server/api";
import type { Trending, RecentPodcast } from "$lib/types";

const getTrending = async () => {
	const res = await podcastAPI({ endpoint: "/trending" });

	const data = (await res.json()) as Trending;

	return data;
};
const getRecent = async () => {
	const res = await podcastAPI({ endpoint: "/recent" });

	const data = (await res.json()) as RecentPodcast;

	return data;
};

export const load: PageServerLoad = async ({ setHeaders }) => {
	const [trending, recent] = await Promise.all([getTrending(), getRecent()]);

	setHeaders({
		"cache-control": "private, max-age=7200"
	});

	return {
		trendings: trending.data,
		recents: recent.data
	};
};
