export const setPath = <TValue = unknown>(
	obj: Record<string, any> | undefined,
	path: string[],
	value: TValue,
	i = 0
): TValue => {
	if (i >= path.length) return value;

	const key = path[i];
	return { ...obj, [key]: setPath(obj?.[key], path, value, i + 1) } as TValue;
};

export const mutatePath = <TValue = unknown>(obj: Record<string, any>, path: string[], value: TValue, i = 0): void => {
	const key = path[i];
	const nextI = i + 1;
	if (nextI === path.length)
		// eslint-disable-next-line no-param-reassign
		obj[key] = value;
	else {
		// eslint-disable-next-line no-param-reassign
		if (typeof obj[key] !== 'object') obj[key] = {};

		mutatePath(obj[key], path, value, i + 1);
	}
};
