import React from 'react';
import classname from 'classnames';
import { InteractiveProps } from '../types';
import useShowErrors from '../useShowErrors';

import './style.scss';

export interface InputType extends InteractiveProps<string> {
	label?: string;
	type?: string;
	icons?: any;
}

export const Input: React.FC<InputType> = ({ name, value, onChange, className, errors, submitted, icons, ...rest }) => {
	const [filteredErrors, inputProps] = useShowErrors<string>({
		errors,
		submitted,
		onChange,
	});

	return (
		<div className={classname('Input', { 'Input--error': filteredErrors.length })}>
			<input type="text" name={name} value={value} {...inputProps} {...rest} />
			<div className="icons">{icons}</div>
		</div>
	);
};
