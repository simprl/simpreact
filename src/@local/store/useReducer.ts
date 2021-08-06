import { useEffect } from 'react';
import { Dispatch, Reducer, Store } from 'redux';

interface Props extends Store {
	addReducer: (name: string, reducer: Reducer, dispatch: Dispatch) => () => void;
}

const getUseReducer =
	({ addReducer, dispatch }: Props) =>
	(name: string, reducer: Reducer): void => {
		useEffect(() => addReducer(name, reducer, dispatch), [name, reducer]);
	};

export default getUseReducer;
