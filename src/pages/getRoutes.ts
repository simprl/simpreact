import { LINKS, ROUTE_PATH_KEYS } from '@local/constants';
import { layout as homeLayout } from './home/layout';
import { layout as aboutLayout } from './about/layout';

export const getRoutes = () =>
	({
		index: 'home',
		links: {
			[LINKS.ROOT]: (page) => `/${page}`,
		},
		childKey: ROUTE_PATH_KEYS.PAGE,
		children: {
			home: {
				layout: homeLayout,
			},
			about: {
				layout: aboutLayout,
			},
		},
	} as const);
