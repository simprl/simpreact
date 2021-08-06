import { Reducer, Store } from 'redux';
import { useEffectAsync } from '@local/hooks';
import { EMPTY } from '@local/constants';
import { filteredResourceReducer } from './dynamic/reducersCreators';
import * as actions from './dynamic/actions';

interface Props extends Store {
	useReducer: (name: string, reducer: Reducer) => void;
	useStoreSpace: (...path: string[]) => any;
}

export interface LoaderProps {
	filter: any;
	sort: string;
}

export interface Loader {
	(loaderProps: LoaderProps): any;
}

const reducer = filteredResourceReducer();
let i = 1;
export const getUseFilteredResource =
	({ useReducer, dispatch, useStoreSpace }: Props) =>
	(space: string, loader?: Loader): void => {
		useReducer(space, reducer);

		const filterState = useStoreSpace(space);
		const state = filterState ?? EMPTY.OBJECT;
		const filter = state?.filter ?? EMPTY.OBJECT;
		const { sort, pagination } = state;
		const isInitialized = filterState !== undefined;

		// Fetch data
		useEffectAsync(async () => {
			if (loader && isInitialized) {
				const reqId = `frh2_${i++}`;
				dispatch(actions.startLoad(space, reqId));
				try {
					const { success, data } = (await loader({ filter, sort })) ?? {};
					if (success) dispatch(actions.loadSuccess(space, data, reqId));
					else {
						console.error('Result not success');
						dispatch(actions.loadError(space, 'Result not success', reqId));
					}
				} catch (e) {
					console.error(e);
					dispatch(actions.loadError(space, e, reqId));
				}
			}
		}, [filter, sort, pagination, loader, isInitialized]);
	};
