import { withMenu } from 'layouts/withMenu';
import { Layout } from '@local/components/types';

export const layout: Layout = () => withMenu(() => <div>hello</div>);
