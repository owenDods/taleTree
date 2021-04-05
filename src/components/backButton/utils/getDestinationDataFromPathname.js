import get from 'lodash/fp/get';
import find from 'lodash/fp/find';
import getOr from 'lodash/fp/getOr';

import { dataByRoute } from '../../../routes';

export default pathname => {

	const { 0: baseRoute } = pathname.match(/^\/\w*/);

	const backData = get(`${baseRoute}.backData`, dataByRoute);
	const backDataWithMatchingRoute = find(({ routeToMatch }) => (

		routeToMatch ? routeToMatch.test(pathname) : false

	), backData);

	const destination = getOr(null, 'destination', backDataWithMatchingRoute);
	const destinationLabel = getOr(null, 'destinationLabel', backDataWithMatchingRoute) || `Back to ${getOr(null, `${destination}.label`, dataByRoute)}`;
	const icon = getOr(null, 'icon', backDataWithMatchingRoute);
	const customClass = getOr(null, 'customClass', backDataWithMatchingRoute);

	return {
		destination,
		destinationLabel,
		icon,
		customClass
	};

};
