import React from 'react';
import { ButtonProps } from '../types';

export const Button = <TValue,>({ activeValue, value, onChange, name, children }: ButtonProps<TValue>): JSX.Element => (
	<button
		className={(activeValue === undefined ? value : activeValue === value) ? 'ch-button-active' : ''}
		onClick={(...args) => {
			if (onChange) {
				onChange({
					target: { name, value: (activeValue === undefined ? !value : activeValue) as TValue },
				});
				args[0].stopPropagation();
			}
		}}
	>
		{children}
	</button>
);
