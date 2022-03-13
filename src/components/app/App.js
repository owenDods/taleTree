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

import dummyTaleCollection from '../../../dummyData/taleCollection.json';

export const className = 'app';

const App = () => {

	const [ taleCollection, setTaleCollection ] = useState([]);
	useEffect(() => {

		setTaleCollection(dummyTaleCollection);

	}, []);

	return (

		<div className={className}>

			<Router>

				<div className={`${className}__content`}>

					<BackButton />

					<Switch>

						<Route path={`${routes.TALE}/:taleId?`}>

							<Tale taleCollection={taleCollection} />

						</Route>

						<Route path="/">

							<TaleSelection taleCollection={taleCollection} />

						</Route>

					</Switch>

				</div>

			</Router>

		</div>

	);

};

export default App;
