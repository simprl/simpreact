import React from 'react';
import { ButtonProps } from '../types';
import style from './style.module.scss';

interface Theme {
	button?: string;
	active?: string;
	disabled?: string;
}

export const Button = <TValue,>({
	className,
	theme,
	activeValue,
	value,
	onChange,
	name,
	children,
}: ButtonProps<TValue, Theme>): JSX.Element => {
	const activeClassName = (activeValue === undefined ? value : activeValue === value)
		? theme?.active ?? style.active
		: '';
	return (
		<button
			className={`${className} ${theme?.button ?? style.button} ${activeClassName}`}
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
};
