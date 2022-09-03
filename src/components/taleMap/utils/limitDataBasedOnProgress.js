import map from 'lodash/fp/map';

function limitDataBasedOnProgress(taleTree, activePageId, visitedPages = []) {

	const conditionallyCloneTreeDataItem = taleTreeDataItem => {

		const { value, children } = taleTreeDataItem;
		let clonedTaleTreeDataItem = { ...taleTreeDataItem, children: [] };

		if (visitedPages.includes(value) || value === activePageId) {

			clonedTaleTreeDataItem = {
				...clonedTaleTreeDataItem,
				children: map(conditionallyCloneTreeDataItem, children)
			};

		}

		return clonedTaleTreeDataItem;

	};

	const limitedData = { ...conditionallyCloneTreeDataItem(taleTree) };

	return limitedData;

}

export default limitDataBasedOnProgress;
