import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { dataByRoute } from '../../../routes';

export default pathname => {

	const { 0: baseRoute } = pathname.match(/^\/\w*/);

	const backData = get(`${baseRoute}.backData`, dataByRoute);

	const routeToMatch = get('routeToMatch', backData);
	const routeMatches = routeToMatch ? routeToMatch.test(pathname) : true;

	const destination = routeMatches ? getOr(null, 'destination', backData) : null;
	const destinationLabel = destination ? getOr(null, `${destination}.label`, dataByRoute) : null;

	return {
		destination,
		destinationLabel
	};

};
