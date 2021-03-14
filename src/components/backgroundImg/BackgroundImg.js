import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const className = 'backgroundImg';

const BackgroundImg = ({ classes, imgUrl, children }) => (

	<div
		className={classNames(classes, className)}
		style={{ backgroundImage: `url(${imgUrl})` }}
	>

		{children}

	</div>

);

BackgroundImg.propTypes = {
	classes: PropTypes.string,
	imgUrl: PropTypes.string,
	children: PropTypes.element
};

export default BackgroundImg;
