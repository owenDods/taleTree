import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';

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

	return [];

};
