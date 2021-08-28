import { flex, margin } from '@local/styles';
import { InteractiveProps } from '@local/components/types';
import { Button } from '@local/components';
import React from 'react';

export const MenuButtons: React.FC<InteractiveProps<string>> = React.memo(({ value, onChange }) => (
	<div className={`${flex.col} ${margin.medium}`}>
		<Button className={`${flex.row} ${margin.small}`} value={value} activeValue="home" onChange={onChange}>
			Home
		</Button>
		<Button className={`${flex.row} ${margin.small}`} value={value} activeValue="about" onChange={onChange}>
			About
		</Button>
	</div>
));
