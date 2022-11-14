import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';

import { AccountProvider } from './utils/accountContext';
import useAppHeaderTitleLink from './utils/useAppHeaderTitleLink';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import AppHeaderContent from './AppHeaderContent';
import BackButton from '../backButton/BackButton';
import Tale from '../tale/Tale';
import TaleSelection from '../taleSelection/TaleSelection';

import routes from '../../routes';

export const className = 'app';

function App() {

	const {
		appHeaderTitle,
		appHeaderLinkTo,
		setAppHeaderTitleAndLinkTo,
		clearAppHeaderTitleAndLinkTo
	} = useAppHeaderTitleLink();

	return (

		<div className={className}>

			<BackgroundImg
				imgUrl="/backgroundImages/mainApp.jpg"
			/>

			<AccountProvider>

				<Router>

					<div className={`${className}__header`}>

						<AppHeaderContent
							appHeaderTitle={appHeaderTitle}
							appHeaderLinkTo={appHeaderLinkTo}
						/>

					</div>

					<div className={`${className}__content`}>

						<BackButton />

						<Routes>

							<Route
								path={`${routes.TALE}/:taleId/*`}
								element={(
									<Tale
										setAppHeaderTitleAndLinkTo={setAppHeaderTitleAndLinkTo}
										clearAppHeaderTitleAndLinkTo={clearAppHeaderTitleAndLinkTo}
									/>
								)}
							/>

							<Route
								path="/"
								element={<TaleSelection />}
							/>

						</Routes>

					</div>

				</Router>

			</AccountProvider>

		</div>

	);

}

export default App;
