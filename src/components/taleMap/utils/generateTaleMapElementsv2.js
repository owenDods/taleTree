import { hierarchy, tree, select, linkVertical } from 'd3';
import find from 'lodash/fp/find';

import formatDataForD3Hierarchy from './formatDataForD3Hierarchy';

const nodeWidth = 30;
const padding = 40;
const strokeWidth = 5;
const nodeRadius = 8;

export default (element, taleTree, className) => {

	const { width, height } = element.getBoundingClientRect();

	const formattedData = formatDataForD3Hierarchy(taleTree);
	const d3HierarchyData = hierarchy(formattedData);

	const nodeHeight = (height - padding) / d3HierarchyData.height;
	tree().nodeSize([ nodeWidth, nodeHeight ])(d3HierarchyData);

	const svg = select(element).append('svg')
		.attr('viewBox', [ -(width / 2), -(height - (padding / 2)), width, height ])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
		.attr('font-family', 'sans-serif')
		.attr('font-size', 10);

	const linksData = d3HierarchyData.links();
	const linkGenerator = linkVertical().x(({ x }) => x).y(({ y }) => -y);

	svg.append('g')
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-width', strokeWidth)
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
		.attr('r', nodeRadius);

	return svg.node();

};
