import { useHandler } from '@local/hooks';
import { Action, ActionCreator, AnyAction, Store } from 'redux';

const getUseAction =
	({ dispatch }: Store) =>
	<A extends Action = AnyAction>(action: ActionCreator<A>): (() => void) =>
		useHandler((...args) => {
			dispatch(action(...args));
		});

export default getUseAction;
