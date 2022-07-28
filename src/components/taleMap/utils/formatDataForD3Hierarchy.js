import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import uniqBy from 'lodash/fp/uniqBy';
import forEach from 'lodash/fp/forEach';
import forEachRight from 'lodash/fp/forEachRight';
import includes from 'lodash/fp/includes';
import remove from 'lodash/fp/remove';
import cloneDeep from 'lodash/fp/cloneDeep';
import reject from 'lodash/fp/reject';

import { defaultTaleFinishDestination } from '../../../config';

const mutableRemove = remove.convert({ immutable: false });

const rootParentId = 'root';

function flattenTaleTreeData(taleTree) {

	const flattenedTreeArray = [];

	const convertTaleTreeDataToFlatArray = ({ value, children }, parentId) => {

		flattenedTreeArray.push({ value, parentId });

		forEach(child => convertTaleTreeDataToFlatArray(child, value), children);

	};

	convertTaleTreeDataToFlatArray(taleTree, rootParentId);

	return flattenedTreeArray;

}

function convertDataToTreeLevels(flattenedData) {

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

	return dataAsTreeLevels;

}

function getDuplicatedIdsAsTreeLevels(dataAsTreeLevels, taleFinishDestination) {

	let loggedIds = [];
	const idsRemovedFromTreeLevels = [];

	forEachRight(treeLevelIds => {

		const filteredIds = treeLevelIds.slice();
		const removedIds = mutableRemove(treeLevelId => (
			includes(treeLevelId, loggedIds)
		), filteredIds);

		loggedIds = [
			...loggedIds,
			...reject(id => id === taleFinishDestination, filteredIds)
		];

		idsRemovedFromTreeLevels.push(removedIds);

	}, dataAsTreeLevels);

	return idsRemovedFromTreeLevels.reverse();

}

function flagTaleTreeFallthroughPagesAndTrimChildren(taleTree, shallowerDuplicatedIdAsTreeLevels) {

	const flagTaleTreeDataItemAtLevel = (taleTreeDataItem, level = 0) => {

		const { value, children } = taleTreeDataItem;
		const shallowerDuplicatedIdsForThisLevel = shallowerDuplicatedIdAsTreeLevels[level];

		if (includes(value, shallowerDuplicatedIdsForThisLevel)) {

			// eslint-disable-next-line no-param-reassign
			taleTreeDataItem.fallThrough = true;
			// eslint-disable-next-line no-param-reassign
			taleTreeDataItem.children = [];

		} else if (children.length) {

			const nextLevel = level + 1;

			forEach(child => flagTaleTreeDataItemAtLevel(child, nextLevel), children);

		}

	};

	const taleTreeCopy = cloneDeep(taleTree);
	flagTaleTreeDataItemAtLevel(taleTreeCopy);

	return taleTreeCopy;

}

function trimRedundantDestinationLeaves(taleTree, taleFinishDestination) {

	const trimChildren = taleTreeDataItemChildren => {

		const trimmedChildren = reject(
			({ value }) => value === taleFinishDestination,
			taleTreeDataItemChildren
		);

		return map(trimmedChild => {

			const { children } = trimmedChild;

			if (children.length) {

				return {
					...trimmedChild,
					children: trimChildren(children)
				};

			}

			return trimmedChild;

		}, trimmedChildren);

	};

	const trimmedTaleTree = {
		...taleTree,
		children: trimChildren(taleTree.children)
	};

	return trimmedTaleTree;

}

function formatDataForD3Hierarchy(taleTree, taleFinishDestination = defaultTaleFinishDestination) {

	const flattenedData = flattenTaleTreeData(taleTree);
	const dataAsTreeLevels = convertDataToTreeLevels(flattenedData);
	const shallowerDuplicatedIdAsTreeLevels = getDuplicatedIdsAsTreeLevels(
		dataAsTreeLevels,
		taleFinishDestination
	);
	const flaggedAndTrimmedData = flagTaleTreeFallthroughPagesAndTrimChildren(
		taleTree,
		shallowerDuplicatedIdAsTreeLevels
	);
	const formattedData = trimRedundantDestinationLeaves(
		flaggedAndTrimmedData,
		taleFinishDestination
	);

	return formattedData;

}

export default formatDataForD3Hierarchy;
