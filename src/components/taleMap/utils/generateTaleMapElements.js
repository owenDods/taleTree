import { hierarchy, tree, select, linkVertical } from 'd3';
import find from 'lodash/fp/find';

import limitDataBasedOnProgress from './limitDataBasedOnProgress';
import formatDataForD3Hierarchy from './formatDataForD3Hierarchy';

const nodeWidth = 30;
const padding = 40;
const pathCoordRegex = /-?\d+\.?\d*,-?\d+\.?\d*/g;

function calculateNodeHeight(height, dataHeight, endHasBeenReached) {

	const heightMinusPadding = height - (padding * 2);
	let nodeHeight = height / 10;

	const totalNodeHeightExceedsElement = nodeHeight * dataHeight > heightMinusPadding;

	if (totalNodeHeightExceedsElement || endHasBeenReached) {

		nodeHeight = heightMinusPadding / dataHeight;

	}

	return nodeHeight;

}

function offsetPathToGiveItDimensionsForGradientIfNeeded(pathToBeDrawn) {

	const isVerticalLine = pathToBeDrawn.match(pathCoordRegex).every(coordString => (

		coordString.split(',')[0] === '0'

	));

	if (isVerticalLine) {

		return pathToBeDrawn.replace(/0/, '0.01');

	}

	return pathToBeDrawn;

}

function generateTaleMapElements(
	element,
	taleTree,
	className,
	activePageId,
	visitedPages,
	taleFinishDestinations
) {

	element.replaceChildren();

	const { width, height } = element.getBoundingClientRect();

	const limitedData = limitDataBasedOnProgress(taleTree, activePageId, visitedPages);
	const rootHasNoChildren = limitedData.children.length === 0;

	if (rootHasNoChildren) {
		return;
	}

	const formattedData = formatDataForD3Hierarchy(limitedData, taleFinishDestinations);
	const d3HierarchyData = hierarchy(formattedData);

	const dataHeight = d3HierarchyData.height;

	const endNodeIds = [];

	d3HierarchyData.each(({ data: { value, isFinish } }) => {

		if (isFinish) {

			endNodeIds.push(value);

		}

	});

	const checkIfPageHasBeenVisited = id => visitedPages.includes(id) || activePageId === id;
	const endHasBeenReached = endNodeIds.some(checkIfPageHasBeenVisited);

	const nodeHeight = calculateNodeHeight(height, dataHeight, endHasBeenReached);
	tree().nodeSize([ nodeWidth, nodeHeight ])(d3HierarchyData);

	const svg = select(element).append('svg')
		.attr('viewBox', [ -(width / 2), -(height - padding), width, height ])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

	const pathGradientId = `${className}__pathGradient`;
	const pathGradient = svg.append('defs')
		.append('linearGradient')
		.attr('id', pathGradientId)
		.attr('x1', '0')
		.attr('y1', '1')
		.attr('x2', '0')
		.attr('y2', '0');

	pathGradient.append('stop')
		.attr('stop-color', 'white')
		.attr('offset', '0.8');

	pathGradient.append('stop')
		.attr('stop-color', 'white')
		.attr('stop-opacity', '0')
		.attr('offset', '1');

	const linksData = d3HierarchyData.links();
	const linkGenerator = linkVertical().x(({ x }) => x).y(({ y }) => -y);

	svg.append('g')
		.selectAll('path')
		.data(linksData)
		.join('path')
		.classed(`${className}__branch`, true)
		.attr('stroke', ({ target: { data: { value } } }) => {

			const hasUnvisitedDestination = !checkIfPageHasBeenVisited(value);

			return hasUnvisitedDestination ? `url(#${pathGradientId})` : '#f5f5f5';

		})
		.attr('d', d => {

			let pathToBeDrawn = linkGenerator(d);
			pathToBeDrawn = offsetPathToGiveItDimensionsForGradientIfNeeded(pathToBeDrawn);

			const { target: { data: targetData } } = d;
			const { fallThrough: targetDataFallThrough, value: targetDataValue } = targetData;

			if (targetDataFallThrough && checkIfPageHasBeenVisited(targetDataValue)) {

				const fallThroughLink = find(
					({ target: { data: { value, fallThrough } } }) => (
						!fallThrough && value === targetDataValue
					),
					linksData
				);
				const fallThroughLinkObject = { source: d.target, target: fallThroughLink.target };
				const fallThroughPathToBeDrawn = linkGenerator(fallThroughLinkObject);

				pathToBeDrawn = `${pathToBeDrawn}${fallThroughPathToBeDrawn}`;

			}

			return pathToBeDrawn;

		});

	const dataWithNoFallThroughNodes = d3HierarchyData
		.descendants()
		.filter(({ data: { fallThrough } }) => !fallThrough);

	const node = svg.append('g')
		.selectAll('a')
		.data(dataWithNoFallThroughNodes)
		.join('a')
		.attr('transform', d => `translate(${d.x},-${d.y})`);

	node.append('circle')
		.classed(`${className}__node`, true)
		.classed(`${className}__node--start`, (d, index) => index === 0)
		.classed(`${className}__node--end`, ({ data: { isFinish } }) => isFinish)
		.classed(`${className}__node--active`, ({ data: { value } }) => value === activePageId)
		.classed(`${className}__node--unvisited`, ({ data: { value } }) => !visitedPages.includes(value));

	const activeNode = svg.select(`.${className}__node--active`).node();

	if (activeNode) {

		const activeParentNode = select(activeNode.parentNode);

		activeParentNode
			.append('ellipse')
			.classed(`${className}__markerRing`, true);

		activeParentNode
			.append('path')
			.classed(`${className}__marker`, true)
			.attr('d', 'M 0 0 C -30 -30 30 -30 0 0');

	}

	return svg.node();

}

export default generateTaleMapElements;
