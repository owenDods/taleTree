import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleStart';

const TaleStart = ({ tale, talePath }) => {

	const [ redirectToTaleStart, setRedirectToTaleStart ] = useState(false);
	const startPageId = get('startPage', tale);

	if (redirectToTaleStart && startPageId) {

		return (

			<Redirect to={`${talePath}/${startPageId}`} push />

		);

	}

	const handleTaleStart = () => {

		setRedirectToTaleStart(true);

	};

	return (

		<div className={className}>

			<BackgroundImg
				imgUrl={get('img', tale)}
				component={(<div className={`${className}__img`} />)}
			>

				<h1>{get('name', tale)}</h1>

			</BackgroundImg>

			<p className={`${className}__summary`}>{get('summary', tale)}</p>

			<button type="button" onClick={handleTaleStart}>Begin</button>

		</div>

	);

};

TaleStart.propTypes = {
	tale: PropTypes.shape(taleShape),
	talePath: PropTypes.string
};

export default TaleStart;
