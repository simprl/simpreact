import { Middleware } from 'redux';
import { ActionNames } from './ActionNames';

const m = (process.env.REACT_APP_HOMEPAGE ?? '').match(/^(http|https):\/\/.*?\/(.*?)$/);
const HOMEPAGE = m ? `/${m[2]}/` : '';

const pathToString = (path) => path.map((el, i) => (i === 0 ? '' : el === null || el === '' ? '_' : el)).join('/');

const fromHomePage =
	HOMEPAGE && HOMEPAGE.length > 0
		? (pathname) => pathname && `/${pathname?.slice(HOMEPAGE.length)}`
		: (pathname) => pathname;
const toHomePage =
	HOMEPAGE && HOMEPAGE.length > 0
		? (pathname) => pathname && `${HOMEPAGE}${pathname?.slice(1)}`
		: (pathname) => pathname;

export interface History {
	location: {
		pathname: string;
	};
	push: (path: string) => void;
}

const routerMiddleware =
	(history: History, links = {}): Middleware =>
	(store) =>
	(next) =>
	(action) => {
		if (action.type === ActionNames.ROUTE_ACTION_SET_LINKS)
			// eslint-disable-next-line no-param-reassign
			links = action.payload;

		if (action.type === ActionNames.ROUTE_ACTION_TYPE) {
			const { link: linkName, method, payload } = action.payload;
			if (!linkName) {
				console.error(`Link "${linkName}" not defined`);
				return next(action);
			}
			const { link, path } = links[linkName] ?? {};
			if (!link) {
				console.error(`Link "${linkName}" not defined`);
				return next(action);
			}
			const pathname = fromHomePage(history.location?.pathname);
			const curPath = pathname.split('/');
			const root = pathToString(path.map((item, i) => (item === null ? curPath[i] : item)));
			const curParams = store.getState()?.pathParams;
			const page = link?.(payload, curParams);

			history[method](toHomePage(`${root}${page}`));
			return next(action);
		}
		if (action.type === ActionNames.ROUTE_ACTION_TYPE_ABS) {
			const { link, method } = action.payload;
			console.log(action.payload, toHomePage(link));
			history[method](toHomePage(link));
			return next(action);
		}
		if (action.type === ActionNames.ROUTE_ACTION_TYPE_UP) {
			const { count = 1, method = 'push' } = action.payload ?? {};
			const pathname = store.getState()?.router?.location?.pathname;
			const newPath = count > 0 ? pathname.split('/').slice(0, -count).join('/') : pathname;
			history[method](toHomePage(newPath));
			return next(action);
		}
		return next(action);
	};

export default routerMiddleware;
