import React from 'react';
import PropTypes from 'prop-types';

import taleTreeNodeChecker from '../shapes/taleTreeNodeChecker';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

const TaleMap = ({ taleTree }) => (

	<div className={className}>

		<div className={`${className}__node ${className}__node--end`} />

		{generateTaleMapElements(taleTree, className)}

	</div>

);

TaleMap.propTypes = {
	taleTree: PropTypes.arrayOf(taleTreeNodeChecker)
};

export default TaleMap;
