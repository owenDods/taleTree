import { useEffect } from 'react';

import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import includes from 'lodash/fp/includes';

import useFetch from '../../../utils/useFetch';

function useSendTaleFinishedRequestWhenNeeded(destinations, taleFinishDestinations, taleId) {

	const destinationStrings = map('destination', destinations);
	const isFinish = some(destinationString => (
		includes(destinationString, taleFinishDestinations)
	), destinationStrings);

	const payload = { finishedTales: taleId };
	const { fetchRequest, hasCompletedInitialFetch } = useFetch('account', { method: 'PUT', payload });

	useEffect(() => {

		if (isFinish && !hasCompletedInitialFetch) {

			fetchRequest();

		}

	}, [ JSON.stringify(destinations), JSON.stringify(taleFinishDestinations), taleId ]);

}

export default useSendTaleFinishedRequestWhenNeeded;
