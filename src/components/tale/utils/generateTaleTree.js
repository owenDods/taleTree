import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';
import findKey from 'lodash/fp/findKey';

import { checkIsPageId } from '../../../routes';

export default (pageCollection, taleFinishDestinations) => {

	const pageCollectionAsIdRelationships = map(({ id, parentPageId, destinationCollection }) => {

		const destinationCollectionAsRelevantStrings = map(({ destination, address }) => (

			destination || address

		), destinationCollection);

		return {
			id,
			parentPageId,
			destinationCollection: filter(destinationString => (

				taleFinishDestinations.includes(destinationString) || checkIsPageId(destinationString)

			), destinationCollectionAsRelevantStrings)
		};

	}, pageCollection);

	const idToPageRelationshipMap = reduce((acc, curr) => {

		acc[curr.id] = curr;

		return acc;

	}, {}, pageCollectionAsIdRelationships);

	const rootId = findKey(({ parentPageId }) => !parentPageId, idToPageRelationshipMap);

	const populateBranches = parentBranchId => {

		const isFinish = taleFinishDestinations.includes(parentBranchId);
		const childBranches = isFinish
			? [] : idToPageRelationshipMap[parentBranchId].destinationCollection;

		return {
			value: parentBranchId,
			isFinish,
			children: map(populateBranches, childBranches)
		};

	};

	return rootId ? populateBranches(rootId) : null;

};
