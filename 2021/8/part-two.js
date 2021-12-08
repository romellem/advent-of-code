const _ = require('lodash');
const { input } = require('./input');

const arraysAreEqual = _.memoize(
	(a, b) => a.slice(0).sort().join('') === b.slice(0).sort().join(''),
	(a, b) => `${a};${b}`
);

function concatSorted(a, b) {
	return `${a}${b}`.split('').sort().join('');
}

function concatSortedDeDuped(a, b) {
	return _.uniq(concatSorted(a, b).split('').sort()).join('');
}

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
/*
{
  '2': [ 1 ],
  '3': [ 7 ],
  '4': [ 4 ],
  '5': [ 2, 3, 5 ],
  '6': [ 0, 6, 9 ],
  '7': [ 8 ]
}
*/

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

const orig_mapping = mappingArrToObj('abcdefg'.split(''));
const reverse_orig_mapping = 'abcdefg'.split('').reduce((map, letter, i) => {
	map[i] = letter;
	return map;
}, {});

// { a: 0, ...}
function mappingArrToObj(mapping_arr) {
	return mapping_arr.reduce((map, letter, i) => {
		map[letter] = i;
		return map;
	}, {});
}
function getNum(mapping, wire) {
	const map = mappingArrToObj(mapping);
	let seg = Array(7).fill(0);

	for (let char of wire) {
		seg[map[char]] = 1;
	}

	for (let [arr, answer] of reverseNumbers) {
		if (arraysAreEqual(seg, arr)) return answer;
	}
}

// for (let s of Object.values(numbers)) {
// 	console.log(s);
// 	console.log('---');
// 	console.log(print(s));
// }

function solveWires({ wires, wiresAsArrays, outputs, outputsAsArrays } = {}) {
	const buckets = wires.reduce((obj, wire) => {
		const size = wire.length;
		if (!obj.has(size)) obj.set(size, []);
		obj.get(size).push(wire);
		return obj;
	}, new Map());

	let [eight_wire] = buckets.get(7);

	const solved_segments = Array(7).fill();
	const mapping = new Map();
	const reverse_mapping = new Map();

	for (let i = 0; i < wires.length; i++) {
		const wire = wires[i];
		const wire_arr = wiresAsArrays[i];
		let possibilities = segments[wire.length];
		if (possibilities.length === 1) {
			mapping.set(wire, numbers[possibilities[0]]);
			reverse_mapping.set(numbers[possibilities[0]], wire_arr);
		}
	}

	let a, b, c, d, e, f, g;
	[a] = _.xor(reverse_mapping.get(numbers[1]), reverse_mapping.get(numbers[7]));
	solved_segments[0] = a;

	let c_or_f = reverse_mapping.get(numbers[7]).filter((v) => v !== a);
	let b_or_d = reverse_mapping.get(numbers[4]).filter((v) => !c_or_f.includes(v));
	for (let wire of wires) {
		const seven = reverse_mapping.get(numbers[7]);
		const seven_str = seven.join('');
		if (wire.length === 5) {
			if (concatSortedDeDuped(wire, seven_str) === wire) {
				let d_or_g = _.difference(wire.split(''), seven);

				[d] = _.union(d_or_g, b_or_d);
				[g] = d_or_g.filter((v) => v !== d);
				[b] = b_or_d.filter((v) => v !== d);
				solved_segments[1] = b;
				solved_segments[3] = d;
				solved_segments[6] = g;
				break;
			}
		}
	}

	let zero_or_six_or_nine = buckets.get(6);
	let nine_wire;
	for (let wire of zero_or_six_or_nine) {
		// 9
		if (concatSortedDeDuped(wire, [a, b, d, g, ...c_or_f].join('')) === wire) {
			nine_wire = wire;
			[e] = _.xor(eight_wire.split(''), nine_wire.split(''));
			solved_segments[4] = e;
			break;
		}
	}

	// let zero_or_six = zero_or_six_or_nine.filter((v) => v !== nine_wire);
	// let zero_wire;
	// for (let wire of zero_or_six) {
	// 	// 0
	// 	if (concatSortedDeDuped(wire, c_or_f.join('')) === wire) {
	// 		zero_wire = wire;
	// 	}
	// }

	let two_or_three_or_five = buckets.get(5);
	let [two_wire] = two_or_three_or_five.filter((wire) => {
		return concatSortedDeDuped(wire, [a, d, e, g].join('')) === wire;
	});

	if (two_wire.includes(c_or_f[0])) {
		[c, f] = c_or_f;
	} else {
		[f, c] = c_or_f;
	}
	solved_segments[2] = c;
	solved_segments[5] = f;

	let num_sr = '';
	for (let output of outputs) {
		const num = getNum(solved_segments, output);
		num_sr += num;
	}

	return parseInt(num_sr);
}

let sum = 0;
for (let inp of input) {
	sum += solveWires(inp);
}
console.log(sum);

// 689837 too low
