import { useState, useEffect } from 'react';

function useTrackVisitedPages(activePageId) {

	const [ visitedPages, setVisitedPages ] = useState([]);

	useEffect(() => {

		setVisitedPages(currentVisitedPages => {

			const updatedUniqueVisitedPages = [ ...new Set([ ...currentVisitedPages, activePageId ]) ];

			return updatedUniqueVisitedPages;

		});

	}, [ activePageId ]);

	return visitedPages;

}

export default useTrackVisitedPages;
