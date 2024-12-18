import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

const API_URL = env.API_URL;
const API_TOKEN = env.API_TOKEN;

export const podcastAPI = async ({
	endpoint,
	query
}: {
	endpoint: string;
	query?: Record<string, string>;
}) => {
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

	return data;
};
