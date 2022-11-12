import { useState, useEffect } from 'react';

function getLocalStorageValue(key) {

	try {

		const localStorageValue = JSON.parse(localStorage.getItem(key));

		return localStorageValue;

	} catch (e) {

		return null;

	}

}

function setLocalStorageValue(key, value) {

	try {

		localStorage.setItem(key, value);

	} catch (e) {
		// Error handling tbc
	}

}

function useLocalStorageState(key, defaultValue = null) {

	const [ value, setValue ] = useState(getLocalStorageValue(key) || defaultValue);
	const stringifiedValue = JSON.stringify(value);

	useEffect(() => {

		setLocalStorageValue(key, stringifiedValue);

	}, [ stringifiedValue ]);

	const resetValue = () => setValue(defaultValue);

	return [ value, setValue, resetValue ];

}

export default useLocalStorageState;
