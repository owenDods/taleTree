import React from 'react';
import classnames from 'classnames';

import map from 'lodash/fp/map';

const flattenTaleTreeData = taleTree => {

	const flattenedTreeArray = [];

	const convertTaleTreeDataToFlatArray = ({ value, children }, parentId) => {

		flattenedTreeArray.push({ value, parentId });

		map(child => convertTaleTreeDataToFlatArray(child, value), children);

	};

	convertTaleTreeDataToFlatArray(taleTree);

	return flattenedTreeArray;

};

export default (taleTree, className) => {

	console.log(taleTree);

	const flattenedTaleTreeData = flattenTaleTreeData(taleTree);

	const taleMapElements = map(({ value, parentId = '' }) => (
		<div
			key={`${parentId}-${value}`}
			className={classnames(
				`${className}__node`,
				{ [`${className}__node--start`]: !parentId }
			)}
		>
			{value}
		</div>
	), flattenedTaleTreeData);

	console.log(flattenedTaleTreeData);

	return taleMapElements;

};
