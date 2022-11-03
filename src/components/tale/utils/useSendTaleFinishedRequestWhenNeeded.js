import { useEffect } from 'react';

import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import includes from 'lodash/fp/includes';

import usePost from '../../../utils/usePost';

function useSendTaleFinishedRequestWhenNeeded(destinations, taleFinishDestinations, taleId) {

	const destinationStrings = map('destination', destinations);
	const isFinish = some(destinationString => (
		includes(destinationString, taleFinishDestinations)
	), destinationStrings);

	const { post, hasCompletedInitialFetch } = usePost('account', { taleId });

	useEffect(() => {

		if (isFinish && !hasCompletedInitialFetch) {

			post();

		}

	}, [ JSON.stringify(destinations), JSON.stringify(taleFinishDestinations), taleId ]);

}

export default useSendTaleFinishedRequestWhenNeeded;
