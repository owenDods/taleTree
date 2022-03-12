import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleChoice from '../taleChoice/TaleChoice';

import formatStringAsMarkdown from './utils/formatStringAsMarkdown';

export const className = 'talePage';

const TalePage = ({ pageImg, title, text, destinations }) => (

	<div className={className}>

		<div className={`${className}__content`}>

			{pageImg && (

				<BackgroundImg
					imgUrl={pageImg}
					component={(<div className={`${className}__img`} />)}
				/>

			)}

			<h2>{title}</h2>

			{formatStringAsMarkdown(text)}

		</div>

		<TaleChoice choices={destinations} />

	</div>

);

TalePage.propTypes = {
	pageImg: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
	destinations: PropTypes.arrayOf(PropTypes.shape({
		destination: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.func
		]),
		label: PropTypes.string
	}))
};

export default TalePage;
