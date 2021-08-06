import { Reducer, Store } from 'redux';
import { useEffectAsync } from '@local/hooks';
import { resourceReducer } from '@local/store/dynamic/reducersCreators';
import * as actions from './dynamic/actions';

interface Props extends Store {
	useReducer: (name: string, reducer: Reducer) => void;
}

const reducer = resourceReducer();
let reqI = 1;
const getUseResource =
	({ useReducer, dispatch }: Props) =>
	(space: string, loader: () => any): void => {
		useReducer(space, reducer);

		// Fetch data
		useEffectAsync(async () => {
			if (loader) {
				const reqId = String(reqI++);
				try {
					dispatch(actions.startLoad(space, reqId));
					const payload = await loader();
					dispatch(actions.loadSuccess(space, payload, reqId));
				} catch (e) {
					dispatch(actions.loadError(space, e, reqId));
				}
			}
		}, [loader]);
	};

export default getUseResource;
