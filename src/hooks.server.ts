import type { Handle } from "@sveltejs/kit";

const preload = ["js", "css", "font"];

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => preload.includes(type)
	});

	return response;
};
