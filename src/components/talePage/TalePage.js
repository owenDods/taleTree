import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router-dom';

import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleChoice from '../taleChoice/TaleChoice';

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
	const pageDestinations = getOr([], 'destinations', activePage);
	const { goBack } = useHistory();
	const destinations = pageDestinations.length ? pageDestinations
		: [ { destination: () => goBack(), label: 'Back' } ];

	return (

		<BackgroundImg
			imgUrl={get('backgroundImg', activeTale)}
			component={(<div className={className} />)}
		>

			<div className={`${className}__content`}>

				{pageImg && (

					<BackgroundImg
						imgUrl={pageImg}
						component={(<div className={`${className}__img`} />)}
					/>

				)}

				<h1>{get('title', activePage)}</h1>

				<p>{get('text', activePage)}</p>

			</div>

			<TaleChoice choices={destinations} />

		</BackgroundImg>

	);

};

TalePage.propTypes = {
	activeTale: PropTypes.shape(taleShape),
	setActiveTale: PropTypes.func.isRequired
};

export default TalePage;
