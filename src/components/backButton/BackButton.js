import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import Triangle from '../../img/triangle.svg';

import getDestinationFromPathname from './utils/getDestinationFromPathname';

export const className = 'backButton';

const BackButton = () => {

	const { pathname } = useLocation();
	const destination = getDestinationFromPathname(pathname);

	return !!destination && (

		<Link className={className} to={destination}>

			<Triangle />

		</Link>

	);

};

export default BackButton;
