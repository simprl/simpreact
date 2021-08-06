import { useRef, useLayoutEffect } from 'react';

const FUNC_KEY = Symbol('FUNC_KEY');
const ARGS_KEY = Symbol('ARGS_KEY');

interface Func {
	(...args: any[]): any;
	[FUNC_KEY]?: Func;
	[ARGS_KEY]?: any[];
}

const useHandler = <T extends Func>(f: T, ...handlerArgs: any[]): T => {
	const { current } = useRef<Func>((...eventArgs) => {
		return (current[FUNC_KEY] ?? f)(...(current[ARGS_KEY] ?? handlerArgs), ...eventArgs);
	});

	useLayoutEffect(() => {
		current[FUNC_KEY] = f;
		current[ARGS_KEY] = handlerArgs;
	});
	return current as T;
};

export default useHandler;
