import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import classnames from 'classnames';

import Triangle from '../../img/triangle.svg';

import getDestinationDataFromPathname from './utils/getDestinationDataFromPathname';

export const className = 'backButton';

function BackButton() {

	const { pathname } = useLocation();
	const {
		destination,
		destinationLabel,
		icon: Icon,
		customClass
	} = getDestinationDataFromPathname(pathname);

	return !!destination && (

		<Link
			className={classnames(className, customClass ? `${className}--${customClass}` : null)}
			to={destination}
			title={destinationLabel}
		>

			{Icon ? <Icon /> : <Triangle />}

		</Link>

	);

}

export default BackButton;
