import { useEffect } from 'react';

import useLocalStorageState from '../../../utils/useLocalStorageState';

function useTrackVisitedPages(taleId, activePageId) {

	const visitedPagesKey = `taleTree_visitedPages_${taleId}`;
	const [
		visitedPages,
		setVisitedPages,
		resetVisitedPages
	] = useLocalStorageState(visitedPagesKey, []);

	useEffect(() => {

		if (activePageId) {

			setVisitedPages(currentVisitedPages => {

				const updatedUniqueVisitedPages = [ ...new Set([ ...currentVisitedPages, activePageId ]) ];

				return updatedUniqueVisitedPages;

			});

		}

	}, [ activePageId ]);

	return { visitedPages, resetVisitedPages };

}

export default useTrackVisitedPages;
