import type { PageServerLoad } from './$types';
import { podcastApi } from '$lib/server/podcasts';
import { getLiveStream } from '$lib/server/podcast';
import parser from '$lib/utils/parser';
import type { PodcastInfo, LiveEpisode } from '$lib/utils/parser';
import { error } from '@sveltejs/kit';

export const load = (async () => {
	const { live } = await getLiveStream();

	return { live };
}) satisfies PageServerLoad;
