const path = require('path');
const fs = require('fs');

const raw_input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();

/**
 * @param {String} num_or_range
 * @example parseNumOrRange("100") // returns [100]
 * @example parseNumOrRange("5..8") // returns [5, 6, 7, 8]
 * @returns Array<Number>
 */
const parseNumOrRange = (num_or_range) => {
	if (num_or_range.includes('..')) {
		let [num_a, num_b] = num_or_range.split('..');
		num_a = parseInt(num_a);
		num_b = parseInt(num_b);
		return Array(num_b - num_a + 1)
			.fill()
			.map((_, i) => num_a + i);
	} else {
		let num = parseInt(num_or_range);
		if (Number.isNaN(num)) {
			throw new Error(`Failed to parse "${num_or_range}"`);
		}
		return [num];
	}
};

const toCoord = ({ x, y }) => `${x},${y}`;

/**
 * @typedef {Object} InputValues
 * @property {Array<Array<Number>>} grid
 * @property {Number} min_x
 * @property {Number} max_x
 * @property {Number} min_y
 * @property {Number} max_y
 */

/**
 * @param {String} raw_input Your raw input, with whitespace trimmed
 * @returns {InputValues}
 */
const parseInput = (raw_input) => {
	const grid_map = {};
	const lines = raw_input.split('\n');
	for (let raw_line of lines) {
		let [, axis_a, range_a, axis_b, range_b] =
			/^(x|y)=(\d+\.?\.?\d*), (x|y)=(\d+\.?\.?\d*)$/.exec(raw_line);
		let nums_a = parseNumOrRange(range_a);
		let nums_b = parseNumOrRange(range_b);
		for (let a of nums_a) {
			for (let b of nums_b) {
				let key = toCoord({ [axis_a]: a, [axis_b]: b });
				grid_map[key] = 1;
			}
		}
	}

	const coords = Object.keys(grid_map).map((coord_str) =>
		coord_str.split(',').map((v) => parseInt(v))
	);
	let min_x = Number.MAX_SAFE_INTEGER;
	let max_x = 0;
	let max_y = 0;
	for (let [x, y] of coords) {
		if (x < min_x) {
			min_x = x;
		}
		if (x > max_x) {
			max_x = x;
		}
		if (y > max_y) {
			max_y = y;
		}
	}
	min_x -= 1;
	max_x += 1;
	// y doesn't get a row of "buffer," water only extends to maximum clay coord

	/**
	 * 1. y starts at 0, so `max_y - 0 = max_y` (plus 1 for 0-indexed)
	 * 2. This stores extra 0s to pad the columns, but makes later calculations easier to not account for offsets
	 */
	const grid = Array(max_y + 1)
		.fill()
		.map((_) => Array(max_x + 1).fill(0));
	for (let [x, y] of coords) {
		grid[y][x] = 1;
	}

	return {
		grid,
		min_x,
		max_x,
		min_y: 0,
		max_y,
	};
};

/**
 * @param {InputValues}
 */
const trimInputGrid = ({ grid, min_x }) => {
	return Array(grid.length)
		.fill()
		.map((_, y) => grid[y].slice(min_x));
};

/**
 * @param {InputValues}
 * @returns {String} Returns a trimmed string of our grid
 */
const gridToString = ({ grid, min_x }) => {
	return grid
		.map((row) =>
			row
				.map((v) => (v === 1 ? '#' : '.'))
				.join('')
				.slice(Math.max(min_x - 1, 0))
		)
		.join('\n');
};

const input = parseInput(raw_input);

module.exports = {
	input,
	parseInput,
	trimInputGrid,
	gridToString,
};
