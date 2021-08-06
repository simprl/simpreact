import { Reducer } from 'redux';
import * as actionTypes from '../actionTypes';

const compare = (a, b) => (Number.isFinite(a) && Number.isFinite(b) ? a - b : a.localeCompare(b));

const sortArray = (array, sortKey, orderAsc) =>
	[...array].sort(
		orderAsc
			? ({ [sortKey]: a }, { [sortKey]: b }) => compare(a, b)
			: ({ [sortKey]: a }, { [sortKey]: b }) => compare(b, a)
	);

const isEqualsFilter = (newFilter?: Record<string, unknown>, prevFilter?: Record<string, unknown>) => {
	if (prevFilter === newFilter) return true;
	if (!prevFilter || !newFilter) return false;

	const entries1 = Object.entries(newFilter);
	const entries2 = Object.entries(prevFilter);
	return entries1.length === entries2.length && entries1.every(([k, v]) => prevFilter[k] === v);
};

interface Pagination {
	index?: number;
	length?: number;
}

interface FilteredResourceState {
	loading?: boolean;
	loaded?: boolean;
	value: unknown;
	filter?: Record<string, unknown>;
	sort: unknown;
	reqId?: string;
	pagination?: Pagination;
}

const filteredResourceReducer = ({
	filter = undefined,
	value = null,
	sort = null,
} = {}): Reducer<FilteredResourceState> => {
	const initState: FilteredResourceState = {
		value,
		filter,
		sort,
		pagination: { index: 0, length: 10 },
	};

	return (state = initState, action) => {
		switch (action?.type) {
			case actionTypes.SET_FILTER: {
				const filter = Array.isArray(action.payload)
					? Object.fromEntries(action.payload.map(({ id, value }) => [id, value]))
					: action.payload ?? {};
				return isEqualsFilter(filter, state.filter)
					? state
					: {
							...state,
							pagination: {
								index: 0,
								length: state?.pagination?.length,
							},
							sort: null,
							filter,
					  };
			}
			case actionTypes.CHANGE_SORT: {
				return {
					...state,
					sort: action.payload,
					pagination: { index: 0, length: state?.pagination?.length },
				};
			}
			case actionTypes.CHANGE_PAGE: {
				const { index, length } = action.payload ?? {};
				const prev = state?.pagination ?? {};
				return {
					...state,
					pagination: {
						index: length === prev.length ? index : 0,
						length,
					},
				};
			}
			case actionTypes.START_LOAD:
				return {
					...state,
					reqId: action.reqId ?? null,
					loading: true,
					loaded: false,
					error: null,
				};
			case actionTypes.LOAD_SUCCESS:
				if (state.reqId !== undefined && state.reqId !== null && state.reqId !== action.reqId) return state;

				if (action?.payload?.rows !== undefined) {
					const { rows, total } = action.payload;
					return {
						...state,
						loading: false,
						loaded: true,
						error: null,
						value: rows,
						total,
					};
				}
				return {
					...state,
					loading: false,
					loaded: true,
					error: null,
					value: action?.payload,
				};

			case actionTypes.LOAD_ERROR:
				if (state.reqId !== undefined && state.reqId !== null && state.reqId !== action.reqId) return state;

				return {
					...state,
					loading: false,
					loaded: true,
					error: action?.error,
					value: null,
					total: null,
				};
			case actionTypes.START_RELOAD:
				return { ...state, loading: true, loaded: false, error: null };
			case actionTypes.LOCAL_SORT: {
				const localSort = action.payload;
				const [[key, asc]] = Object.entries(localSort);
				return {
					...state,
					localSort,
					value: Array.isArray(state.value) ? sortArray(state.value, key, asc) : state.value,
				};
			}
			case actionTypes.INVALIDATE:
				return initState;
			default:
				return state;
		}
	};
};

export default filteredResourceReducer;
