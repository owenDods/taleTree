import React from 'react';
import { Link } from 'react-router-dom';

import reduce from 'lodash/fp/reduce';

import { dataByRoute } from '../../../routes';

export default () => reduce.convert({ cap: false })((acc, curr, key) => {

	if (!curr.lostSuggestion) {

		return acc;

	}

	return acc.concat(

		<Link key={key} to={key}>{curr.label}</Link>

	);

}, [], dataByRoute);
