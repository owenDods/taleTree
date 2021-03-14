import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

export const className = 'taleStart';

const TaleStart = ({ tale }) => (

	<div className={className}>

		{get('name', tale)}

	</div>

);

TaleStart.propTypes = {
	tale: PropTypes.shape(taleShape)
};

export default TaleStart;
