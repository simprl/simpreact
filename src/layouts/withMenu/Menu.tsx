import React from 'react';
import { routeActions, useAppStore } from '@local/store';
import { COMMON_SPACES, LINKS, ROUTE_PATH_KEYS } from '@local/constants';
import { MenuButtons } from './MenuButtons';

export const Menu: React.FC = React.memo((): React.ReactElement => {
	const { useStoreSpace, useAction } = useAppStore();
	const page = useStoreSpace(COMMON_SPACES.PATH_PARAMS, ROUTE_PATH_KEYS.PAGE);
	return (
		<MenuButtons value={page} onChange={useAction(({ target: { value } }) => routeActions.push(LINKS.ROOT, value))} />
	);
});
