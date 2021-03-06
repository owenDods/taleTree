import React from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap({ taleTree, activePageId }) {

	return (
		<div className={className}>

			{generateTaleMapElements(taleTree, className, activePageId)}

		</div>
	);

}

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape),
	activePageId: PropTypes.string
};

export default TaleMap;
