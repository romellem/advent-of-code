const path = require('path');
const fs = require('fs');

const parseFile = (relative_file) => {
	const raw_input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();
	// @example "target area: x=56..76, y=-162..-134"
	let [, x1, x2, y1, y2] = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(
		raw_input
	);
	[x1, x2, y1, y2] = [x1, x2, y1, y2].map((v) => parseInt(v, 10));

	if (x1 > x2) {
		[x1, x2] = [x2, x1];
	}

	if (y1 > y2) {
		[y1, y2] = [y2, y1];
	}

	return { x: [x1, x2], y: [y1, y2] };
};

const input = parseFile('input.txt');

module.exports = {
	input,
};
