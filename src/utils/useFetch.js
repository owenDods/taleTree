import { useState, useEffect } from 'react';

function useFetch(url) {

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	useEffect(() => {

		const fetchData = async () => {

			setLoading(true);

			try {

				let response = await fetch(
					`http://localhost:3000/${url}`
				);

				if (!response.ok) {

					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);

				}

				response = await response.json();

				setData(response);
				setError(null);

			} catch (err) {

				setData(null);
				setError(err.message);

			} finally {

				setLoading(false);

			}

		};

		fetchData();

	}, []);

	return { data, loading, error };

}

export default useFetch;
