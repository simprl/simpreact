import { Layout } from '@local/components/types';
import { Menu } from './Menu';

export const withMenu = (layout: Layout): React.ReactNode => (
	<div>
		<Menu />
		<div>{layout()}</div>
	</div>
);
