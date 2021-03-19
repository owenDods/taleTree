import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/fp/get';

import taleSummaryShape from '../shapes/taleSummaryShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleStart';

const TaleStart = ({ taleSummary }) => (

	<div className={className}>

		<BackgroundImg
			imgUrl={get('img', taleSummary)}
			component={(<div className={`${className}__img`} />)}
		>

			<h1>{get('name', taleSummary)}</h1>

		</BackgroundImg>

		<p className={`${className}__summary`}>{get('summary', taleSummary)}</p>

	</div>

);

TaleStart.propTypes = {
	taleSummary: PropTypes.shape(taleSummaryShape)
};

export default TaleStart;
