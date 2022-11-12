import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap({ taleTree, activePageId, taleFinishDestinations, visitedPages }) {

	const taleMapEl = useRef(null);

	useEffect(() => {

		if (taleTree) {

			generateTaleMapElements(
				taleMapEl.current,
				taleTree,
				className,
				activePageId,
				visitedPages,
				taleFinishDestinations
			);

		}

	}, [ activePageId, !!taleTree, JSON.stringify(visitedPages) ]);

	return (
		<div
			className={className}
			ref={taleMapEl}
		/>
	);

}

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape),
	activePageId: PropTypes.string,
	taleFinishDestinations: PropTypes.arrayOf(PropTypes.string),
	visitedPages: PropTypes.arrayOf(PropTypes.string)
};

export default TaleMap;
