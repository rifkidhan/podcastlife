import { API_URL, API_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const podcastApi = async (param: string) => {
	const data = await fetch(`${API_URL}${param}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	if (!data.ok) {
		console.error(data.statusText);
		error(data.status);
	}

	return await data.json();
};

type Variables<T> = T extends { variables: object } ? T['variables'] : never;
export const API = async <T>({
	headers,
	query,
	variables,
}: {
	headers?: HeadersInit
	query: string
	variables?: Variables<T>	
}): Promise<{ status: number; body: T } | never> => {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify({
			...(query && { query }),
			...(variables && { variables })
		})
	})

	const body = await res.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: res.status,
      body
    };
}