import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';

import { useAccount } from '../app/utils/accountContext';

import TaleHeroImage from '../taleHeroImage/TaleHeroImage';

export const className = 'taleStart';

function TaleStart({ img, title, id, author, summary, startPageDestination, loading }) {

	const { account } = useAccount();
	const finishedTales = getOr([], 'finishedTales', account);

	return (
		<div className={classnames(className, { [`${className}--loading`]: loading })}>

			<TaleHeroImage
				title={title}
				img={img}
				id={id}
				author={author}
				finishedTales={finishedTales}
				header
			/>

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
	id: PropTypes.string,
	author: PropTypes.string,
	summary: PropTypes.string,
	startPageDestination: PropTypes.string,
	loading: PropTypes.bool
};

export default TaleStart;
