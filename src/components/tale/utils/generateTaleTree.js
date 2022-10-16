import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';
import findKey from 'lodash/fp/findKey';

import { checkIsPageId } from '../../../routes';
import { defaultTaleFinishDestination } from '../../../config';

export default (pageCollection, taleFinishDestination = defaultTaleFinishDestination) => {

	const pageCollectionAsIdRelationships = map(({ id, parentPageId, destinations }) => (

		{
			id,
			parentPageId,
			destinations: filter(destinationString => (

				destinationString === taleFinishDestination || checkIsPageId(destinationString)

			), map('destination', destinations))
		}

	), pageCollection);

	const idToPageRelationshipMap = reduce((acc, curr) => {

		acc[curr.id] = curr;

		return acc;

	}, {}, pageCollectionAsIdRelationships);

	const rootId = findKey(({ parentPageId }) => !parentPageId, idToPageRelationshipMap);

	const populateBranches = parentBranchId => {

		const isFinish = parentBranchId === taleFinishDestination;
		const childBranches = isFinish ? [] : idToPageRelationshipMap[parentBranchId].destinations;

		return {
			value: parentBranchId,
			isFinish,
			children: map(populateBranches, childBranches)
		};

	};

	return rootId ? populateBranches(rootId) : null;

};
