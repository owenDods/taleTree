import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Route,
	useRouteMatch,
	useLocation,
	useHistory
} from 'react-router-dom';
import {
	TransitionGroup,
	CSSTransition
} from 'react-transition-group';

import find from 'lodash/fp/find';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import taleShape from '../shapes/taleShape';

import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

import dummyPages from '../../../pages.json';

export const className = 'tale';

const Tale = ({ tales }) => {

	const { path, params, url: talePath } = useRouteMatch();
	const { taleId } = params;
	const activeTale = find({ id: taleId }, tales);

	const [ pageId, setPageId ] = useState(null);

	const activePage = get(pageId, dummyPages);

	const pageImg = get('img', activePage);
	const pageDestinations = getOr([], 'destinations', activePage);
	const { goBack } = useHistory();
	const destinations = pageDestinations.length ? pageDestinations
		: [ { destination: () => goBack(), label: 'Back' } ];

	const location = useLocation();

	return (

		<TransitionGroup className={className}>

			<CSSTransition
				key={location.pathname}
				classNames={className}
				timeout={800}
			>

				<Switch location={location}>

					<Route path={`${path}/start`}>

						<TaleStart
							tale={activeTale}
							talePath={talePath}
						/>

					</Route>

					<Route path={`${path}/:pageId`}>

						<TalePage
							backgroundImg={get('backgroundImg', activeTale)}
							setPageId={setPageId}
							pageImg={pageImg}
							title={get('title', activePage)}
							text={get('text', activePage)}
							destinations={destinations}
						/>

					</Route>

					<Route path="*">

						<Lost />

					</Route>

				</Switch>

			</CSSTransition>

		</TransitionGroup>

	);

};

Tale.propTypes = {
	tales: PropTypes.arrayOf(PropTypes.shape(taleShape))
};

export default Tale;
