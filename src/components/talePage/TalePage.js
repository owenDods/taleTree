import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router-dom';

import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleChoice from '../taleChoice/TaleChoice';

import dummyPages from '../../../pages.json';

export const className = 'talePage';

const TalePage = ({ backgroundImg }) => {

	const { params = {} } = useRouteMatch();
	const { pageId } = params;
	const activePage = get(pageId, dummyPages);

	const pageImg = get('img', activePage);
	const pageDestinations = getOr([], 'destinations', activePage);
	const { goBack } = useHistory();
	const destinations = pageDestinations.length ? pageDestinations
		: [ { destination: () => goBack(), label: 'Back' } ];

	return (

		<BackgroundImg
			imgUrl={backgroundImg}
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
	backgroundImg: PropTypes.string
};

export default TalePage;
