import { useEffect } from 'react';

import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import includes from 'lodash/fp/includes';
import get from 'lodash/fp/get';

import useFetch from '../../../utils/useFetch';
import { useAccount } from '../../app/utils/accountContext';

function useSendTaleFinishedRequestWhenNeeded(destinations, taleFinishDestinations, taleId) {

	const payload = { finishedTales: taleId };
	const { fetchRequest: updateFinishedTalesForAccount } = useFetch('account', { method: 'PUT', payload });

	const { account, fetchAccount } = useAccount();
	const finishedTales = get('finishedTales', account);

	useEffect(() => {

		const destinationStrings = map('destination', destinations);
		const isFinish = some(destinationString => (
			includes(destinationString, taleFinishDestinations)
		), destinationStrings);

		const finishedTalesFetched = Array.isArray(finishedTales);
		const accountHasNotFinishedThisTale = finishedTalesFetched && !finishedTales.includes(taleId);

		if (isFinish && accountHasNotFinishedThisTale) {

			updateFinishedTalesForAccount()
				.then(() => fetchAccount());

		}

	}, [
		JSON.stringify(destinations),
		JSON.stringify(taleFinishDestinations),
		taleId,
		JSON.stringify(finishedTales)
	]);

}

export default useSendTaleFinishedRequestWhenNeeded;
