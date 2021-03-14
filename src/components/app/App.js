import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

import dummyTales from '../../../tales.json';

export const className = 'app';

const App = () => {

	const [ tales, setTales ] = useState([]);
	useEffect(() => {

		setTales(dummyTales);

	}, []);

	return (

		<div className={className}>

			<Router>

				<Switch>

					<Route path="/tale/:taleId">

						<Tale tales={tales} />

					</Route>

					<Route path="/">

						<TaleSelection tales={tales} />

					</Route>

				</Switch>

			</Router>

		</div>

	);

};

export default App;
