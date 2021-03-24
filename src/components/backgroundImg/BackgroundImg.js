import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const className = 'backgroundImg';

const BackgroundImg = ({ imgUrl, children, component = (<div />) }) => (

	cloneElement(
		component,
		{
			...component.props,
			style: {
				...component.props.style,
				backgroundImage: `url(${imgUrl})`
			},
			className: classNames(component.props.className, className)
		},
		children
	)

);

BackgroundImg.propTypes = {
	imgUrl: PropTypes.string,
	children: PropTypes.element,
	component: PropTypes.element
};

export default BackgroundImg;
