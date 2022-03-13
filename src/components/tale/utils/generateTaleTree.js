import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import reduce from 'lodash/fp/reduce';

import { checkIsPageId } from '../../../routes';

export default pageCollection => {

	console.log(pageCollection);

	const pageCollectionAsIdRelationships = map(({ id, parentPageId, destinations }) => (

		{
			id,
			parentPageId,
			destinations: filter(checkIsPageId, map('destination', destinations))
		}

	), pageCollection);

	console.log(pageCollectionAsIdRelationships);

	const idToPageRelationshipMap = reduce((acc, curr) => {

		acc[curr.id] = curr;

		return acc;

	}, {}, pageCollectionAsIdRelationships);

	console.log(idToPageRelationshipMap);

	return [];

};
