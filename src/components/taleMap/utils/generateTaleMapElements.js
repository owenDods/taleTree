import React, { Fragment } from 'react';
import classnames from 'classnames';

import map from 'lodash/fp/map';

export default (taleTree, className) => {

	console.log(taleTree);

	const convertTaleTreeDataToElementArray = ({ value, children }, isStart) => {

		console.log(value, children);

		return (
			<Fragment key={value}>
				<div
					className={classnames(
						`${className}__node`,
						{ [`${className}__node--start`]: isStart }
					)}
				>
					{value}
				</div>
				{map(convertTaleTreeDataToElementArray, children)}
			</Fragment>
		);

	};

	const mappedElements = convertTaleTreeDataToElementArray(taleTree, true);

	return mappedElements;

};
