import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import taleTreeShape from '../shapes/taleTreeShape';

import TaleMapEmptyContent from './TaleMapEmptyContent';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap({ taleTree, activePageId, taleFinishDestinations, visitedPages, loading }) {

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

	const shouldShowEmptyContent = !hasTaleMapContent && !loading;

	return (
		<div className={classnames(className, { [`${className}--loading`]: loading })}>
			<div className={`${className}__content`} ref={taleMapEl} />
			{shouldShowEmptyContent ? (<TaleMapEmptyContent />) : null}
		</div>
	);

}

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape),
	activePageId: PropTypes.string,
	taleFinishDestinations: PropTypes.arrayOf(PropTypes.string),
	visitedPages: PropTypes.arrayOf(PropTypes.string),
	loading: PropTypes.bool
};

export default TaleMap;
