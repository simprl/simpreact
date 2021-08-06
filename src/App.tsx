import React from 'react';
import { ghost } from 'react-ghost';
import { RouterContainer } from './RouterContainer';
import { AppGhost } from './AppGhost';

function App(): JSX.Element {
	return (
		<>
			{ghost(AppGhost)}
			<RouterContainer />
		</>
	);
}

export default App;
