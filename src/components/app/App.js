import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import BackButton from '../backButton/BackButton';
import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

import routes from '../../routes';

import dummyTaleSummaries from '../../../taleSummaries.json';

export const className = 'app';

const App = () => {

	const [ taleSummaries, setTaleSummaries ] = useState([]);
	useEffect(() => {

		setTaleSummaries(dummyTaleSummaries);

	}, []);

	return (

		<div className={className}>

			<Router>

				<BackButton />

				<Switch>

					<Route path={`${routes.TALE}/:taleId`}>

						<Tale taleSummaries={taleSummaries} />

					</Route>

					<Route path="/">

						<TaleSelection taleSummaries={taleSummaries} />

					</Route>

				</Switch>

			</Router>

		</div>

	);

};

export default App;
