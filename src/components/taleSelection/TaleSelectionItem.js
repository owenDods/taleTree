import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleSelectionItem';

const TaleSelectionItem = ({ name, img }) => (

	<BackgroundImg classes={className} imgUrl={img}>

		<label>{name}</label>

	</BackgroundImg>

);

TaleSelectionItem.propTypes = {
	name: PropTypes.string,
	img: PropTypes.string
};

export default TaleSelectionItem;
