import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../../utils/useFetch';
import useLocalStorageState from '../../../utils/useLocalStorageState';

const AccountContext = createContext();

function useAccount() {

	const context = useContext(AccountContext);

	if (!context) {

		throw new Error('useAccount must be used within an AccountProvider');

	}

	return context;

}

function AccountProvider({ children }) {

	const { data: account, fetchRequest: fetchAccount, error } = useFetch('account');

	const value = useMemo(() => ({ account, fetchAccount }), [ JSON.stringify(account) ]);
	const [
		localStorageAccount,
		setLocalStorageAccount
	] = useLocalStorageState('taleTree_account', { finishedTales: [] });

	let accountValue = value;

	if (!account && error) {

		accountValue = { account: localStorageAccount, setLocalStorageAccount };

	}

	return (
		<AccountContext.Provider value={accountValue}>

			{children}

		</AccountContext.Provider>
	);

}

AccountProvider.propTypes = {
	children: PropTypes.node
};

export { AccountProvider, useAccount };
