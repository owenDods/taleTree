import getOr from 'lodash/fp/getOr';

import { dataByRoute } from '../../../routes';

export default pathname => {

	const { 0: baseRoute } = pathname.match(/^\/\w*/);

	const destination = getOr(null, `${baseRoute}.backDestination`, dataByRoute);
	const destinationLabel = destination ? getOr(null, `${destination}.label`, dataByRoute) : null;

	return {
		destination,
		destinationLabel
	};

};
