import { Reducer } from 'redux';
import * as actionTypes from '../actionTypes';

export interface ResourceState {
	loading?: boolean;
	loaded?: boolean;
	value: unknown;
}

export const createResourceReducer = (value = null): Reducer<ResourceState> => {
	const initState: ResourceState = { value };
	return (state = initState, action) => {
		switch (action?.type) {
			case actionTypes.START_LOAD:
				return state?.loaded
					? state
					: {
							...state,
							loading: true,
							loaded: false,
					  };
			case actionTypes.LOAD_SUCCESS:
				return {
					...state,
					loading: false,
					loaded: true,
					loadError: null,
					value: action?.payload,
				};
			case actionTypes.LOAD_ERROR:
				return {
					...state,
					loading: false,
					loaded: true,
					loadError: action?.payload,
					value: null,
				};
			case actionTypes.START_RELOAD:
				return {
					...state,
					loading: true,
					loaded: false,
				};
			case actionTypes.INVALIDATE:
				return initState;
			default:
				return state;
		}
	};
};
