import React from 'react';
import PropTypes from 'prop-types';

import useSyncCurrentPageId from './utils/useSyncCurrentPageId';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleChoice from '../taleChoice/TaleChoice';

export const className = 'talePage';

const TalePage = ({ backgroundImg, setPageId, pageImg, title, text, destinations }) => {

	useSyncCurrentPageId(setPageId);

	return (

		<BackgroundImg
			imgUrl={backgroundImg}
			component={(<div className={className} />)}
		>

			<div className={`${className}__content`}>

				{pageImg && (

					<BackgroundImg
						imgUrl={pageImg}
						component={(<div className={`${className}__img`} />)}
					/>

				)}

				<h2>{title}</h2>

				<p>{text}</p>

			</div>

			<TaleChoice choices={destinations} />

		</BackgroundImg>

	);

};

TalePage.propTypes = {
	backgroundImg: PropTypes.string,
	setPageId: PropTypes.func.isRequired,
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
