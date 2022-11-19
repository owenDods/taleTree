import React from 'react';

import TaleMap from '../../img/taleMap.svg';

export const className = 'taleMapEmptyContent';

function TaleMapEmptyContent() {

	return (

		<div className={className}>

			<TaleMap className={`${className}__icon`} />

			<p>Your TaleTree will grow here to map your progress through this tale</p>

		</div>

	);

}

export default TaleMapEmptyContent;
