import React from 'react';

import TaleTree from '../../img/taleTree.svg';

export const className = 'taleMapEmptyContent';

function TaleMapEmptyContent() {

	return (

		<div className={className}>

			<TaleTree className={`${className}__icon`} />

			<p>Your TaleTree will grow here to map your progress through this tale</p>

		</div>

	);

}

export default TaleMapEmptyContent;
