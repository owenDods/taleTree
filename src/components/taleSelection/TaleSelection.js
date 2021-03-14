import React from 'react';

import Grid from '../grid/Grid';

export const className = 'taleSelection';

const dummyTales = [
	{
		id: 1,
		name: 'Tale 1'
	},
	{
		id: 2,
		name: 'Tale 2'
	},
	{
		id: 3,
		name: 'Tale 3'
	},
	{
		id: 4,
		name: 'Tale 4'
	},
	{
		id: 5,
		name: 'Tale 5'
	},
	{
		id: 6,
		name: 'Tale 6'
	},
	{
		id: 7,
		name: 'Tale 7'
	},
	{
		id: 8,
		name: 'Tale 8'
	},
	{
		id: 9,
		name: 'Tale 9'
	}
];

const TaleSelection = () => (

	<div className={className}>

		<Grid
			name={className}
			items={dummyTales}
		/>

	</div>

);

export default TaleSelection;
