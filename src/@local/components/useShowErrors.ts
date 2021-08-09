import { useState } from 'react';
import { useHandler } from '@local/hooks';
import { EMPTY } from '@local/constants';

import { InteractiveProps, TErrors } from './types';

const useShowErrors = <TValue>(options?: InteractiveProps<TValue>): [TErrors, InteractiveProps<TValue>] => {
	const [interacted, setInteracted] = useState(false);
	const { submitted, errors } = options ?? {};
	const showErrors = interacted || submitted ? errors : false;

	const inputProps: InteractiveProps<TValue> = {
		onChange: useHandler((e) => {
			setInteracted(true);
			if (options?.onChange) options.onChange(e);
		}),
	};
	return [Array.isArray(showErrors) ? showErrors : EMPTY.ARRAY, inputProps];
};

export default useShowErrors;
