import React from 'react';
import { Link } from 'react-router-dom';

export const className = 'mainLogo';

function MainLogo() {

	return (

		<h1 className={className}>

			<Link to="/">TaleTree</Link>

		</h1>

	);

}

export default MainLogo;
