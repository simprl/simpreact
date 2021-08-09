import React from 'react';

export interface TargetType<TValue> {
	name?: string;
	value?: TValue;
}

export interface ChangeEventType<TValue> {
	target: TargetType<TValue>;
}

export interface InteractiveProps<TValue> {
	children?: React.ReactNode;
	name?: string;
	value?: TValue;
	onChange?: (e: ChangeEventType<TValue>) => void;
	className?: string;
	errors?: TErrors;
	submitted?: boolean;
}

export interface ButtonProps<TValue> extends InteractiveProps<TValue>{
	activeValue?: TValue;
}

export type TErrors = readonly string[];

export interface Layout {
	(): React.ReactNode;
}
