import produce from 'immer';
import { Reducer } from 'redux';
import * as actionTypes from '../actionTypes';
import { mutatePath } from './utils';

export interface FormState<TValue> {
	submitting?: boolean;
	submitted?: boolean;
	loading?: boolean;
	loaded?: boolean;
	changed: boolean;
	touched: boolean;
	value?: TValue;
	originalValue?: TValue;
	validationErrors?: unknown;
	submitError?: Record<string, any>;
	meta?: unknown;
}

export const set = <TValue>(prevState: FormState<TValue>, newValue: TValue, touch: boolean): FormState<TValue> => {
	const newState = {
		...prevState,
		changed: true,
		touched: true,
		value: newValue,
	};

	if (!touch) {
		newState.touched = false;
		// Clear submit error for changed field
		newState.submitError = undefined;
	}
	return newState;
};

export const formReducer = <TValue = unknown>(value: TValue): Reducer<FormState<TValue>> => {
	const initState: FormState<TValue> = {
		value,
		originalValue: value,
		changed: false,
		touched: false,
	};
	return (state = initState, action) => {
		switch (action?.type) {
			case actionTypes.START_LOAD:
				return {
					...state,
					loading: true,
					loaded: false,
					loadError: null,
					value: undefined,
					originalValue: undefined,
					postData: action.postData,
				};
			case actionTypes.LOAD_SUCCESS: {
				const newState = {
					...state,
					loading: false,
					loaded: true,
					loadError: null,
					changed: false,
				};
				if (typeof action.payload === 'object') {
					const { meta, ...value } = action.payload;
					newState.meta = meta;
					newState.value = value;
					newState.originalValue = value;
				} else {
					newState.value = action.payload;
					newState.originalValue = action.payload;
				}
				return newState;
			}
			case actionTypes.LOAD_ERROR:
				return {
					...state,
					loading: false,
					loaded: true,
					loadError: action?.payload,
					value: undefined,
					originalValue: undefined,
				};
			case actionTypes.START_RELOAD:
				return {
					...state,
					loading: true,
					loaded: false,
					loadError: null,
					value: undefined,
				};
			case actionTypes.TOUCH_SET: {
				return set(state, action.payload, true);
			}
			case actionTypes.SET: {
				return set(state, action.payload, false);
			}
			case actionTypes.TOUCH_MERGE: {
				const newValue = produce(state.value, (draft) => ({ ...draft, ...action?.payload }));
				return newValue === state.value
					? state
					: {
							...state,
							changed: true,
							touched: true,
							value: newValue,
					  };
			}
			case actionTypes.MERGE: {
				const { meta, ...value } = action.payload ?? {};
				const newValue = produce(state.value, (draft) => ({ ...draft, ...value }));
				const isChanged = newValue !== state.value;
				return isChanged || meta
					? {
							...state,
							meta: state.meta ? { ...(state.meta as Record<string, any>), ...meta } : meta,
							changed: isChanged,
							value: newValue,
					  }
					: state;
			}
			case actionTypes.TOUCH_SET_PATH: {
				const { path, value } = action.payload;
				const newValue = produce(state.value ?? {}, (draft) => mutatePath(draft, path, value));
				return newValue === state.value
					? state
					: {
							...state,
							changed: true,
							touched: true,
							value: newValue,
					  };
			}
			case actionTypes.SET_PATH: {
				const { path, value } = action.payload;
				const newValue = produce(state.value ?? {}, (draft) => mutatePath(draft, path, value));
				return newValue === state.value
					? state
					: {
							...state,
							changed: true,
							value: newValue,
					  };
			}
			case actionTypes.SET_DISABLED: {
				return {
					...state,
					disabled: action.payload,
				};
			}
			case actionTypes.SUBMIT:
				return state.validationErrors
					? {
							...state,
							submitting: false,
							submitted: true,
							// submitError: null,
					  }
					: {
							...state,
							submitting: true,
							submitted: false,
							// submitError: null,
					  };
			case actionTypes.SUBMIT_SUCCESS:
				return {
					...state,
					submitting: false,
					submitted: true,
					submitError: null,
				};
			case actionTypes.SUBMIT_ERROR:
				return {
					...state,
					submitting: false,
					submitted: true,
					submitError: action?.payload,
				};
			case actionTypes.VALIDATION_ERRORS:
				return {
					...state,
					validationErrors: action?.payload,
				};
			case actionTypes.INVALIDATE:
				return initState;
			case actionTypes.RESET:
				return {
					...state,
					value: state?.originalValue,
					changed: false,
				};
			default:
				return state;
		}
	};
};
