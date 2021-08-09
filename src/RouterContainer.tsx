import { memo, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { COMMON_SPACES, LINKS } from '@local/constants';
import { useAppStore, routeActions, actions } from '@local/store';
import { getRoutes } from 'pages/getRoutes';
import { useRoute } from '@local/route';

const HOMEPAGE = '';

function flatten(arr) {
	return arr.reduce(function (flat, toFlatten) {
		return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	}, []);
}

const getLinks = (routes, path = ['']) => [
	...(routes?.links ? Object.entries(routes.links).map(([key, link]) => ({ key, path, link })) : []),
	...(routes?.children
		? Object.entries(routes.children).map(([key, subRoutes]) =>
				getLinks(subRoutes, [...path, ...(routes.params ? routes.params.map(() => null) : []), key])
		  )
		: []),
];

const getLinksObj = (routes, links) => {
	const linksArray = flatten(getLinks(routes)).map(({ key, link, path }) => [key, { link, path }]);

	const incorrectLinks = linksArray.filter(([key]) => !links.includes(key));
	if (incorrectLinks.length > 0) console.error(`Incorrect Links ${JSON.stringify(incorrectLinks, null, 2)}`);
	return Object.fromEntries(linksArray);
};

const fromHomePage = HOMEPAGE.length
	? (pathname) => pathname && `/${pathname?.slice(HOMEPAGE.length)}`
	: (pathname) => pathname;

export const RouterContainer: React.FC = memo(() => {
	const { dispatch, history, useStoreSpace } = useAppStore();
	const auth = useStoreSpace(COMMON_SPACES.AUTH);
	const [pathname, setPathname] = useState(fromHomePage(history.location?.pathname));
	const isAuth = auth?.success;
	useLayoutEffect(() => {
		const clear = history.listen((e) => {
			setPathname(() => fromHomePage(e.location?.pathname));
			window.scrollTo(0, 0);
		});
		setPathname(() => fromHomePage(history.location?.pathname));
		return clear;
	}, [history]);

	const routes = useMemo(() => getRoutes(), []);

	useEffect(() => {
		dispatch(routeActions.setLinks(getLinksObj(routes, Object.values(LINKS))));
	}, [dispatch, routes]);

	const { redirect, params, node } = useRoute({ routes, path: pathname, isAuthCorrect: isAuth });

	useEffect(() => {
		if (redirect) {
			dispatch(routeActions.replaceAbs(redirect));
		}
	}, [redirect]);

	useEffect(() => {
		if (!redirect) {
			dispatch(actions.set(COMMON_SPACES.PATH_PARAMS, params));
		}
	}, [redirect, params]);

	return node;
});
