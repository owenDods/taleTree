import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleSelectionItem';

function TaleSelectionItem({ title, img, id, author }) {

	return (
		<BackgroundImg
			imgUrl={img}
			component={(<Link className={className} to={`/tale/${id}/start`} />)}
		>

			<div className={`${className}__titleAndAuthor`}>

				<p>{title}</p>

				<p className={`${className}__author`}>By {author}</p>

			</div>

		</BackgroundImg>
	);

}

TaleSelectionItem.propTypes = {
	...taleShape,
	id: PropTypes.string
};

export default TaleSelectionItem;
