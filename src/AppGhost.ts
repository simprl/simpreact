import { Ghost } from 'react-ghost';
import { reducersCreators, useAppStore } from './@local/store';
import { COMMON_SPACES } from './@local/constants';

const pathParamsReducer = reducersCreators.valueReducer({});

export const AppGhost: Ghost = () => {
	const { useReducer } = useAppStore();
	useReducer(COMMON_SPACES.PATH_PARAMS, pathParamsReducer);
	return null;
};
