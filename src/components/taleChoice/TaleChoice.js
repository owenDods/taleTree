/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import map from 'lodash/fp/map';
import isFunction from 'lodash/fp/isFunction';

export const className = 'taleChoice';

function TaleChoice({ choices = [] }) {

	return (
		<div className={className} style={{ gridTemplateColumns: `repeat(${choices.length}, 1fr)` }}>

			{map(({ destination, label }) => {

				const destinationIsFunc = isFunction(destination);
				const DestinationElement = destinationIsFunc ? 'button' : Link;
				let destinationProps = {
					className: `${className}__choice`,
					key: `${className}-${destination}`,
					[destinationIsFunc ? 'onClick' : 'to']: destination
				};
				destinationProps = destinationIsFunc ? { ...destinationProps, type: 'button' } : destinationProps;

				return (

					<DestinationElement {...destinationProps}>

						<span>{label}</span>

					</DestinationElement>

				);

			}, choices)}

		</div>
	);

}

TaleChoice.propTypes = {
	choices: PropTypes.arrayOf(PropTypes.shape({
		destination: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.func
		]),
		label: PropTypes.string
	}))
};

export default TaleChoice;
