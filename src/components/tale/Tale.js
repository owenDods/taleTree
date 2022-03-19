import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Route,
	useRouteMatch,
	useLocation
} from 'react-router-dom';
import {
	TransitionGroup,
	CSSTransition
} from 'react-transition-group';
import classnames from 'classnames';

import find from 'lodash/fp/find';
import get from 'lodash/fp/get';

import taleShape from '../shapes/taleShape';

import getPageId from './utils/getPageId';
import useGetDestinationsAndDeadEndStatus from './utils/useGetDestinationsAndDeadEndStatus';
import generateTaleTree from './utils/generateTaleTree';

import BackgroundImg from '../backgroundImg/BackgroundImg';
import TaleMap from '../taleMap/TaleMap';
import TaleStart from '../taleStart/TaleStart';
import TalePage from '../talePage/TalePage';
import Lost from '../lost/Lost';

import dummyPageCollection from '../../../dummyData/pageCollection.json';

export const className = 'tale';

const Tale = ({ taleCollection }) => {

	const { path, params, url: talePath } = useRouteMatch();
	const { taleId } = params;
	const activeTale = find({ id: taleId }, taleCollection);

	const location = useLocation();
	const { pathname } = location;
	const pageId = getPageId(pathname, talePath);

	const activePage = find({ id: pageId }, dummyPageCollection);
	const activeTaleTree = generateTaleTree(dummyPageCollection);
	const { destinations, isDeadEnd } = useGetDestinationsAndDeadEndStatus(activePage);

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

			<TaleMap taleTree={activeTaleTree} />

			<CSSTransition
				key={pathname}
				classNames={className}
				timeout={800}
				onEntered={() => setIsGoingBackwards(isDeadEnd)}
			>

				<Switch location={location}>

					<Route path={`${path}/start`}>

						<TaleStart
							tale={activeTale}
							talePath={talePath}
						/>

					</Route>

					<Route path={`${path}/:pageId`}>

						<TalePage
							backgroundImg={get('backgroundImg', activeTale)}
							pageImg={get('img', activePage)}
							title={get('title', activePage)}
							text={get('text', activePage)}
							destinations={destinations}
						/>

					</Route>

					<Route path="*">

						<Lost />

					</Route>

				</Switch>

			</CSSTransition>

		</TransitionGroup>

	);

};

Tale.propTypes = {
	taleCollection: PropTypes.arrayOf(PropTypes.shape(taleShape))
};

export default Tale;
