import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import map from 'lodash/fp/map';

import placeholderCollection from './utils/placeholderCollection';

export const className = 'collection';

function Collection({ name, items, loading, children }) {

	const itemsToRender = loading ? placeholderCollection : items;

	return (
		<div className={classnames(className, { [`${className}--loading`]: loading })}>

			{map.convert({ cap: false })(item => (

				<div
					className={`${className}__item`}
					key={`${className}-${name}-${item.id}`}
				>

					{!loading && cloneElement(children, item)}

				</div>

			), itemsToRender)}

		</div>
	);

}

Collection.propTypes = {
	name: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]).isRequired
	})),
	loading: PropTypes.bool,
	children: PropTypes.element.isRequired
};

export default Collection;
