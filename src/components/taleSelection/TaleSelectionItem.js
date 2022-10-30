import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleTitleAndAuthor from '../taleTitleAndAuthor/TaleTitleAndAuthor';

export const className = 'taleSelectionItem';

function TaleSelectionItem({ title, img, id, author }) {

	return (
		<BackgroundImg
			imgUrl={img}
			component={(<Link className={className} to={`/tale/${id}/start`} />)}
		>

			<TaleTitleAndAuthor title={title} author={author} />

		</BackgroundImg>
	);

}

TaleSelectionItem.propTypes = {
	...taleShape,
	id: PropTypes.string
};

export default TaleSelectionItem;
