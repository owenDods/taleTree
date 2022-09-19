import React from 'react';
import PropTypes from 'prop-types';

import MainLogo from '../mainLogo/MainLogo';

function AppHeaderContent({ appHeaderTitle }) {

	return (

		<>

			<MainLogo />

			<h2>{appHeaderTitle}</h2>

		</>

	);

}

AppHeaderContent.propTypes = {
	appHeaderTitle: PropTypes.string
};

export default AppHeaderContent;
