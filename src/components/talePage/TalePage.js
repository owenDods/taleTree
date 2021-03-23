import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

import dummyTale from '../../../tale.json';

export const className = 'talePage';

const TalePage = ({ activeTale, setActiveTale }) => {

	const { params = {} } = useRouteMatch();
	const { pageId } = params;
	const activePage = get(pageId, get('pages', activeTale));

	useEffect(() => {

		if (!activeTale) {

			setActiveTale(dummyTale);

		}

	}, [ !!activeTale ]);

	return (

		<div className={className}>

			<h1>{get('title', activePage)}</h1>

		</div>

	);

};

TalePage.propTypes = {
	activeTale: PropTypes.shape(taleShape),
	setActiveTale: PropTypes.func.isRequired
};

export default TalePage;
