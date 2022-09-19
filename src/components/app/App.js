import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import AppHeaderContent from './AppHeaderContent';
import BackButton from '../backButton/BackButton';
import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

import routes from '../../routes';

import dummyTaleCollection from '../../../dummyData/taleCollection.json';

export const className = 'app';

function App() {

	const [ taleCollection, setTaleCollection ] = useState([]);
	useEffect(() => {

		setTaleCollection(dummyTaleCollection);

	}, []);

	const [ appHeaderTitle, setAppHeaderTitle ] = useState('');

	return (

		<div className={className}>

			<BackgroundImg
				imgUrl="/backgroundImages/mainApp.jpg"
			/>

			<Router>

				<div className={`${className}__header`}>

					<AppHeaderContent appHeaderTitle={appHeaderTitle} />

				</div>

				<div className={`${className}__content`}>

					<BackButton />

					<Routes>

						<Route
							path={`${routes.TALE}/:taleId/*`}
							element={(
								<Tale
									taleCollection={taleCollection}
									setAppHeaderTitle={setAppHeaderTitle}
								/>
							)}
						/>

						<Route
							path="/"
							element={<TaleSelection taleCollection={taleCollection} />}
						/>

					</Routes>

				</div>

			</Router>

		</div>

	);

}

export default App;
