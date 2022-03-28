import React from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

const TaleMap = ({ taleTree }) => (

	<div className={className}>

		<div className={`${className}__node ${className}__node--end`} />

		{generateTaleMapElements(taleTree, className)}

	</div>

);

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape)
};

export default TaleMap;
