import { Layout } from '@local/components/types';
import { flex } from '@local/styles';
import { Menu } from './Menu';

export const withMenu = (layout: Layout): React.ReactNode => (
	<div className={flex.row}>
		<Menu />
		<div className={flex.colShrink}>{layout()}</div>
	</div>
);
