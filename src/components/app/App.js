import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import TopBar from '../topBar/TopBar';
import BackButton from '../backButton/BackButton';
import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

import routes from '../../routes';

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

				<TopBar />

				<div className={`${className}__content`}>

					<BackButton />

					<Switch>

						<Route path={`${routes.TALE}/:taleId?`}>

							<Tale tales={tales} />

						</Route>

						<Route path="/">

							<TaleSelection tales={tales} />

						</Route>

					</Switch>

				</div>

			</Router>

		</div>

	);

};

export default App;
