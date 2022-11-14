import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MainLogo from '../mainLogo/MainLogo';

function AppHeaderContent({ appHeaderTitle, appHeaderLinkTo }) {

	return (

		<>

			<MainLogo />

			<h2>

				{appHeaderLinkTo
					? (<Link to={appHeaderLinkTo}>{appHeaderTitle}</Link>) : appHeaderTitle}

			</h2>

		</>

	);

}

AppHeaderContent.propTypes = {
	appHeaderTitle: PropTypes.string,
	appHeaderLinkTo: PropTypes.string
};

export default AppHeaderContent;
