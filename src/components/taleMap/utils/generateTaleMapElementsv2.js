import { hierarchy, tree, select, linkVertical } from 'd3';

import formatDataForD3Hierarchy from './formatDataForD3Hierarchy';

const nodeWidth = 30;
const padding = 40;
const strokeColour = '#555';
const strokeOpacity = 0.6;
const strokeWidth = 5;
const nodeRadius = 8;
const nodeFillColour = '#999';

export default (element, taleTree) => {

	const { width, height } = element.getBoundingClientRect();

	const formattedData = formatDataForD3Hierarchy(taleTree);
	const root = hierarchy(formattedData);

	const nodeHeight = (height - padding) / root.height;
	tree().nodeSize([ nodeWidth, nodeHeight ])(root);

	const svg = select(element).append('svg')
		.attr('viewBox', [ -(width / 2), -(height - (padding / 2)), width, height ])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
		.attr('font-family', 'sans-serif')
		.attr('font-size', 10);

	svg.append('g')
		.attr('fill', 'none')
		.attr('stroke', strokeColour)
		.attr('stroke-opacity', strokeOpacity)
		.attr('stroke-linejoin', 'round')
		.attr('stroke-width', strokeWidth)
		.selectAll('path')
		.data(root.links())
		.join('path')
		.attr('d', linkVertical().x(({ x }) => x).y(({ y }) => -y));

	const node = svg.append('g')
		.selectAll('a')
		.data(
			root
				.descendants()
				.filter(({ data: { fallThrough } }) => !fallThrough)
		)
		.join('a')
		.attr('transform', d => `translate(${d.x},-${d.y})`);

	node.append('circle')
		.attr('fill', ({ children }) => (children ? strokeColour : nodeFillColour))
		.attr('r', nodeRadius);

	return svg.node();

};
