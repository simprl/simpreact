import { AnyAction } from 'redux';
import { ActionNames } from './ActionNames';
import { Link } from './types';

export const push = (link: string, payload?: unknown): AnyAction => ({
	type: ActionNames.ROUTE_ACTION_TYPE,
	payload: { method: 'push', link, payload },
});
export const replace = (link: string, payload?: unknown): AnyAction => ({
	type: ActionNames.ROUTE_ACTION_TYPE,
	payload: { method: 'replace', link, payload },
});
export const replaceAbs = (link: string, payload?: unknown): AnyAction => ({
	type: ActionNames.ROUTE_ACTION_TYPE_ABS,
	payload: { method: 'replace', link, payload },
});
export const up = (count: number, method: string): AnyAction => ({
	type: ActionNames.ROUTE_ACTION_TYPE_UP,
	payload: { count, method },
});
export const setLinks = (links: Record<string, Link>): AnyAction => ({
	type: ActionNames.ROUTE_ACTION_SET_LINKS,
	payload: links,
});
