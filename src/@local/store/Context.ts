import { createContext } from 'react';
import { getUseStorePath } from 'use-store-path';
import { createStore, applyMiddleware, compose, Reducer, StoreEnhancer } from 'redux';
import { reducer as createDynamicReducer } from '@simprl/dynamic-reducer';
import { getUseFilteredResource } from './useFilteredResource';
import history from './route/history';
import getUseAction from './useAction';
import routerMiddleware from './route/routerMiddleware';
import getUseReducer from './useReducer';
import getUseResource from './useResource';
import getUseForm from './useForm';

const { reducer: dynamicReducer, addReducer } = createDynamicReducer();
const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ as typeof compose;

const middlewares = reduxDevTools
	? (compose(applyMiddleware(routerMiddleware(history)), reduxDevTools()) as StoreEnhancer)
	: applyMiddleware(routerMiddleware(history));

const store = createStore(dynamicReducer as Reducer, {}, middlewares);
const useStorePath = getUseStorePath(store);
const useStoreSpace = <T = any>(...path: string[]): T => useStorePath(path) as T;
const getSpaceState = (space: string): any => store.getState()?.[space];
const useReducer = getUseReducer({ ...store, addReducer });
const useResource = getUseResource({ ...store, useReducer });
const useForm = getUseForm({ ...store, useReducer, useStoreSpace });
const useFilteredResource = getUseFilteredResource({ ...store, useReducer, useStoreSpace });
export const extendedStore = {
	...store,
	history,
	useReducer,
	useResource,
	useFilteredResource,
	useForm,
	useAction: getUseAction(store),
	useStoreSpace,
	getSpaceState,
} as const;

export type AppStoreType = typeof extendedStore;

export const StoreContext = createContext<AppStoreType>(extendedStore);
