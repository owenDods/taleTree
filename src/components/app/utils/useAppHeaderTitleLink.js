import { useState } from 'react';

function useAppHeaderTitleLink() {

	const [ appHeaderTitle, setAppHeaderTitle ] = useState('');
	const [ appHeaderLinkTo, setAppHeaderLinkTo ] = useState('');

	const setAppHeaderTitleAndLinkTo = (title, linkTo = '') => {

		setAppHeaderTitle(title);
		setAppHeaderLinkTo(linkTo);

	};
	const clearAppHeaderTitleAndLinkTo = () => {

		setAppHeaderTitle('');
		setAppHeaderLinkTo('');

	};

	return {
		appHeaderTitle,
		appHeaderLinkTo,
		setAppHeaderTitleAndLinkTo,
		clearAppHeaderTitleAndLinkTo
	};

}

export default useAppHeaderTitleLink;
