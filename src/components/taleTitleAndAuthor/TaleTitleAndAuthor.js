import React from 'react';
import PropTypes from 'prop-types';

export const className = 'taleTitleAndAuthor';

function TaleTitleAndAuthor({ title = '...', author = '...', header }) {

	return (
		<div className={className}>

			{header ? <h2>{title}</h2> : <p>{title}</p>}

			<p className={`${className}__author`}>By {author}</p>

		</div>
	);

}

TaleTitleAndAuthor.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	header: PropTypes.bool
};

export default TaleTitleAndAuthor;
