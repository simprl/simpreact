import { useRef } from 'react';

const FUNC_KEY = Symbol('FUNC_KEY');

interface Func {
	(...args: any[]): any;
	[FUNC_KEY]?: Func;
}

/**
 * Хук используется если надо объявить функцию ссылка на которую не меняется
 * В отличии от useHandler меняет функцию сразу не дожидаясь перерисовки DOM элементов
 * Поэтому ее удобно использовать в контейнерах
 */
const useConstant = <T extends Func>(f: T): T => {
	const { current } = useRef<Func>((...args) => current[FUNC_KEY]?.(...args));
	current[FUNC_KEY] = f;
	return current as T;
};

export default useConstant;
