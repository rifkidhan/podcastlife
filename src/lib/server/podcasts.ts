import { API_URL, API_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type {
	Trending,
	Podcast,
	LivePodcast,
	SingleEpisode,
	PodcastByCategory,
	RecentPodcast
} from '$lib/types';

export const podcastApi = async <T>({
	endpoint,
	query
}: {
	endpoint: string;
	query?: Record<string, string>;
}): Promise<T | never> => {
	const url = new URL(`${API_URL}${endpoint}`);

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});
	}

	const data = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	if (!data.ok) {
		error(data.status as any, { message: data.statusText });
	}

	const result = await data.json();

	return result;
};

export const getTrending = async ({ max = 10, category }: { max?: number; category?: string }) => {
	let query = {
		max: String(max)
	};

	if (category) {
		query = Object.assign(query, { cat: category });
	}

	const data = await podcastApi<Trending>({
		endpoint: '/podcasts/trending',
		query
	});

	return data;
};

export const getPodcast = async (id: string) => {
	const data = await podcastApi<Podcast>({
		endpoint: `/podcasts/podcast/feed/${id}`
	});

	return data;
};

export const getLiveStream = async () => {
	const data = await podcastApi<LivePodcast>({
		endpoint: '/episodes/live'
	});

	return data;
};

export const getPlayNowMetadata = async ({ guid, feedId }: { guid: string; feedId: string }) => {
	const data = await podcastApi<SingleEpisode>({
		endpoint: '/episodes/single',
		query: {
			feedId,
			guid
		}
	});

	return data;
};

export const getPodcastsByCategory = async ({
	category,
	limit,
	before,
	after
}: {
	category: string;
	limit?: number;
	before?: string | null;
	after?: string | null;
}) => {
	const query = new Map();
	if (limit) {
		query.set('perPage', String(limit));
	}
	if (before) {
		query.set('before', before);
	}
	if (after) {
		query.set('after', after);
	}

	const data = await podcastApi<PodcastByCategory>({
		endpoint: `/categories/${category}`,
		query: query.size > 0 ? Object.fromEntries(query) : undefined
	});

	return data;
};

export const getRecentPodcast = async (cat?: string) => {
	const data = await podcastApi<RecentPodcast>({
		endpoint: '/podcasts/recent',
		query: cat ? { cat: cat } : undefined
	});

	return data;
};
