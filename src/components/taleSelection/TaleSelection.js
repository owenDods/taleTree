import React from 'react';

import Collection from '../collection/Collection';
import TaleSelectionItem from './TaleSelectionItem';

export const className = 'taleSelection';

const dummyTales = [
	{
		id: 1,
		name: 'Tale 1',
		img: 'https://placeimg.com/640/480/any'
	},
	{
		id: 2,
		name: 'Tale 2',
		img: 'https://placeimg.com/630/480/any'
	},
	{
		id: 3,
		name: 'Tale 3',
		img: 'https://placeimg.com/650/480/any'
	},
	{
		id: 4,
		name: 'Tale 4',
		img: 'https://placeimg.com/620/480/any'
	},
	{
		id: 5,
		name: 'Tale 5',
		img: 'https://placeimg.com/660/480/any'
	},
	{
		id: 6,
		name: 'Tale 6',
		img: 'https://placeimg.com/640/470/any'
	},
	{
		id: 7,
		name: 'Tale 7',
		img: 'https://placeimg.com/640/490/any'
	},
	{
		id: 8,
		name: 'Tale 8',
		img: 'https://placeimg.com/640/460/any'
	},
	{
		id: 9,
		name: 'Tale 9',
		img: 'https://placeimg.com/640/450/any'
	}
];

const TaleSelection = () => (

	<div className={className}>

		<Collection
			name={className}
			items={dummyTales}
		>

			<TaleSelectionItem />

		</Collection>

	</div>

);

export default TaleSelection;
