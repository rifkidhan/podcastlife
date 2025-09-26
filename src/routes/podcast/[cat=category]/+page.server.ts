import type { PageServerLoad } from "./$types";
import { dev } from "$app/environment";
import { getCategory } from "$lib/data/podcast.server";

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const cursor = url.searchParams.get("c");
	const back = url.searchParams.get("back");

	const data = await getCategory(
		params.cat,
		typeof cursor === "string" ? cursor : undefined,
		typeof back === "string" ? back : undefined
	);

	if (!dev) {
		setHeaders({
			"cache-control": "private, max-age=7200"
		});
	}

	return {
		category: data.data,
		info: data.meta.page
	};
};
