import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import BackgroundImg from '../backgroundImg/BackgroundImg';

export const className = 'taleStart';

function TaleStart({ img, title, summary, startPageDestination, loading }) {

	return (
		<div className={classnames(className, { [`${className}--loading`]: loading })}>

			<BackgroundImg
				imgUrl={img}
				component={(<div className={`${className}__img`} />)}
			>

				{title ? (<h2>{title}</h2>) : null}

			</BackgroundImg>

			<p className={`${className}__summary`}>{summary}</p>

			{loading
				? (<p className={`${className}__startLink`}><span>Begin</span></p>)
				: (<Link className={`${className}__startLink`} to={startPageDestination}>Begin</Link>)}

		</div>
	);

}

TaleStart.propTypes = {
	img: PropTypes.string,
	title: PropTypes.string,
	summary: PropTypes.string,
	startPageDestination: PropTypes.string,
	loading: PropTypes.bool
};

export default TaleStart;
