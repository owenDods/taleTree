import React from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

const TaleMap = ({ taleTree }) => (

	<div className={className}>

		{generateTaleMapElements(taleTree, className)}

	</div>

);

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape)
};

export default TaleMap;
