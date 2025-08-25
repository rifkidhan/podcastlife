import type { PageServerLoad } from "./$types";
import { dev } from "$app/environment";
import { getCategory } from "$lib/data/podcast.server";
import { CATEGORIES } from "$lib/utils/constants";

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const cursor = url.searchParams.get("c");
	const back = url.searchParams.get("back");

	const data = await getCategory(params.cat, cursor ? cursor : undefined, back ? back : undefined);
	const title = CATEGORIES.find((v) => v.id === params.cat);

	if (!dev) {
		setHeaders({
			"cache-control": "private, max-age=7200"
		});
	}

	return {
		category: data.data,
		info: data.meta.page,
		meta: {
			title: title?.title
		}
	};
};
