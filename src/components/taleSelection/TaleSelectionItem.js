import React from 'react';
import PropTypes from 'prop-types';

export const className = 'taleSelectionItem';

const TaleSelectionItem = ({ name }) => (

	<div className={className}>

		<label>{name}</label>

	</div>

);

TaleSelectionItem.propTypes = {
	name: PropTypes.string
};

export default TaleSelectionItem;
