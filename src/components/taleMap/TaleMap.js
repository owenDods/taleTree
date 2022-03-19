import React from 'react';
import PropTypes from 'prop-types';

import taleTreeNodeChecker from '../shapes/taleTreeNodeChecker';

export const className = 'taleMap';

const TaleMap = ({ taleTree }) => (

	<div className={className}>

		<div className={`${className}__end`} />

		<div className={`${className}__start`} />

	</div>

);

TaleMap.propTypes = {
	taleTree: PropTypes.arrayOf(taleTreeNodeChecker)
};

export default TaleMap;
