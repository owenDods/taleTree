import React from 'react';

import getRouteLabel from './utils/getRouteLabel';

export const className = 'topBar';

const TopBar = () => (

	<div className={className}>

		<h1>{getRouteLabel()}</h1>

	</div>

);

export default TopBar;
