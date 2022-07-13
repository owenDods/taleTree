import { useNavigate } from 'react-router-dom';

import getOr from 'lodash/fp/getOr';
import map from 'lodash/fp/map';

import { defaultTaleFinishDestination } from '../../../config';

export default (activePage, talePath, taleFinishDestination = defaultTaleFinishDestination) => {

	const pageDestinations = getOr([], 'destinations', activePage);
	const isDeadEnd = !pageDestinations.length;

	const navigate = useNavigate();
	let destinations;

	if (isDeadEnd) {

		destinations = [ { destination: () => navigate(-1), label: 'Back' } ];

	} else {

		destinations = map(pageDestination => {

			const destinationString = pageDestination.destination;
			const formattedDestinationString = destinationString === taleFinishDestination
				? destinationString : `${talePath}/${destinationString}`;

			return {
				...pageDestination,
				destination: formattedDestinationString
			};

		}, pageDestinations);

	}

	return {
		destinations,
		isDeadEnd
	};

};
