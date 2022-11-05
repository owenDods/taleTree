import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../../utils/useFetch';

const AccountContext = createContext();

function useAccount() {

	const context = useContext(AccountContext);

	if (!context) {

		throw new Error('useAccount must be used within an AccountProvider');

	}

	return context;

}

function AccountProvider({ children }) {

	const { data: account, fetchRequest: fetchAccount } = useFetch('account');

	const value = useMemo(() => ({ account, fetchAccount }), [ JSON.stringify(account) ]);

	return (
		<AccountContext.Provider value={value}>

			{children}

		</AccountContext.Provider>
	);

}

AccountProvider.propTypes = {
	children: PropTypes.node
};

export { AccountProvider, useAccount };
