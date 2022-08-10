import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap({ taleTree, activePageId }) {

	const taleMapEl = useRef(null);

	useEffect(() => {

		generateTaleMapElements(taleMapEl.current, taleTree, className, activePageId);

	}, [ activePageId ]);

	return (
		<div
			className={className}
			ref={taleMapEl}
		/>
	);

}

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape),
	activePageId: PropTypes.string
};

export default TaleMap;
