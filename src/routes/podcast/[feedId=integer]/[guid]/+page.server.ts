import type { PageServerLoad } from "./$types";
import { getSingleEpisode } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const guid = atob(params.guid);
	const feedId = params.feedId;

	const data = await getSingleEpisode(feedId, guid);

	if (!dev) {
		setHeaders({
			"cache-control": "private, max-age=7200"
		});
	}

	const title = `${data.title ?? "untitled"} - ${data.feedTitle}`;

	return {
		episode: data,
		meta: {
			title: title,
			description: data.description
		}
	};
};
