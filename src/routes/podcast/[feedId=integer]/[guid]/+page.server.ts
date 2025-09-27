import type { PageServerLoad } from "./$types";
import { getSingleEpisode } from "$lib/data/podcast.server";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const guid = atob(params.guid);
	const feedId = params.feedId;

	const data = await getSingleEpisode(feedId, guid);

	if (!dev) {
		setHeaders({
			"Netlify-CDN-Cache-Control": "public, max-age=7200, stale-while-revalidate=7200",
			"Cache-Control": "public, max-age=0, must-revalidate"
		});
	}

	const title = `${data.title ?? "untitled"} - ${data.feedTitle}`;

	return {
		episode: data,
		meta: {
			title: title
		}
	};
};
