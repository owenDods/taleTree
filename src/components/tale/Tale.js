import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Route,
	useRouteMatch
} from 'react-router-dom';

import find from 'lodash/fp/find';

import taleSummaryShape from '../shapes/taleSummaryShape';

import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

export const className = 'tale';

const Tale = ({ taleSummaries }) => {

	const { path, params, url: talePath } = useRouteMatch();
	const { taleId } = params;
	const taleSummary = find({ id: taleId }, taleSummaries);

	const [ activeTale, setActiveTale ] = useState(null);

	return (

		<div className={className}>

			<Switch>

				<Route path={`${path}/start`}>

					<TaleStart
						taleSummary={taleSummary}
						talePath={talePath}
					/>

				</Route>

				<Route path={`${path}/:pageId`}>

					<TalePage activeTale={activeTale} setActiveTale={setActiveTale} />

				</Route>

				<Route path="*">

					<Lost />

				</Route>

			</Switch>

		</div>

	);

};

Tale.propTypes = {
	taleSummaries: PropTypes.arrayOf(PropTypes.shape(taleSummaryShape))
};

export default Tale;
