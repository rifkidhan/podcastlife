import type { PageServerLoad } from "./$types";
import { getLivePodcast } from "$lib/data/podcast.server";

export const load: PageServerLoad = async () => {
	const data = await getLivePodcast();
	return {
		live: data,
		meta: {
			title: "Live"
		}
	};
};
