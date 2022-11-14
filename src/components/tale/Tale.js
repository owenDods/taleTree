import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Routes,
	Route,
	useResolvedPath
} from 'react-router-dom';
import {
	TransitionGroup,
	CSSTransition
} from 'react-transition-group';
import classnames from 'classnames';

import find from 'lodash/fp/find';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import useGetDataFromCurrentRoute from './utils/useGetDataFromCurrentRoute';
import useFetch from '../../utils/useFetch';
import getTaleFinishDestinations from './utils/getTaleFinishDestinations';
import useGetDestinationsAndDeadEndStatus from './utils/useGetDestinationsAndDeadEndStatus';
import generateTaleTree from './utils/generateTaleTree';
import useTrackVisitedPages from './utils/useTrackVisitedPages';
import useSendTaleFinishedRequestWhenNeeded from './utils/useSendTaleFinishedRequestWhenNeeded';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleMap from '../taleMap/TaleMap';
import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

export const className = 'tale';

function Tale({ setAppHeaderTitleAndLinkTo, clearAppHeaderTitleAndLinkTo }) {

	const { taleId, pageId, location, pathname } = useGetDataFromCurrentRoute();

	const { data: activeTale, loading: taleLoading } = useFetch(`taleCollection/${taleId}`);

	const {
		data: pageCollection,
		loading: pageCollectionLoading,
		hasCompletedInitialFetch: hasPageCollectionCompletedInitialFetch
	} = useFetch('pageCollection');
	const pagesLoading = pageCollectionLoading || !hasPageCollectionCompletedInitialFetch;
	const activePage = find({ id: pageId }, pageCollection);
	const taleFinishDestinations = getTaleFinishDestinations();
	const taleTree = generateTaleTree(pageCollection, taleFinishDestinations);

	const { visitedPages, resetVisitedPages } = useTrackVisitedPages(taleId, pageId);

	const taleTitle = getOr('', 'title', activeTale);
	const talePathUrl = useResolvedPath('').pathname;
	useEffect(() => {

		const newPageTitle = pageId ? taleTitle : '';
		const newLinkTo = pageId ? `${talePathUrl}/start` : '';

		setAppHeaderTitleAndLinkTo(newPageTitle, newLinkTo);

		return () => clearAppHeaderTitleAndLinkTo();

	}, [ taleTitle, pageId ]);

	const { destinations, isDeadEnd } = useGetDestinationsAndDeadEndStatus(
		activePage,
		talePathUrl,
		taleFinishDestinations
	);
	useSendTaleFinishedRequestWhenNeeded(destinations, taleFinishDestinations, taleId);

	const [ isGoingBackwards, setIsGoingBackwards ] = useState(false);

	return (

		<TransitionGroup
			className={
				classnames(
					className,
					{ [`${className}--deadEnd`]: isGoingBackwards },
					{ [`${className}--pageActive`]: pageId }
				)
			}
		>

			<BackgroundImg
				imgUrl={get('backgroundImg', activeTale)}
			/>

			<TaleMap
				taleTree={taleTree}
				activePageId={pageId}
				taleFinishDestinations={taleFinishDestinations}
				visitedPages={visitedPages}
				loading={pagesLoading}
			/>

			<CSSTransition
				key={pathname}
				classNames={className}
				timeout={800}
				onEntered={() => setIsGoingBackwards(isDeadEnd)}
			>

				<Routes location={location}>

					<Route
						path="start"
						element={(
							<TaleStart
								img={get('img', activeTale)}
								title={taleTitle}
								id={taleId}
								author={get('author', activeTale)}
								summary={get('summary', activeTale)}
								startPageDestination={
									useResolvedPath(getOr('', 'startPage', activeTale)).pathname
								}
								loading={taleLoading}
								resetVisitedPages={resetVisitedPages}
								noVisitedPages={visitedPages.length === 0}
							/>
						)}
					/>

					<Route
						path=":pageId"
						element={(
							<TalePage
								pageImg={get('img', activePage)}
								title={get('title', activePage)}
								text={get('text', activePage)}
								destinations={destinations}
								loading={pagesLoading}
							/>
						)}
					/>

					<Route
						path="*"
						element={<Lost />}
					/>

				</Routes>

			</CSSTransition>

		</TransitionGroup>

	);

}

Tale.propTypes = {
	setAppHeaderTitleAndLinkTo: PropTypes.func,
	clearAppHeaderTitleAndLinkTo: PropTypes.func
};

export default Tale;
