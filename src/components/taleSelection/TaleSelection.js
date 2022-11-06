import React from 'react';

import getOr from 'lodash/fp/getOr';

import useFetch from '../../utils/useFetch';
import { useAccount } from '../app/utils/accountContext';

import Collection from '../collection/Collection';
import TaleSelectionItem from './TaleSelectionItem';

export const className = 'taleSelection';

function TaleSelection() {

	const { account } = useAccount();
	const finishedTales = getOr([], 'finishedTales', account);
	const { data: taleCollection, loading } = useFetch('taleCollection');

	return (
		<div className={className}>

			<h1 className={`${className}__heading`}>Tale Selection</h1>

			<Collection
				name={className}
				items={taleCollection}
				loading={loading}
			>

				<TaleSelectionItem finishedTales={finishedTales} />

			</Collection>

		</div>
	);

}

export default TaleSelection;
