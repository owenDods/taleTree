import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';
import findKey from 'lodash/fp/findKey';

import { checkIsPageId } from '../../../routes';

export default pageCollection => {

	const pageCollectionAsIdRelationships = map(({ id, parentPageId, destinations }) => (

		{
			id,
			parentPageId,
			destinations: filter(checkIsPageId, map('destination', destinations))
		}

	), pageCollection);
	const idToPageRelationshipMap = reduce((acc, curr) => {

		acc[curr.id] = curr;

		return acc;

	}, {}, pageCollectionAsIdRelationships);

	const rootId = findKey(({ parentPageId }) => !parentPageId, idToPageRelationshipMap);

	const populateBranches = parentBranchId => {

		const childBranches = idToPageRelationshipMap[parentBranchId].destinations;

		return [ parentBranchId, map(populateBranches, childBranches) ];

	};

	return populateBranches(rootId);

};
