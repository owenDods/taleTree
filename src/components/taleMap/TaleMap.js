import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import taleTreeShape from '../shapes/taleTreeShape';

import generateTaleMapElements from './utils/generateTaleMapElements';
import generateTaleMapElementsv2 from './utils/generateTaleMapElementsv2';

export const className = 'taleMap';

function TaleMap({ taleTree, activePageId }) {

	const woopEl = useRef(null);

	useEffect(() => {

		generateTaleMapElementsv2(woopEl.current, taleTree, className);

	}, []);

	return (
		<Fragment>

			<div className={className}>

				{generateTaleMapElements(taleTree, className, activePageId)}

			</div>

			<div
				className="woop"
				style={{ position: 'absolute', zIndex: 99999, display: 'flex' }}
				ref={woopEl}
			/>

		</Fragment>
	);

}

TaleMap.propTypes = {
	taleTree: PropTypes.shape(taleTreeShape),
	activePageId: PropTypes.string
};

export default TaleMap;
