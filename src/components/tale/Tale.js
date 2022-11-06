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
import useSendTaleFinishedRequestWhenNeeded from './utils/useSendTaleFinishedRequestWhenNeeded';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleMap from '../taleMap/TaleMap';
import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

export const className = 'tale';

function Tale({ setAppHeaderTitle }) {

	const { taleId, pageId, location, pathname } = useGetDataFromCurrentRoute();

	const { data: activeTale, loading: taleLoading } = useFetch(`taleCollection/${taleId}`);

	const {
		data: pageCollection,
		loading: pageCollectionLoading,
		hasCompletedInitialFetch: hasPageCollectionCompletedInitialFetch
	} = useFetch('pageCollection');
	const activePage = find({ id: pageId }, pageCollection);
	const taleFinishDestinations = getTaleFinishDestinations();
	const taleTree = generateTaleTree(pageCollection, taleFinishDestinations);

	const taleTitle = getOr('', 'title', activeTale);
	useEffect(() => {

		setAppHeaderTitle(pageId ? taleTitle : '');

		return () => setAppHeaderTitle('');

	}, [ taleTitle, pageId ]);

	const { destinations, isDeadEnd } = useGetDestinationsAndDeadEndStatus(
		activePage,
		useResolvedPath('').pathname,
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
				taleId={taleId}
				activePageId={pageId}
				taleFinishDestinations={taleFinishDestinations}
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
								loading={pageCollectionLoading || !hasPageCollectionCompletedInitialFetch}
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
	setAppHeaderTitle: PropTypes.func
};

export default Tale;
