import React from 'react';

import useFetch from '../../utils/useFetch';

import Collection from '../collection/Collection';
import TaleSelectionItem from './TaleSelectionItem';

export const className = 'taleSelection';

function TaleSelection() {

	const { data: taleCollection, loading } = useFetch('taleCollection');

	return (
		<div className={className}>

			<h1 className={`${className}__heading`}>Tale Selection</h1>

			<Collection
				name={className}
				items={taleCollection}
				loading={loading}
			>

				<TaleSelectionItem />

			</Collection>

		</div>
	);

}

export default TaleSelection;
