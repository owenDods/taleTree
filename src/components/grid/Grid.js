import React from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/fp/map';

export const className = 'grid';

const Grid = ({ name, items }) => (

	<div className={className}>

		{map.convert({ cap: false })(item => (

			<div key={`${className}-${name}-${item.id}`}>

				{item.name}

			</div>

		), items)}

	</div>

);

Grid.propTypes = {
	name: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]).isRequired
	}))
};

export default Grid;
