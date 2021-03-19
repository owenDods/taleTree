import React from 'react';
import PropTypes from 'prop-types';

import taleSummaryShape from '../shapes/taleSummaryShape';

import Collection from '../collection/Collection';
import TaleSelectionItem from './TaleSelectionItem';

export const className = 'taleSelection';

const TaleSelection = ({ taleSummaries }) => (

	<div className={className}>

		<Collection
			name={className}
			items={taleSummaries}
		>

			<TaleSelectionItem />

		</Collection>

	</div>

);

TaleSelection.propTypes = {
	taleSummaries: PropTypes.arrayOf(PropTypes.shape(taleSummaryShape))
};

export default TaleSelection;
