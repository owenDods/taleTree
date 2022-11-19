import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tick from '../../img/tick.svg';
import Dash from '../../img/dash.svg';
import TaleMap from '../../img/taleMap.svg';

export const className = 'taleProgressSummary';

function TaleProgressSummary({ id, finishedTales, loading, resetVisitedPages, noVisitedPages }) {

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

				<Fragment>

					<div className={`${className}__finishStatus`}>

						<p>You have {hasFinishedThisTale ? '' : 'not '}finished this tale</p>

						{hasFinishedThisTale
							? (<Tick className={`${className}__finished`} />)
							: (<Dash className={`${className}__finished`} />)}

					</div>

					<button
						type="button"
						className={`${className}__resetButton`}
						disabled={!hasFinishedThisTale || noVisitedPages}
						onClick={() => resetVisitedPages()}
					>
						<div className={`${className}__resetButtonText`}>
							<span>Reset TaleTree for this tale</span>
							<span className={`${className}__resetButtonExplanation`}>
								({hasFinishedThisTale
									? 'It will still be marked as finished'
									: 'You can reset once this tale has been finished'}
								)
							</span>
						</div>
						<TaleMap />
					</button>

				</Fragment>

			)}

		</div>

	);

}

TaleProgressSummary.propTypes = {
	id: PropTypes.string,
	finishedTales: PropTypes.arrayOf(PropTypes.string),
	loading: PropTypes.bool,
	resetVisitedPages: PropTypes.func,
	noVisitedPages: PropTypes.bool
};

export default TaleProgressSummary;
