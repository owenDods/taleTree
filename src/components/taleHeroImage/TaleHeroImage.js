import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import taleShape from '../shapes/taleShape';

import Tick from '../../img/tick.svg';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleTitleAndAuthor from '../taleTitleAndAuthor/TaleTitleAndAuthor';

export const className = 'taleHeroImage';

function TaleHeroImage(props) {

	const {
		title,
		img,
		id,
		author,
		finishedTales,
		getLinkTo,
		header
	} = props;

	const hasFinishedThisTale = finishedTales.includes(id);
	const component = getLinkTo
		? (<Link to={getLinkTo(props)} className={className} />) : (<div className={className} />);

	return (
		<BackgroundImg
			imgUrl={img}
			component={component}
		>

			<TaleTitleAndAuthor title={title} author={author} header={header} />

			{hasFinishedThisTale && <Tick className={`${className}__finished`} />}

		</BackgroundImg>
	);

}

TaleHeroImage.propTypes = {
	...taleShape,
	id: PropTypes.string,
	finishedTales: PropTypes.arrayOf(PropTypes.string).isRequired,
	getLinkTo: PropTypes.func,
	header: PropTypes.bool
};

export default TaleHeroImage;
