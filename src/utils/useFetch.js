import { useState, useEffect } from 'react';

import getFetchRequest from './getFetchRequest';

function useFetch(url) {

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ hasCompletedInitialFetch, setHasCompletedInitialFetch ] = useState(false);

	useEffect(() => {

		const fetchData = getFetchRequest(
			url,
			{
				setLoading,
				setData,
				setError,
				setHasCompletedInitialFetch
			}
		);

		fetchData();

	}, []);

	return { data, loading, error, hasCompletedInitialFetch };

}

export default useFetch;
