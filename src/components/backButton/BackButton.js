import React from 'react';
import { useLocation } from 'react-router-dom';

import getDestinationFromPathname from './utils/getDestinationFromPathname';

export const className = 'backButton';

const BackButton = () => {

	const { pathname } = useLocation();
	const destination = getDestinationFromPathname(pathname);

	return !!destination && (<div className={className} />);

};

export default BackButton;
