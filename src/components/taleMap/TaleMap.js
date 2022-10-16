import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import useTrackVisitedPages from './utils/useTrackVisitedPages';
import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap({ taleTree, taleId, activePageId }) {

	const visitedPages = useTrackVisitedPages(taleId, activePageId);
	const taleMapEl = useRef(null);

	useEffect(() => {

		if (taleTree) {

			generateTaleMapElements(taleMapEl.current, taleTree, className, activePageId, visitedPages);

		}

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
	taleId: PropTypes.string,
	activePageId: PropTypes.string
};

export default TaleMap;
