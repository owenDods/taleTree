import { useState } from 'react';

import getFetchRequest from './getFetchRequest';

function usePost(url, payload) {

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ hasCompletedInitialFetch, setHasCompletedInitialFetch ] = useState(false);

	const post = getFetchRequest(
		url,
		{
			method: 'POST',
			payload,
			setLoading,
			setData,
			setError,
			setHasCompletedInitialFetch
		}
	);

	return { post, data, loading, error, hasCompletedInitialFetch };

}

export default usePost;
