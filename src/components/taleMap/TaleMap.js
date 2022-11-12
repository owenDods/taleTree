import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import TaleMapEmptyContent from './TaleMapEmptyContent';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap({ taleTree, activePageId, taleFinishDestinations, visitedPages }) {

	const taleMapEl = useRef(null);
	const [ hasTaleMapContent, setHasTaleMapContent ] = useState(false);

	useEffect(() => {

		let taleMapSvg;

		if (taleTree) {

			taleMapSvg = generateTaleMapElements(
				taleMapEl.current,
				taleTree,
				className,
				activePageId,
				visitedPages,
				taleFinishDestinations
			);

		}

		setHasTaleMapContent(!!taleMapSvg);

	}, [ activePageId, !!taleTree, JSON.stringify(visitedPages) ]);

	return (
		<div className={className}>
			<div className={`${className}__content`} ref={taleMapEl} />
			{!hasTaleMapContent ? (<TaleMapEmptyContent />) : null}
		</div>
	);

}

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape),
	activePageId: PropTypes.string,
	taleFinishDestinations: PropTypes.arrayOf(PropTypes.string),
	visitedPages: PropTypes.arrayOf(PropTypes.string)
};

export default TaleMap;
