import { API_URL, API_TOKEN, API_URL_GRAPHQL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { Trending, Podcast, LivePodcast, PodcastByCategory, SingleEpisode } from '$lib/types';
import { podcastQuery, trendingQuery, getCategoryQuery } from './query/podcast';
import { liveStreamQuery, simpleSingleEpisodeQuery } from './query/content';

type Variables<T> = T extends { variables: object } ? T['variables'] : never;

export const API = async <T>({
	headers,
	query,
	variables
}: {
	headers?: HeadersInit;
	query: string;
	variables?: Variables<T>;
}): Promise<{ status: number; body: T } | never> => {
	const res = await fetch(API_URL_GRAPHQL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify({
			...(query && { query }),
			...(variables && { variables })
		})
	});

	const body = await res.json();

	if (body.errors) {
		error(body.errors[0].extension.status, body.errors[0].message);
	}

	return {
		status: res.status,
		body
	};
};

export const getTrending = async ({
	limit = 10,
	category
}: {
	limit?: number;
	category?: string;
}) => {
	const data = await API<Trending>({
		query: trendingQuery,
		variables: {
			limit,
			since: 'DAY',
			category
		}
	});

	return data.body.data;
};

export const getPodcast = async (id: string) => {
	const data = await API<Podcast>({
		query: podcastQuery,
		variables: {
			id
		}
	});

	return data.body.data;
};

export const getPodcastsByCategory = async ({
	category,
	limit = 50,
	cursor
}: {
	category: string;
	limit?: number;
	cursor?: string;
}) => {
	const data = await API<PodcastByCategory>({
		query: getCategoryQuery,
		variables: {
			category,
			limit,
			cursor
		}
	});

	return data.body.data.podcastsByCategory;
};

export const getLiveStream = async () => {
	const data = await API<LivePodcast>({
		query: liveStreamQuery
	});

	return data.body.data;
};

export const getPlayNowMetadata = async ({ guid, feedId }: { guid: string; feedId: string }) => {
	const data = await API<SingleEpisode>({
		query: simpleSingleEpisodeQuery,
		variables: {
			guid,
			feedId
		}
	});

	return data.body.data;
};
