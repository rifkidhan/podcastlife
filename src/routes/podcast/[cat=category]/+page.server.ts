import type { PageServerLoad } from "./$types";

import { getCategory } from "$lib/data/podcast.server";

export const load: PageServerLoad = async ({ params, url }) => {
	const cursor = url.searchParams.get("c");
	const back = url.searchParams.get("back");

	return {
		category: getCategory(
			params.cat,
			typeof cursor === "string" ? cursor : undefined,
			typeof back === "string" ? back : undefined
		)
	};
};
