import type { PageServerLoad } from "./$types";
import type { LivePodcast } from "$lib/types";
import { podcastAPI } from "$lib/server/api";

export const load: PageServerLoad = async ({ setHeaders }) => {
	const res = await podcastAPI({ endpoint: "/live" });

	const { data } = (await res.json()) as LivePodcast;

	setHeaders({
		"cache-control": "private, max-age=720"
	});

	return {
		live: data
	};
};
