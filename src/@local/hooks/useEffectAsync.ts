import { DependencyList, useEffect } from 'react';

const useEffectAsync = (f: () => void, deps?: DependencyList): void => {
	useEffect(() => {
		f();
	}, deps);
};

export default useEffectAsync;
