import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleSelectionItem';

const TaleSelectionItem = ({ name, img, id }) => (

	<BackgroundImg
		imgUrl={img}
		component={(<Link className={className} to={`/tale/${id}/start`} />)}
	>

		<p>{name}</p>

	</BackgroundImg>

);

TaleSelectionItem.propTypes = {
	...taleShape,
	id: PropTypes.string
};

export default TaleSelectionItem;
