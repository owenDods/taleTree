import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

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

	const pageImg = get('img', activePage);

	return (

		<div className={className}>

			{pageImg && (

				<BackgroundImg
					imgUrl={pageImg}
					component={(<div className={`${className}__img`} />)}
				/>

			)}

			<h1>{get('title', activePage)}</h1>

			<p>{get('text', activePage)}</p>

		</div>

	);

};

TalePage.propTypes = {
	activeTale: PropTypes.shape(taleShape),
	setActiveTale: PropTypes.func.isRequired
};

export default TalePage;
