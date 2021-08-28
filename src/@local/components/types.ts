import React from 'react';

export interface TargetType<TValue> {
	name?: string;
	value?: TValue;
}

export interface ChangeEventType<TValue> {
	target: TargetType<TValue>;
}

export interface InteractiveProps<TValue, TTheme = undefined> {
	children?: React.ReactNode;
	name?: string;
	value?: TValue;
	onChange?: (e: ChangeEventType<TValue>) => void;
	className?: string;
	errors?: TErrors;
	submitted?: boolean;
	theme?: TTheme;
}

export interface ButtonProps<TValue, TTheme> extends InteractiveProps<TValue, TTheme>{
	activeValue?: TValue;
}

export type TErrors = readonly string[];

export interface Layout {
	(): React.ReactNode;
}
