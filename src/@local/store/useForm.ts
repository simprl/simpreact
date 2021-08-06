import { useEffect, useMemo } from 'react';
import { Reducer, Store } from 'redux';
import { ObjectSchema } from 'yup';
import { useEffectAsync } from '@local/hooks';
import { formReducer } from './dynamic/reducersCreators';
import * as actions from './dynamic/actions';
import { FormState } from './dynamic/reducersCreators/formReducer';

interface StoreProps extends Store {
	useReducer: (name: string, reducer: Reducer) => void;
	useStoreSpace: <T>(...path: string[]) => T;
}

interface TLoader {
	(): any;
}
interface TSubmitter {
	(value: any, originalValue: any, submitProps: any): any;
}

interface Props<TValue> {
	space: string;
	loader?: TLoader;
	submitter?: TSubmitter;
	onSaved?: (guid: unknown) => void;
	schema?: ObjectSchema;
	initValue?: TValue;
}

const getUseForm =
	({ useReducer, dispatch, getState, useStoreSpace }: StoreProps) =>
	<TValue = unknown>({ space, loader, submitter, onSaved, schema, initValue }: Props<TValue>): void => {
		const reducer = useMemo(() => formReducer<TValue>(initValue ?? ({} as TValue)), [initValue]);
		useReducer(space, reducer);

		const { loading, submitting, value } = useStoreSpace<FormState<TValue>>(space) ?? {};

		// Fetch data
		useEffectAsync(async () => {
			if (loader && loading) {
				const reqId = getState()?.[space]?.reqId;
				try {
					const { success, data, message } = (await loader()) ?? {};
					if (!success) dispatch(actions.loadError(space, message ?? 'Server Error', reqId));
					else dispatch(actions.loadSuccess(space, data, reqId));
				} catch (e) {
					console.error('useForm -> load', e);
					dispatch(actions.loadError(space, e, reqId));
				}
			}
		}, [Boolean(loading)]);

		useEffectAsync(async () => {
			if (loader) {
				dispatch(actions.startLoad(space));
			}
		}, [loader]);

		// Submit
		useEffectAsync(async () => {
			if (submitter && submitting)
				try {
					const { value, originalValue } = getState()?.[space] ?? {};
					const { success, data, errors } = (await submitter(value, originalValue, submitting)) ?? {};
					if (!success) dispatch(actions.submitError(space, errors ?? [{ message: 'Server Error' }]));
					else {
						dispatch(actions.submitSuccess(space, data));
						onSaved && onSaved(data);
					}
				} catch (e) {
					console.error('FormActor -> submit', e);
					dispatch(actions.submitError(space, e));
				}
		}, [Boolean(submitter), Boolean(submitting)]);

		// Validate
		useEffect(() => {
			if (schema)
				schema
					.validate(value, { abortEarly: false })
					.then(() => {
						dispatch(actions.validationErrors(space, null));
					})
					.catch((err) => {
						const parsedErrors = err.inner.map(({ path, message }) => ({
							message,
							path: path ? path.split('.') : [],
						}));
						dispatch(actions.validationErrors(space, parsedErrors));
					});
		}, [schema, value]);
	};

export default getUseForm;
