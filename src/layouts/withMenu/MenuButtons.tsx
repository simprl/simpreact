import { flex, margin } from '@local/styles';
import { InteractiveProps } from '@local/components/types';
import { Button } from '@local/components';

export const MenuButtons: React.FC<InteractiveProps<string>> = ({ value, onChange }) => (
	<div className={`${flex.row} ${margin.large}`}>
		<Button value={value} activeValue="home" onChange={onChange}>
			Home
		</Button>
		<Button value={value} activeValue="about" onChange={onChange}>
			About
		</Button>
	</div>
);
