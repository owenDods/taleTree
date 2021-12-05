import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleChoice from '../taleChoice/TaleChoice';

export const className = 'talePage';

const TalePage = ({ backgroundImg, setPageId, pageImg, title, text, destinations }) => {

	const { params = {} } = useRouteMatch();
	const { pageId } = params;

	useEffect(() => {

		setPageId(pageId);

	}, [ pageId ]);

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
