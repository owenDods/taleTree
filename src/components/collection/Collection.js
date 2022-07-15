import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/fp/map';

export const className = 'collection';

function Collection({ name, items, children }) {

	return (
		<div className={className}>

			{map.convert({ cap: false })(item => (

				<div
					className={`${className}__item`}
					key={`${className}-${name}-${item.id}`}
				>

					{cloneElement(children, item)}

				</div>

			), items)}

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
	children: PropTypes.element.isRequired
};

export default Collection;
