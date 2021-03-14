import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

export const className = 'app';

const App = () => (

	<div className={className}>

		<Router>

			<Switch>

				<Route path="/tale/:taleId">

					<Tale />

				</Route>

				<Route path="/">

					<TaleSelection />

				</Route>

			</Switch>

		</Router>

	</div>

);

export default App;
