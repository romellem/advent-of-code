const _ = require('lodash');
const { input } = require('./input');

const arraysAreEqual = _.memoize(
	(a, b) => a.slice(0).sort().join('') === b.slice(0).sort().join(''),
	(a, b) => `${a};${b}`
);

const numbers = {
	0: [1, 1, 1, 0, 1, 1, 1],
	1: [0, 0, 1, 0, 0, 1, 0],
	2: [1, 0, 1, 1, 1, 0, 1],
	3: [1, 0, 1, 1, 0, 1, 1],
	4: [0, 1, 1, 1, 0, 1, 0],
	5: [1, 1, 0, 1, 0, 1, 1],
	6: [1, 1, 0, 1, 1, 1, 1],
	7: [1, 0, 1, 0, 0, 1, 0],
	8: [1, 1, 1, 1, 1, 1, 1],
	9: [1, 1, 1, 1, 0, 1, 1],
};

const reverseNumbers = Object.entries(numbers).reduce((map, [num, segs]) => {
	map.set(segs, num);
	return map;
}, new Map());

const segments = Object.entries(numbers).reduce((obj, [num, segs]) => {
	const on = segs.reduce((a, b) => a + b);
	if (!obj[on]) obj[on] = [];
	obj[on].push(+num);
	return obj;
}, {});
// console.log(segments);

function print(segment) {
	let grid = Array(7)
		.fill()
		.map(() => Array(7).fill(' '));

	for (let i = 0; i < 7; i++) grid[0][i] = segment[0] ? 'x' : ' ';

	// for (let i = 0; i < 7; i++)
	grid[1][0] = segment[1] ? 'x' : ' ';
	grid[2][0] = segment[1] ? 'x' : ' ';

	grid[1][6] = segment[2] ? 'x' : ' ';
	grid[2][6] = segment[2] ? 'x' : ' ';

	for (let i = 0; i < 7; i++) grid[3][i] = segment[3] ? 'x' : ' ';

	grid[4][0] = segment[4] ? 'x' : ' ';
	grid[5][0] = segment[4] ? 'x' : ' ';

	grid[4][6] = segment[5] ? 'x' : ' ';
	grid[5][6] = segment[5] ? 'x' : ' ';

	for (let i = 0; i < 7; i++) grid[6][i] = segment[6] ? 'x' : ' ';

	return grid.map((row) => row.join('')).join('\n');
}

// for (let s of Object.values(numbers)) {
// 	console.log(s);
// 	console.log('---');
// 	console.log(print(s));
// }

function solveWires({ before }) {
	const solved_segments = Array(7).fill();
	const mapping = new Map();
	const reverse_mapping = new Map();
	// while (mapping.size < 10) {
	// 	for (let wire of before) {
	// 		let possibilities = segments[wire.length];
	// 		if (possibilities.length === 1) {
	// 			mapping.set(wire, numbers[possibilities[0]]);
	// 		}
	// 	}
	// }

	for (let wire of before) {
		let possibilities = segments[wire.length];
		if (possibilities.length === 1) {
			mapping.set(wire, numbers[possibilities[0]]);
			reverse_mapping.set(numbers[possibilities[0]], wire.split(''));
		}
	}

	let [a] = _.xor(reverse_mapping.get(numbers[1]), reverse_mapping.get(numbers[7]));
	solved_segments[0] = a;

	let c_or_f = reverse_mapping.get(numbers[7]).filter((v) => v !== a);
	let b_or_d = reverse_mapping.get(numbers[4]).filter((v) => !c_or_f.includes(v));
	// for (let wire of before) {
	// 	if (arraysAreEqual([a, ...c_or_f]))
	// }
	console.log(c_or_f, b_or_d);
}

solveWires(input[0]);
