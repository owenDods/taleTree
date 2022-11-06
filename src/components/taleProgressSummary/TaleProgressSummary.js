import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tick from '../../img/tick.svg';
import Dash from '../../img/dash.svg';

export const className = 'taleProgressSummary';

function TaleProgressSummary({ id, finishedTales, loading }) {

	const hasFinishedThisTale = finishedTales.includes(id);

	return (

		<div
			className={
				classnames(
					className,
					{
						[`${className}--finished`]: hasFinishedThisTale,
						[`${className}--loading`]: loading
					}
				)
			}
		>

			{!loading && (

				<div className={`${className}__finishStatus`}>

					<p>You have {hasFinishedThisTale ? '' : 'not '}finished this tale</p>

					{hasFinishedThisTale
						? (<Tick className={`${className}__finished`} />)
						: (<Dash className={`${className}__finished`} />)}

				</div>

			)}

		</div>

	);

}

TaleProgressSummary.propTypes = {
	id: PropTypes.string,
	finishedTales: PropTypes.arrayOf(PropTypes.string),
	loading: PropTypes.bool
};

export default TaleProgressSummary;
