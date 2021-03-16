import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleStart';

const TaleStart = ({ tale }) => (

	<div className={className}>

		<BackgroundImg
			imgUrl={get('img', tale)}
			component={(<div className={`${className}__img`} />)}
		>

			<h1>{get('name', tale)}</h1>

		</BackgroundImg>

		<p className={`${className}__summary`}>{get('summary', tale)}</p>

	</div>

);

TaleStart.propTypes = {
	tale: PropTypes.shape(taleShape)
};

export default TaleStart;
