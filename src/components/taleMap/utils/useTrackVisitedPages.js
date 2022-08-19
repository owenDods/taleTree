import { useEffect } from 'react';

import useLocalStorageState from '../../../utils/useLocalStorageState';

function useTrackVisitedPages(taleId, activePageId) {

	const visitedPagesKey = `taleTree_visitedPages_${taleId}`;
	const [ visitedPages, setVisitedPages ] = useLocalStorageState(visitedPagesKey, []);

	useEffect(() => {

		setVisitedPages(currentVisitedPages => {

			const updatedUniqueVisitedPages = [ ...new Set([ ...currentVisitedPages, activePageId ]) ];

			return updatedUniqueVisitedPages;

		});

	}, [ activePageId ]);

	return visitedPages;

}

export default useTrackVisitedPages;
