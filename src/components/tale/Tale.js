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

import taleShape from '../shapes/taleShape';

import useGetDataFromCurrentRoute from './utils/useGetDataFromCurrentRoute';
import useFetch from '../../utils/useFetch';
import useGetDestinationsAndDeadEndStatus from './utils/useGetDestinationsAndDeadEndStatus';
import generateTaleTree from './utils/generateTaleTree';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleMap from '../taleMap/TaleMap';
import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

export const className = 'tale';

function Tale({ taleCollection, setAppHeaderTitle }) {

	const { taleId, pageId, location, pathname } = useGetDataFromCurrentRoute();

	const activeTale = find({ id: taleId }, taleCollection);

	const { data: pageCollection } = useFetch('pageCollection');
	const activePage = find({ id: pageId }, pageCollection);
	const taleTree = generateTaleTree(pageCollection);

	const taleTitle = getOr('', 'name', activeTale);
	useEffect(() => {

		setAppHeaderTitle(pageId ? taleTitle : '');

		return () => setAppHeaderTitle('');

	}, [ taleTitle, pageId ]);

	const { destinations, isDeadEnd } = useGetDestinationsAndDeadEndStatus(activePage, useResolvedPath('').pathname);

	const [ isGoingBackwards, setIsGoingBackwards ] = useState(false);

	const { pathname: startPageDestination } = useResolvedPath(get('startPage', activeTale) || '');

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
								name={taleTitle}
								summary={get('summary', activeTale)}
								startPageDestination={startPageDestination}
							/>
						)}
					/>

					<Route
						path=":pageId"
						element={(
							<TalePage
								backgroundImg={get('backgroundImg', activeTale)}
								pageImg={get('img', activePage)}
								title={get('title', activePage)}
								text={get('text', activePage)}
								destinations={destinations}
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
	taleCollection: PropTypes.arrayOf(PropTypes.shape(taleShape)),
	setAppHeaderTitle: PropTypes.func
};

export default Tale;
