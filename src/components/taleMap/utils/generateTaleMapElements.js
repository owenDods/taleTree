import { hierarchy, tree, select, linkVertical } from 'd3';
import find from 'lodash/fp/find';

import limitDataBasedOnProgress from './limitDataBasedOnProgress';
import formatDataForD3Hierarchy from './formatDataForD3Hierarchy';

const nodeWidth = 30;
const padding = 40;

export default (element, taleTree, className, activePageId, visitedPages) => {

	element.replaceChildren();

	const { width, height } = element.getBoundingClientRect();

	const limitedData = limitDataBasedOnProgress(taleTree, activePageId, visitedPages);
	const formattedData = formatDataForD3Hierarchy(limitedData);
	const d3HierarchyData = hierarchy(formattedData);

	const nodeHeight = (height - (padding * 2)) / d3HierarchyData.height;
	tree().nodeSize([ nodeWidth, nodeHeight ])(d3HierarchyData);

	const svg = select(element).append('svg')
		.attr('viewBox', [ -(width / 2), -(height - padding), width, height ])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

	const linksData = d3HierarchyData.links();
	const linkGenerator = linkVertical().x(({ x }) => x).y(({ y }) => -y);

	svg.append('g')
		.selectAll('path')
		.data(linksData)
		.join('path')
		.classed(`${className}__branch`, true)
		.attr('d', d => {

			let pathToBeDrawn = linkGenerator(d);
			const { data: targetData } = d.target;

			if (targetData.fallThrough) {

				const { value: targetDataValue } = targetData;
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
		.classed(`${className}__node--end`, (d, index, allCircleData) => index === (allCircleData.length - 1))
		.classed(`${className}__node--active`, ({ data: { value } }) => value === activePageId);

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

};
