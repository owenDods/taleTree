import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import taleTreeShape from '../shapes/taleTreeShape';

import TaleMapEmptyContent from './TaleMapEmptyContent';

import generateTaleMapElements from './utils/generateTaleMapElements';

export const className = 'taleMap';

function TaleMap(props) {

	const {
		taleTree,
		activePageId,
		taleFinishDestinations,
		visitedPages,
		loading,
		talePathUrl
	} = props;

	const taleMapEl = useRef(null);
	const [ hasMadeInitialGenerateAttempt, setHasMadeInitialGenerateAttempt ] = useState(false);
	const [ hasTaleMapContent, setHasTaleMapContent ] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {

		let taleMapSvg;

		if (taleTree) {

			const navigateToPage = pageId => navigate(`${talePathUrl}/${pageId}`);

			taleMapSvg = generateTaleMapElements(
				taleMapEl.current,
				taleTree,
				className,
				activePageId,
				visitedPages,
				taleFinishDestinations,
				navigateToPage
			);

			setHasMadeInitialGenerateAttempt(true);

		}

		setHasTaleMapContent(!!taleMapSvg);

	}, [ activePageId, !!taleTree, JSON.stringify(visitedPages) ]);

	const shouldShowEmptyContent = hasMadeInitialGenerateAttempt && !hasTaleMapContent && !loading;

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
	loading: PropTypes.bool,
	talePathUrl: PropTypes.string
};

export default TaleMap;
