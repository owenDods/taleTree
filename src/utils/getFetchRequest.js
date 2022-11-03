function getFetchRequest(
	url,
	{
		method = 'GET',
		payload,
		setLoading = () => null,
		setData = () => null,
		setError = () => null,
		setHasCompletedInitialFetch = () => null
	}
) {

	return async () => {

		setLoading(true);

		try {

			let fetchOptions = {
				method,
				headers: {
					'Content-Type': 'application/json'
				}
			};

			if (payload) {

				fetchOptions = { ...fetchOptions, body: JSON.stringify(payload) };

			}

			let response = await fetch(
				`http://localhost:3000/${url}`,
				fetchOptions
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
			setHasCompletedInitialFetch(true);

		}

	};

}

export default getFetchRequest;
