import React from 'react';
import classnames from 'classnames';

import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import uniqBy from 'lodash/fp/uniqBy';
import forEach from 'lodash/fp/forEach';

const rootParentId = 'root';

const flattenTaleTreeData = taleTree => {

	const flattenedTreeArray = [];

	const convertTaleTreeDataToFlatArray = ({ value, children }, parentId) => {

		flattenedTreeArray.push({ value, parentId });

		map(child => convertTaleTreeDataToFlatArray(child, value), children);

	};

	convertTaleTreeDataToFlatArray(taleTree, rootParentId);

	return flattenedTreeArray;

};

export default (taleTree, className) => {

	console.log(taleTree);

	const flattenedData = flattenTaleTreeData(taleTree);
	const groupedData = flow(
		groupBy('parentId'),
		mapValues(uniqBy(({ value, parentId }) => `${parentId}-${value}`))
	)(flattenedData);

	console.log(flattenedData);
	console.log(groupedData);

	const dataAsTreeLevels = [];
	const populateTreeLevels = id => {

		const treeLevelIdCollection = map('value', groupedData[id]);

		dataAsTreeLevels.push(treeLevelIdCollection);

		forEach(treeLevelId => {

			const { [treeLevelId]: children } = groupedData;

			if (children) {

				populateTreeLevels(treeLevelId);

			}

		}, treeLevelIdCollection);

	};

	populateTreeLevels(rootParentId);
	console.log(dataAsTreeLevels);

	const taleMapElements = map(({ value, parentId }) => (
		<div
			key={`${parentId}-${value}`}
			className={classnames(
				`${className}__node`,
				{ [`${className}__node--start`]: parentId === rootParentId }
			)}
		>
			{value}
		</div>
	), flattenedData);

	return taleMapElements;

};
