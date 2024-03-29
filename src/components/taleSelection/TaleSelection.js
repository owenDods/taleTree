import React from 'react';

import getOr from 'lodash/fp/getOr';

import useFetch from '../../utils/useFetch';
import { useAccount } from '../app/utils/accountContext';

import Collection from '../collection/Collection';
import TaleHeroImage from '../taleHeroImage/TaleHeroImage';

export const className = 'taleSelection';

function TaleSelection() {

	const { account } = useAccount();
	const finishedTales = getOr([], 'finishedTales', account);
	const { data: taleCollection, loading } = useFetch('taleCollection');

	return (
		<div className={className}>

			<div className={`${className}__content`}>

				<h1 className={`${className}__heading`}>Tale Selection</h1>

				<Collection
					name={className}
					items={taleCollection}
					loading={loading}
				>

					<TaleHeroImage
						finishedTales={finishedTales}
						getLinkTo={({ id }) => `/tale/${id}/start`}
					/>

				</Collection>

			</div>

		</div>
	);

}

export default TaleSelection;
