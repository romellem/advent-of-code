// Print grid (x for end, . for space, # for wall, _ for empty, G for goal)

const { input } = require('./input');
const coords = Object.keys(input).map(xy => xy.split(',').map(v => +v));
const max_x = Math.max(...coords.map(coord => coord[0]));
const max_y = Math.max(...coords.map(coord => coord[1]));

const grid = [];
for (let y = 0; y <= max_y; y++) {
	const row = [];
	for (let x = 0; x <= max_x; x++) {
		const cell = x + ',' + y;
		let { size, used } = input[cell];

		let marker;
		if (x === 0 && y === 0) {
			marker = 'x';
		} else if (x === max_x && y === 0) {
			marker = 'G';
		} else if (used === 0) {
			marker = '_';
		} else if (size < 100) {
			marker = '.';
		} else {
			marker = '#';
		}

		row.push(marker);
	}
	grid.push(row);
}

// Labels
const x_axis_tens =
	'  ' +
	Array(max_x + 1)
		.fill(0)
		.map((c, i) => (i > 10 ? Math.floor(i / 10) : ' '))
		.join('') +
	'\n';
const x_axis_ones =
	'  ' +
	Array(max_x + 1)
		.fill(0)
		.map((c, i) => i % 10)
		.join('') +
	'\n';
const x_axis = x_axis_tens + x_axis_ones;
const y_axis = Array(max_y + 1)
	.fill(0)
	.map((c, i) => String(i).padStart(2, ' '));

const grid_str =
	x_axis + grid.map((row, y) => y_axis[y] + row.join('')).join('\n');

console.log(grid_str);
