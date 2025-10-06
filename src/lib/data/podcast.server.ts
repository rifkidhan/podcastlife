import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import type {
	Trending,
	RecentPodcast,
	Podcast,
	SingleEpisode,
	LivePodcast,
	PodcastByCategory
} from "./types";

const API_URL = env.API_URL;
const API_TOKEN = env.API_TOKEN;

const api = async <T>({
	endpoint,
	query
}: {
	endpoint: string;
	query?: Record<string, string>;
}): Promise<T | never> => {
	const url = new URL(`${API_URL}${endpoint}`);

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			url.searchParams.append(key, value);
		}
	}

	const data = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			"Content-Type": "application/json",
			"Accept-Encoding": "br"
		}
	});

	if (!data.ok) {
		error(data.status, { message: data.statusText });
	}

	return data.json();
};

export const getTrendings = async (cat?: string) => {
	const data = await api<Trending>({
		endpoint: "/trending",
		query: cat
			? {
					cat: cat
				}
			: undefined
	});

	return data.data;
};

export const getRecents = async () => {
	const data = await api<RecentPodcast>({
		endpoint: "/recent"
	});

	return data.data;
};

export const getPodcast = async (id: string) => {
	const data = await api<Podcast>({
		endpoint: `/feed/${id}`
	});

	return data.data;
};

export const getSingleEpisode = async (feed_id: string, guid: string) => {
	const data = await api<SingleEpisode>({
		endpoint: `/feed/${feed_id}/${encodeURIComponent(guid)}`
	});

	return data.data;
};

export const getLivePodcast = async () => {
	const data = await api<LivePodcast>({
		endpoint: "/live"
	});

	return data.data;
};

export const getCategory = async (category: string, cursor?: string, previous?: string) => {
	let query: Record<string, string> = {
		perPage: String(30)
	};

	if (cursor && Boolean(previous)) {
		query = {
			...query,
			before: cursor
		};
	} else if (cursor) {
		query = {
			...query,
			after: cursor
		};
	}

	const data = await api<PodcastByCategory>({
		endpoint: `/categories/${category}`,
		query
	});

	return data;
};
