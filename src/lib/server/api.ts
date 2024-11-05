import { API_TOKEN, API_URL } from 'astro:env/server'

export const podcastAPI = async ({
	endpoint,
	query
}: {
	endpoint: string
	query?: Record<string, string>
}) => {
	const url = new URL(API_URL + endpoint)

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			url.searchParams.append(key, value)
		}
	}

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			'Content-Type': 'application/json',
			'Accept-Encoding': 'br, gzip'
		}
	})

	return res
}
