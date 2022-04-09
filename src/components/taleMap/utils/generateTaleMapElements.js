import React from 'react';
import classnames from 'classnames';

import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import uniqBy from 'lodash/fp/uniqBy';
import forEach from 'lodash/fp/forEach';
import forEachRight from 'lodash/fp/forEachRight';
import reject from 'lodash/fp/reject';
import includes from 'lodash/fp/includes';

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

const convertDataToTreeLevels = groupedData => {

	const dataAsTreeLevels = [];

	const populateTreeLevels = (id, level = 0) => {

		const treeLevelIdCollection = map('value', groupedData[id]);

		const currentLevel = dataAsTreeLevels[level] || [];

		dataAsTreeLevels[level] = [ ...currentLevel, ...treeLevelIdCollection ];

		forEach(treeLevelId => {

			const { [treeLevelId]: children } = groupedData;

			if (children) {

				const nextLevel = level + 1;

				populateTreeLevels(treeLevelId, nextLevel);

			}

		}, treeLevelIdCollection);

	};

	populateTreeLevels(rootParentId);

	let loggedIds = [];

	forEachRight.convert({ cap: false })((treeLevelIds, levelIndex) => {

		const filteredIds = reject(treeLevelId => includes(treeLevelId, loggedIds), treeLevelIds);

		dataAsTreeLevels[levelIndex] = filteredIds;

		loggedIds = [ ...loggedIds, ...filteredIds ];

	}, dataAsTreeLevels);

	return dataAsTreeLevels;

};

export default (taleTree, className) => {

	const flattenedData = flattenTaleTreeData(taleTree);
	const groupedData = flow(
		groupBy('parentId'),
		mapValues(uniqBy(({ value, parentId }) => `${parentId}-${value}`))
	)(flattenedData);

	const dataAsTreeLevels = convertDataToTreeLevels(groupedData);

	const taleMapElements = map.convert({ cap: false })((treeLevelIds, levelIndex) => {

		const treeLevelKey = `treeLevel-${treeLevelIds.join('_')}`;

		return (
			<div
				key={treeLevelKey}
				className={`${className}__treeLevel`}
			>

				{map(treeLevelId => (

					<div
						key={`${treeLevelKey}-${treeLevelId}`}
						className={classnames(
							`${className}__node`,
							{ [`${className}__node--start`]: levelIndex === 0 },
							{ [`${className}__node--end`]: levelIndex === dataAsTreeLevels.length - 1 }
						)}
					>
						{treeLevelId}
					</div>

				), treeLevelIds)}

			</div>
		);

	}, dataAsTreeLevels);

	return taleMapElements;

};
