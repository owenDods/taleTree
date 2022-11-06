import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import taleShape from '../shapes/taleShape';

import Tick from '../../img/tick.svg';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleTitleAndAuthor from '../taleTitleAndAuthor/TaleTitleAndAuthor';

export const className = 'taleHeroImage';

function TaleHeroImage({ title, img, id, author, finishedTales }) {

	const hasFinishedThisTale = finishedTales.includes(id);

	return (
		<BackgroundImg
			imgUrl={img}
			component={(<Link className={className} to={`/tale/${id}/start`} />)}
		>

			<TaleTitleAndAuthor title={title} author={author} />

			{hasFinishedThisTale && <Tick className={`${className}__finished`} />}

		</BackgroundImg>
	);

}

TaleHeroImage.propTypes = {
	...taleShape,
	id: PropTypes.string,
	finishedTales: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TaleHeroImage;
