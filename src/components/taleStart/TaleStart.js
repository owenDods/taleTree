import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';

import { useAccount } from '../app/utils/accountContext';

import TaleHeroImage from '../taleHeroImage/TaleHeroImage';
import TaleProgressSummary from '../taleProgressSummary/TaleProgressSummary';

export const className = 'taleStart';

function TaleStart({ img, title, id, author, summary, startPageDestination, loading }) {

	const { account } = useAccount();
	const finishedTales = getOr([], 'finishedTales', account);

	return (
		<div className={classnames(className, { [`${className}--loading`]: loading })}>

			<div className={`${className}__content`}>

				<TaleHeroImage
					title={title}
					img={img}
					id={id}
					author={author}
					finishedTales={finishedTales}
					header
					loading={loading}
				/>

				<div className={`${className}__summarySection`}>

					<p className={`${className}__summary`}>{summary}</p>

					<TaleProgressSummary
						id={id}
						finishedTales={finishedTales}
						loading={loading}
					/>

				</div>

				{loading
					? (<p className={`${className}__startLink`}><span>Begin</span></p>)
					: (<Link className={`${className}__startLink`} to={startPageDestination}>Begin</Link>)}

			</div>

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
