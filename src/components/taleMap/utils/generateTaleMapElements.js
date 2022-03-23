import React from 'react';
import classnames from 'classnames';
import map from 'lodash/fp/map';
import isArray from 'lodash/fp/isArray';

export default (taleTree, className) => {

	const convertTaleTreeDataToElementArray = (treeNode, index) => {

		if (!isArray(treeNode)) {

			return (
				<div
					key={treeNode}
					className={classnames(
						`${className}__node`,
						{ [`${className}__node--start`]: index === 0 }
					)}
				/>
			);

		}

		return map(convertTaleTreeDataToElementArray, treeNode);

	};

	const mapElements = map.convert({ cap: false })(convertTaleTreeDataToElementArray, taleTree);

	return mapElements.reverse();

};
