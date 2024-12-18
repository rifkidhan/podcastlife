import type { RequestHandler } from "./$types";
import { podcastAPI } from "$lib/server/api";
import { json, error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, url }) => {
	const cursor = url.searchParams.get("c");

	let query: Record<string, string> = {
		perPage: String(30)
	};

	if (cursor) {
		query = {
			...query,
			after: cursor
		};
	}

	const res = await podcastAPI({
		endpoint: `/categories/${params.categoryId}`,
		query
	});

	if (!res.ok) {
		error(res.status, { message: res.statusText });
	}

	const data = await res.json();

	return json({
		data: data.data,
		meta: data.meta
	});
};
