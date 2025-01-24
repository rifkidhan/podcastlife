import type { PageServerLoad } from "./$types";
import type { Trending, PodcastByCategory } from "$lib/types";
import { podcastAPI } from "$lib/server/api";

const getTrending = async (category: string) => {
	const res = await podcastAPI({
		endpoint: "/trending",
		query: {
			cat: category
		}
	});

	const data = (await res.json()) as Trending;

	return data;
};

const getPodcastsByCategory = async (category: string) => {
	const res = await podcastAPI({
		endpoint: `/categories/${category}`,
		query: {
			perPage: String(30)
		}
	});

	const data = (await res.json()) as PodcastByCategory;

	return data;
};

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const trending = await getTrending(params.categoryId);

	setHeaders({
		"cache-control": "private, max-age=7200"
	});

	return {
		feeds: getPodcastsByCategory(params.categoryId),
		trending: trending.data
	};
};
