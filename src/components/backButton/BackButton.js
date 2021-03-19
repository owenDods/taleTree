import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import Triangle from '../../img/triangle.svg';

import getDestinationDataFromPathname from './utils/getDestinationDataFromPathname';

export const className = 'backButton';

const BackButton = () => {

	const { pathname } = useLocation();
	const { destination, destinationLabel } = getDestinationDataFromPathname(pathname);

	return !!destination && (

		<Link
			className={className}
			to={destination}
			title={`Back to ${destinationLabel}`}
		>

			<Triangle />

		</Link>

	);

};

export default BackButton;
