import { hierarchy, tree, select, linkHorizontal } from 'd3';

const width = 640;
const padding = 1;
const strokeColour = '#555';
const strokeOpacity = 0.4;
const strokeLinecap = undefined;
const strokeLinejoin = undefined;
const strokeWidth = 1.5;
const nodeRadius = 3;
const nodeFillColour = '#999';
const labelBackgroundColour = '#fff';
const labelPadding = 3;

export default (element, taleTree) => {

	console.log(taleTree);

	const root = hierarchy(taleTree);

	console.log(root);

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

	const labels = root.descendants().map(d => {

		let labelText = d.data.value;

		if (labelText.length > 1) {

			labelText = labelText.slice(0, 8);

		}

		return labelText;

	});

	node.append('text')
		.attr('dy', '0.32em')
		.attr('x', d => (d.children ? -6 : 6))
		.attr('text-anchor', d => (d.children ? 'end' : 'start'))
		.attr('paint-order', 'stroke')
		.attr('stroke', labelBackgroundColour)
		.attr('stroke-width', labelPadding)
		.text((d, i) => labels[i]);

	return svg.node();

};
