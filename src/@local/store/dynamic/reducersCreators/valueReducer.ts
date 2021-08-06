import { Reducer } from 'redux';
import * as actionTypes from '../actionTypes';
import { setPath } from './utils';

const createValueReducer =
	(initValue: unknown): Reducer<unknown> =>
	(state = initValue, action) => {
		switch (action?.type) {
			case actionTypes.SET:
				return action.payload;
			case actionTypes.MERGE:
				return { ...(state as Record<string, any>), ...action.payload };
			case actionTypes.RESET:
				return initValue;
			case actionTypes.SET_PATH: {
				const { path, value } = action.payload;
				return setPath(state as Record<string, any>, path, value);
			}
			default:
				return state;
		}
	};

export default createValueReducer;
