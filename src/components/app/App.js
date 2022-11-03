import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';

import useFetch from '../../utils/useFetch';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import AppHeaderContent from './AppHeaderContent';
import BackButton from '../backButton/BackButton';
import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

import routes from '../../routes';

export const className = 'app';

function App() {

	const { data: account } = useFetch('account');
	console.log(account);
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
							element={<Tale setAppHeaderTitle={setAppHeaderTitle} />}
						/>

						<Route
							path="/"
							element={<TaleSelection />}
						/>

					</Routes>

				</div>

			</Router>

		</div>

	);

}

export default App;
