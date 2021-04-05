import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import map from 'lodash/fp/map';

export const className = 'taleChoice';

const TaleChoice = ({ choices }) => (

	<div className={className}>

		{map(({ destination, label }) => (

			<Link
				className={`${className}__choice`}
				to={destination}
				key={`${className}-${destination}`}
			>

				<span>{label}</span>

			</Link>

		), choices)}

	</div>

);

TaleChoice.propTypes = {
	choices: PropTypes.arrayOf(PropTypes.shape({
		destination: PropTypes.string,
		label: PropTypes.string
	}))
};

export default TaleChoice;
