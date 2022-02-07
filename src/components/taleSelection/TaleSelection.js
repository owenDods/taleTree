import React from 'react';
import PropTypes from 'prop-types';

import taleShape from '../shapes/taleShape';

import Collection from '../collection/Collection';
import TaleSelectionItem from './TaleSelectionItem';

export const className = 'taleSelection';

const TaleSelection = ({ tales }) => (

	<div className={className}>

		<h1 className={`${className}__heading`}>Tale Selection</h1>

		<Collection
			name={className}
			items={tales}
		>

			<TaleSelectionItem />

		</Collection>

	</div>

);

TaleSelection.propTypes = {
	tales: PropTypes.arrayOf(PropTypes.shape(taleShape))
};

export default TaleSelection;
