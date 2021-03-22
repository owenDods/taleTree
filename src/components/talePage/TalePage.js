import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

export const className = 'talePage';

const TalePage = ({ activeTale }) => {

	const { params = {} } = useRouteMatch();
	const { pageId } = params;
	const activePage = get(pageId, get('pages', activeTale));

	return (

		<div className={className}>

			<h1>{get('title', activePage)}</h1>

		</div>

	);

};

TalePage.propTypes = {
	activeTale: PropTypes.shape(taleShape)
};

export default TalePage;
