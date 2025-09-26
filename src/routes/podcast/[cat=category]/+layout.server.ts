import type { LayoutServerLoad } from "./$types";
import { getTrendings } from "$lib/data/podcast.server";
import { CATEGORIES } from "$lib/utils/constants";

export const load: LayoutServerLoad = async ({ params }) => {
	const trendings = await getTrendings(params.cat);

	const title = CATEGORIES.find((v) => v.id === params.cat);

	return {
		trending: trendings,
		meta: {
			title: title?.title
		}
	};
};
