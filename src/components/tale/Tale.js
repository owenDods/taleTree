import React from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom';

import find from 'lodash/fp/find';

import taleShape from '../shapes/taleShape';

import TaleStart from '../taleStart/TaleStart';

export const className = 'tale';

const Tale = ({ tales }) => {

	const { path, params } = useRouteMatch();
	const { taleId } = params;
	const tale = find({ id: taleId }, tales);

	return (

		<div className={className}>

			<Switch>

				<Route path={path}>

					<TaleStart tale={tale} />

				</Route>

			</Switch>

		</div>

	);

};

Tale.propTypes = {
	tales: PropTypes.arrayOf(PropTypes.shape(taleShape))
};

export default Tale;
