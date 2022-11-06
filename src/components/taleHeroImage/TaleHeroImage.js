import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

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
		header,
		loading
	} = props;

	const hasFinishedThisTale = finishedTales.includes(id);
	const classNames = classnames(className, { [`${className}--loading`]: loading });
	const component = getLinkTo
		? (<Link to={getLinkTo(props)} className={classNames} />) : (<div className={classNames} />);

	return (
		<BackgroundImg
			imgUrl={img}
			component={component}
		>

			{!loading && (

				<Fragment>

					<TaleTitleAndAuthor title={title} author={author} header={header} />

					{hasFinishedThisTale && <Tick className={`${className}__finished`} />}

				</Fragment>

			)}

		</BackgroundImg>
	);

}

TaleHeroImage.propTypes = {
	...taleShape,
	id: PropTypes.string,
	finishedTales: PropTypes.arrayOf(PropTypes.string).isRequired,
	getLinkTo: PropTypes.func,
	header: PropTypes.bool,
	loading: PropTypes.bool
};

export default TaleHeroImage;
