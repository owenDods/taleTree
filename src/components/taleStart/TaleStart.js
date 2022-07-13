import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleStart';

const TaleStart = ({ img, name, summary, startPageDestination }) => (

	<div className={className}>

		<BackgroundImg
			imgUrl={img}
			component={(<div className={`${className}__img`} />)}
		>

			<h2>{name}</h2>

		</BackgroundImg>

		<p className={`${className}__summary`}>{summary}</p>

		<Link to={startPageDestination}>Begin</Link>

	</div>

);

TaleStart.propTypes = {
	img: PropTypes.string,
	name: PropTypes.string,
	summary: PropTypes.string,
	startPageDestination: PropTypes.string
};

export default TaleStart;
