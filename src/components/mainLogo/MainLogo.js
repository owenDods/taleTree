import React from 'react';
import { Link } from 'react-router-dom';

import TaleTree from '../../img/taleTree.svg';

export const className = 'mainLogo';

function MainLogo() {

	return (

		<h1 className={className}>

			<Link to="/">
				<TaleTree />
				<span>TaleTree</span>
			</Link>

		</h1>

	);

}

export default MainLogo;
