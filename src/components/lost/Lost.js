import React from 'react';

import getLostLinks from './utils/getLostLinks';

export const className = 'lost';

function Lost() {

	return (
		<div className={className}>

			<h1>Hmm, we seem to have gotten you lost...</h1>

			<p>Try some of the links below to get your bearings</p>

			{getLostLinks()}

		</div>
	);

}

export default Lost;
