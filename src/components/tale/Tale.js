import React from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Route,
	useRouteMatch,
	useLocation
} from 'react-router-dom';
import {
	TransitionGroup,
	CSSTransition
} from 'react-transition-group';

import find from 'lodash/fp/find';
import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

export const className = 'tale';

const Tale = ({ tales }) => {

	const { path, params, url: talePath } = useRouteMatch();
	const { taleId } = params;
	const activeTale = find({ id: taleId }, tales);

	const location = useLocation();

	return (

		<TransitionGroup className={className}>

			<CSSTransition
				key={location.pathname}
				classNames={className}
				timeout={2000}
			>

				<Switch location={location}>

					<Route path={`${path}/start`}>

						<TaleStart
							tale={activeTale}
							talePath={talePath}
						/>

					</Route>

					<Route path={`${path}/:pageId`}>

						<TalePage backgroundImg={get('backgroundImg', activeTale)} />

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
