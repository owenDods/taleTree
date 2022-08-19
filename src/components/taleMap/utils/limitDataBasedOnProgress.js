import map from 'lodash/fp/map';

function limitDataBasedOnProgress(taleTree, activePageId, visitedPages = []) {

	const cloneTreeDataItemIfItHasBeenReached = taleTreeDataItem => {

		const { value, children } = taleTreeDataItem;
		let clonedTaleTreeDataItem = { ...taleTreeDataItem, children: [] };

		if (visitedPages.includes(value) || value === activePageId) {

			clonedTaleTreeDataItem = {
				...clonedTaleTreeDataItem,
				children: map(cloneTreeDataItemIfItHasBeenReached, children)
			};

		}

		return clonedTaleTreeDataItem;

	};

	const limitedData = { ...cloneTreeDataItemIfItHasBeenReached(taleTree) };

	return limitedData;

}

export default limitDataBasedOnProgress;
