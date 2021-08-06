import React, { useEffect, useState, useMemo } from 'react';
import { ghost } from 'react-ghost';

const conf404 = { redirect: '/home' };

const loginConfig = (pathname) => ({ redirect: `/login?back=${pathname}` });

const pathToString = (path) => path.map((el, i) => (i === 0 ? '' : el === null || el === '' ? '_' : el)).join('/');

const getConfig = (routes, pathString, isAuthCorrect, currentBack) => {
	if (pathString === '/') return { redirect: pathToString(['', routes.index]) };

	const path = (pathString?.split('/') ?? ['', '']).map((el) => (el === '' || el === '_' ? null : el));
	const params = {};
	let i = 1;
	while (i < path.length) {
		if (routes.params) {
			// eslint-disable-next-line no-restricted-syntax
			for (const paramName of routes.params) params[paramName] = path[i++];

			if (i >= path.length) break;
		}

		if (!routes?.children) break;

		const pathItem = path[i++];
		const subRoutes = routes.children[pathItem];
		if (routes.childKey) params[routes.childKey] = pathItem;

		if (!subRoutes) {
			console.error(`Route not found for path: ${pathToString(path)}`, routes);
			return conf404;
		}
		// eslint-disable-next-line no-param-reassign
		routes = subRoutes;
	}

	const { layout, index, actor, needAuth } = routes;
	if (layout) {
		if (!isAuthCorrect && needAuth) return loginConfig(currentBack ?? pathString);

		return { params, root: path.slice(0, i), restPath: path.slice(i), layout, actor };
	}

	if (!index) {
		console.error(`Route not found for path: ${pathToString(path)}`);
		return conf404;
	}
	return { redirect: pathToString([...path.slice(0, i), index]) };
};

interface State {
	node: React.ReactElement | null;
	params?: Record<string, string>;
}

interface Result extends State {
	redirect: string;
}

interface RoutesConfig {
	index?: string;
}

interface Props {
	routes: RoutesConfig;
	path: string;
	isAuthCorrect: boolean;
	currentBack?: string;
}

export const useRoute = ({ routes, path, isAuthCorrect, currentBack }: Props): Result => {
	const { params, root, restPath, layout, redirect, actor } = useMemo(
		() => getConfig(routes, path, isAuthCorrect, currentBack),
		[routes, path, isAuthCorrect, currentBack]
	);

	const [state, setPage] = useState<State>({ node: null });

	useEffect(() => {
		if (!redirect) {
			setPage(() => ({
				node: (
					<>
						{layout ? layout(root, restPath) : null}
						{actor ? ghost(actor) : null}
					</>
				),
				params,
			}));
		}
	}, [actor, layout, params, redirect]);

	return { redirect, ...state };
};
