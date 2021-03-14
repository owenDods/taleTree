import React from 'react';
// import PropTypes from 'prop-types';
import {
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom';

import TaleStart from '../taleStart/TaleStart';

export const className = 'tale';

const Tale = () => {

	const { path } = useRouteMatch();

	return (

		<div className={className}>

			<Switch>

				<Route path={path}>

					<TaleStart />

				</Route>

			</Switch>

		</div>

	);

};

Tale.propTypes = {};

export default Tale;
