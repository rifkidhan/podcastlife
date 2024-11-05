import type { APIRoute } from 'astro'
import { podcastAPI } from '$lib/server/api'

export const GET: APIRoute = async ({ params, request }) => {
	const category = params.category
	const cursor = new URL(request.url).searchParams.get('c')

	if (!category) {
		return new Response(null, {
			status: 404,
			statusText: 'Not found'
		})
	}

	let query: Record<string, string> = {
		perPage: String(30)
	}

	if (cursor) {
		query = {
			...query,
			after: cursor
		}
	}

	const res = await podcastAPI({
		endpoint: `/categories/${category}`,
		query
	})

	return new Response(JSON.stringify(await res.json()), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
