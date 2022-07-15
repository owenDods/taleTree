import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleChoice from '../taleChoice/TaleChoice';

import formatStringAsMarkdown from './utils/formatStringAsMarkdown';
import useIsAtTopOrBottomOfScroll from './utils/useIsAtTopOrBottomOfScroll';

export const className = 'talePage';

function TalePage({ pageImg, title, text, destinations }) {

	const pageContentEl = useRef(null);
	const [
		{ isAtTopOfScroll, isAtBottomOfScroll },
		updateOnScroll
	] = useIsAtTopOrBottomOfScroll(pageContentEl);

	return (

		<div className={className}>

			<div
				className={
					classnames(
						`${className}__content`,
						{ [`${className}__content--hasOverflow`]: isAtTopOfScroll !== null },
						{ [`${className}__content--scrollShadowTop`]: !isAtTopOfScroll },
						{ [`${className}__content--scrollShadowBottom`]: !isAtBottomOfScroll }
					)
				}
			>

				<div className={`${className}__scrollShadow ${className}__scrollShadow--top`} />

				<div
					className={`${className}__contentInner`}
					ref={pageContentEl}
					onScroll={updateOnScroll}
				>

					{pageImg && (

						<BackgroundImg
							imgUrl={pageImg}
							component={(<div className={`${className}__img`} />)}
						/>

					)}

					<h2>{title}</h2>

					{formatStringAsMarkdown(text)}

				</div>

				<div className={`${className}__scrollShadow ${className}__scrollShadow--bottom`} />

			</div>

			<TaleChoice choices={destinations} />

		</div>

	);

}

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
