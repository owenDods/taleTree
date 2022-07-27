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

		forEach(child => convertTaleTreeDataToFlatArray(child, value), children);

	};

	convertTaleTreeDataToFlatArray(taleTree, rootParentId);

	return flattenedTreeArray;

};

const convertDataToTreeLevels = flattenedData => {

	const dataAsTreeLevels = [];
	const groupedData = flow(
		groupBy('parentId'),
		mapValues(uniqBy(({ value, parentId }) => `${parentId}-${value}`))
	)(flattenedData);

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

	dataAsTreeLevels.pop();

	return dataAsTreeLevels;

};

export default (taleTree, className, activePageId) => {

	const flattenedData = flattenTaleTreeData(taleTree);
	const dataAsTreeLevels = convertDataToTreeLevels(flattenedData);

	const taleMapElements = map.convert({ cap: false })((treeLevelIds, levelIndex) => {

		const treeLevelKey = `treeLevel-${treeLevelIds.join('_')}`;
		const isStart = levelIndex === 0;
		const isEnd = levelIndex === dataAsTreeLevels.length - 1;

		return (
			<div
				key={treeLevelKey}
				className={classnames(
					`${className}__treeLevel`,
					{ [`${className}__treeLevel--start`]: isStart },
					{ [`${className}__treeLevel--end`]: isEnd }
				)}
			>

				{map(treeLevelId => (

					<div
						key={`${treeLevelKey}-${treeLevelId}`}
						className={classnames(
							`${className}__node`,
							{ [`${className}__node--start`]: isStart },
							{ [`${className}__node--end`]: isEnd },
							{ [`${className}__node--active`]: treeLevelId === activePageId }
						)}
					/>

				), treeLevelIds)}

			</div>
		);

	}, dataAsTreeLevels);

	return taleMapElements;

};
