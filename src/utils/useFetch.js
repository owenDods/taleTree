import { useState, useEffect } from 'react';

import getFetchRequest from './getFetchRequest';

function useFetch(url, options = {}) {

	const { method = 'GET', payload } = options;

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ hasCompletedInitialFetch, setHasCompletedInitialFetch ] = useState(false);

	const fetchRequest = getFetchRequest(
		url,
		{
			method,
			payload,
			setLoading,
			setData,
			setError,
			setHasCompletedInitialFetch
		}
	);

	useEffect(() => {

		if (method === 'GET') {

			fetchRequest();

		}

	}, []);

	return {
		fetchRequest,
		data,
		loading,
		error,
		hasCompletedInitialFetch
	};

}

export default useFetch;
