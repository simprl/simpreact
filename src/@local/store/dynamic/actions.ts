import { Action } from '@simprl/dynamic-reducer';
import * as actionTypes from './actionTypes';

let reqI = 0;

export const startLoad = (space: string, reqId?: string): Action<{ reqId: string }> => ({
	space,
	type: actionTypes.START_LOAD,
	payload: { reqId: reqId ?? String(reqI++) },
});

export const loadSuccess = <TValue>(
	space: string,
	value: TValue,
	reqId: string
): Action<{ value: TValue; reqId: string }> => ({
	space,
	type: actionTypes.LOAD_SUCCESS,
	payload: { value, reqId },
});

export const loadError = (space: string, error: unknown, reqId: string): Action<{ error: unknown; reqId: string }> => ({
	space,
	type: actionTypes.LOAD_ERROR,
	payload: { error, reqId },
});

export const submit = (space: string): Action => ({ space, type: actionTypes.SUBMIT });

export const submitSuccess = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.SUBMIT_SUCCESS,
	payload: value,
});

export const submitError = <TValue>(space: string, error: TValue): Action<TValue> => ({
	space,
	type: actionTypes.SUBMIT_ERROR,
	payload: error,
});

export const changeFilter = <TValue>(space: string, filter: TValue): Action<TValue> => ({
	space,
	type: actionTypes.CHANGE_FILTER,
	payload: filter,
});

export const mergeFilter = <TValue>(space: string, filter: TValue): Action<TValue> => ({
	space,
	type: actionTypes.MERGE_FILTER,
	payload: filter,
});

export const setFilter = <TValue>(space: string, filter: TValue): Action<TValue> => ({
	space,
	type: actionTypes.SET_FILTER,
	payload: filter,
});

export const changeSort = <TValue>(space: string, sort: TValue): Action<TValue> => ({
	space,
	type: actionTypes.CHANGE_SORT,
	payload: sort,
});

export const localSort = <TValue>(space: string, sort: TValue): Action<TValue> => ({
	space,
	type: actionTypes.LOCAL_SORT,
	payload: sort,
});

export const changePage = <TValue>(space: string, page: TValue): Action<TValue> => ({
	space,
	type: actionTypes.CHANGE_PAGE,
	payload: page,
});

export const set = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.SET,
	payload: value,
});

export const setPath = <TValue>(
	space: string,
	path: string[],
	value: TValue
): Action<{ path: string[]; value: TValue }> => ({
	space,
	type: actionTypes.SET_PATH,
	payload: { path, value },
});

export const merge = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.MERGE,
	payload: value,
});

export const validationErrors = <TValue>(space: string, errors: TValue): Action<TValue> => ({
	space,
	type: actionTypes.VALIDATION_ERRORS,
	payload: errors,
});

export const invalidate = (space: string): Action => ({
	space,
	type: actionTypes.INVALIDATE,
});

export const reset = (space: string): Action => ({ space, type: actionTypes.RESET });

export const del = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.DEL,
	payload: value,
});

export const setMain = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.SET_MAIN,
	payload: value,
});

export const select = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.SELECT,
	payload: value,
});

export const push = <TValue>(space: string, value: TValue): Action<TValue> => ({
	space,
	type: actionTypes.PUSH,
	payload: value,
});

export const shift = (space: string): Action => ({ space, type: actionTypes.SHIFT });
