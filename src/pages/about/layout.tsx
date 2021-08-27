import { withMenu } from 'layouts/withMenu';
import { Layout } from '@local/components/types';
import { colors, flex, margin, text } from '@local/styles';

export const layout: Layout = () =>
	withMenu(() => (
		<div className={`${margin.small} ${flex.col}`}>
			<div className={`${margin.small} ${flex.row} ${text.h2}`}>
				Framework for quick start develop react application with typescript and redux
			</div>

			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le connection to redux by hooks useStorePath and useAction
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le control of big store by dynamic reducers
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le Business logic by using hooks and Ghosts without thunk or saga
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le switch between mobile, desktop, and other themes (demo in progress)
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le styling and theming (demo in progress)
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le i18n in context (demo in progress)
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le APIs in context (demo in progress)
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le validation by yup connected to redux (demo in progress)
			</div>
			<div className={`${margin.small} ${flex.row} ${text.b1}`}>
				<b className={colors.primary}>Simp</b>le typechecking by set of typescript types and rules (demo in
				progress)
			</div>
		</div>
	));
