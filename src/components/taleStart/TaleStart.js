import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import get from 'lodash/fp/get';

import taleSummaryShape from '../shapes/taleSummaryShape';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleStart';

const TaleStart = ({ taleSummary, talePath }) => {

	const [ redirectToTaleStart, setRedirectToTaleStart ] = useState(false);
	const startPageId = get('startPage', taleSummary);

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
				imgUrl={get('img', taleSummary)}
				component={(<div className={`${className}__img`} />)}
			>

				<h1>{get('name', taleSummary)}</h1>

			</BackgroundImg>

			<p className={`${className}__summary`}>{get('summary', taleSummary)}</p>

			<button type="button" onClick={handleTaleStart}>Begin</button>

		</div>

	);

};

TaleStart.propTypes = {
	taleSummary: PropTypes.shape(taleSummaryShape),
	talePath: PropTypes.string
};

export default TaleStart;
