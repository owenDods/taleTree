import React, { Fragment } from 'react';

import map from 'lodash/fp/map';
import forEach from 'lodash/fp/forEach';

const formatStringWithBoldMarkdown = string => {

	const boldTagsArray = string.split('/b/');

	if (boldTagsArray.length === 1) {

		return string;

	}

	const boldMarkdownArray = [];

	forEach.convert({ cap: false })((boldStringSection, i) => {

		const key = `${string}-${boldStringSection}-${i}`;

		if (i % 2) {

			boldMarkdownArray.push(<b key={key}>{boldStringSection}</b>);

		} else {

			boldMarkdownArray.push(<Fragment key={key}>{boldStringSection}</Fragment>);

		}

	})(boldTagsArray);

	return boldMarkdownArray;

};

export default (string = '') => {

	const paragraphArray = string.split('//');

	return map.convert({ cap: false })((paragraphString, i) => {

		const formattedString = formatStringWithBoldMarkdown(paragraphString);

		return (
			<p key={`${string}-${paragraphString}-${i}`}>
				{formattedString}
			</p>
		);

	})(paragraphArray);

};
