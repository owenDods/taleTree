import { useHistory } from 'react-router-dom';
import getOr from 'lodash/fp/getOr';

export default activePage => {

	const pageDestinations = getOr([], 'destinations', activePage);
	const isDeadEnd = !pageDestinations.length;

	const { goBack } = useHistory();
	const destinations = isDeadEnd ? [ { destination: () => goBack(), label: 'Back' } ]
		: pageDestinations;

	return {
		destinations,
		isDeadEnd
	};

};
