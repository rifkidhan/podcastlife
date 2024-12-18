export const groupBy = <V, K>(list: Array<V>, get: (input: V) => K) => {
	const mapping = new Map<K, Array<V>>();

	for (const item of list) {
		const key = get(item);
		const collection = mapping.get(key);

		if (!collection) {
			mapping.set(key, [item]);
		} else {
			collection.push(item);
		}
	}

	return mapping;
};

export const arrayGroupBy = <T>(
	array: T[],
	predicate: (value: T, index: number, array: T[]) => string
) =>
	array.reduce(
		(acc, value, index, array) => {
			(acc[predicate(value, index, array)] ||= []).push(value);
			return acc;
		},
		{} as { [key: string]: T[] }
	);