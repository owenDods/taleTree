import { hierarchy, tree, select, linkHorizontal } from 'd3';

import formatDataForD3Hierarchy from './formatDataForD3Hierarchy';

const width = 640;
const padding = 1;
const strokeColour = '#555';
const strokeOpacity = 0.4;
const strokeLinecap = undefined;
const strokeLinejoin = undefined;
const strokeWidth = 1.5;
const nodeRadius = 3;
const nodeFillColour = '#999';

export default (element, taleTree) => {

	const formattedData = formatDataForD3Hierarchy(taleTree);
	const root = hierarchy(formattedData);

	const dx = 10;
	const dy = width / (root.height + padding);
	tree().nodeSize([ dx, dy ])(root);

	let x0 = Infinity;
	let x1 = -x0;
	root.each(({ x }) => {

		x1 = x > x1 ? x : x1;
		x0 = x < x0 ? x : x0;

	});

	const height = x1 - x0 + dx * 2;

	const svg = select(element).append('svg')
		.attr('viewBox', [ (-dy * (padding / 2)), (x0 - dx), width, height ])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
		.attr('font-family', 'sans-serif')
		.attr('font-size', 10);

	svg.append('g')
		.attr('fill', 'none')
		.attr('stroke', strokeColour)
		.attr('stroke-opacity', strokeOpacity)
		.attr('stroke-linecap', strokeLinecap)
		.attr('stroke-linejoin', strokeLinejoin)
		.attr('stroke-width', strokeWidth)
		.selectAll('path')
		.data(root.links())
		.join('path')
		.attr('d', linkHorizontal().x(d => d.y).y(d => d.x));

	const node = svg.append('g')
		.selectAll('a')
		.data(root.descendants())
		.join('a')
		.attr('transform', d => `translate(${d.y},${d.x})`);

	node.append('circle')
		.attr('fill', d => (d.children ? strokeColour : nodeFillColour))
		.attr('r', nodeRadius);

	return svg.node();

};
