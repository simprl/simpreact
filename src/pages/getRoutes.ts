import { LINKS } from '@local/constants';

export const getRoutes = () =>
	({
		index: 'home',
		links: {
			[LINKS.ROOT]: () => `/`,
		},
		children: {
			home: {
				layout: () => 'home',
			},
			about: {
				layout: () => 'about',
			},
		},
	} as const);
