const _ = require('lodash');
const { input } = require('./input');

const arraysAreEqual = _.memoize(
	(a, b) => a.join(',') === b.join(','),
	(a, b) => `${a};${b}`
);

function addUniqueCharToStringSorted(a, b) {
	const all_chars = [...a.split(''), ...b.split('')].sort();
	return _.uniq(all_chars).join('');
}

/**
 * Mark each number as an array of 7 segments, either on (1) or off (0).
 * The order of the segments is read left-to-right, top-to-bottom.
 *
 * Here are the indices of the segment and how they correspond to the full display:
 *
 *      00000
 *     1     2
 *     1     2
 *      33333
 *     4     5
 *     4     5
 *      66666
 *
 * So for the number 0, the only segment that is turned "off" is the middle one, segment 3.
 * So it's segment array would be
 *
 *     Index: 0  1  2  3  4  5  6
 *           [1, 1, 1, 0, 1, 1, 1]
 *
 * Rather than use numbered indices, in the puzzle they refer to them as letters, `a - g`.
 * Below are all numbers, 0 - 9, and the corresponding lettered segments.
 *
 *      0:      1:      2:      3:      4:
 *      aaaa    ....    aaaa    aaaa    ....
 *     b    c  .    c  .    c  .    c  b    c
 *     b    c  .    c  .    c  .    c  b    c
 *      ....    ....    dddd    dddd    dddd
 *     e    f  .    f  e    .  .    f  .    f
 *     e    f  .    f  e    .  .    f  .    f
 *      gggg    ....    gggg    gggg    ....
 *
 *      5:      6:      7:      8:      9:
 *      aaaa    aaaa    aaaa    aaaa    aaaa
 *     b    .  b    .  .    c  b    c  b    c
 *     b    .  b    .  .    c  b    c  b    c
 *      dddd    dddd    ....    dddd    dddd
 *     .    f  e    f  .    f  e    f  .    f
 *     .    f  e    f  .    f  e    f  .    f
 *      gggg    gggg    ....    gggg    gggg
 */
const numbers_as_segments = {
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

/**
 * Create a Map of the above segment arrays as keys and the number as their value.
 *
 * @example segments_to_numbers[numbers_as_segments[0]] === 0
 */
const segments_to_numbers = Object.entries(numbers_as_segments).reduce((map, [num, segs]) => {
	map.set(segs, parseInt(num, 10));
	return map;
}, new Map());

/**
 * Categorize our numbers 0 - 9 based on how many segments they have turned on.
 * Matching the instructions, we see that `1`, `4`, `7`, and `8` have a unique number of segments turned on.
 * For example, `1` has 2 segments turned on. So if we find a wire of length 2 (e.g., it has 2 segments turned on),
 * then we know that wire corresponds to digit `1`.
 *
 * {
 *     '2': [ 1 ],
 *     '3': [ 7 ],
 *     '4': [ 4 ],
 *     '5': [ 2, 3, 5 ],
 *     '6': [ 0, 6, 9 ],
 *     '7': [ 8 ]
 * }
 */
const numbers_groups_by_segments_count = Object.entries(numbers_as_segments).reduce(
	(obj, [num, segs]) => {
		const segments_count = segs.reduce((a, b) => a + b);
		if (!obj[segments_count]) {
			obj[segments_count] = [];
		}

		obj[segments_count].push(parseInt(num, 10));

		return obj;
	},
	{}
);

/**
 * Given a segment array of length 7, log the ascii representation of the number.
 * I used this for debugging at the beginning, although it currently isn't used
 * for the solution.
 *
 * @param {Number[]} segment
 * @example segmentToNumber([1, 1, 1, 0, 1, 1, 1])
 *          // Logs:
 *          // xxxxxxx
 *          // x     x
 *          // x     x
 *          //
 *          // x     x
 *          // x     x
 *          // xxxxxxx
 */
function print(segment) {
	const charFrom = (v) => (v ? 'x' : ' ');
	let grid = Array(7)
		.fill()
		.map(() => Array(7).fill(' '));

	for (let i = 0; i < 7; i++) grid[0][i] = charFrom(segment[0]);

	grid[1][0] = charFrom(segment[1]);
	grid[2][0] = charFrom(segment[1]);

	grid[1][6] = charFrom(segment[2]);
	grid[2][6] = charFrom(segment[2]);

	for (let i = 0; i < 7; i++) grid[3][i] = charFrom(segment[3]);

	grid[4][0] = charFrom(segment[4]);
	grid[5][0] = charFrom(segment[4]);

	grid[4][6] = charFrom(segment[5]);
	grid[5][6] = charFrom(segment[5]);

	for (let i = 0; i < 7; i++) grid[6][i] = charFrom(segment[6]);

	console.log(grid.map((row) => row.join('')).join('\n'));
}

/**
 * A "mapping array" is an array of chars `a - g`, where the position of the char
 * corresponds to the original ordering of our segments on a given digit.
 *
 * So a "normal" mapping without reordering would just be the letters in order:
 * `['a', 'b', 'c', 'd', 'e', 'f', 'g']`.
 *
 * But, the puzzle is figuring out how these have been reordered. So, as the example
 * in the puzzle shows, if we had
 *
 * ['d', 'e', 'a', 'f', 'g', 'b', 'c']
 *
 * That'd match up with a display of:
 *
 *      dddd
 *     e    a
 *     e    a
 *      ffff
 *     g    b
 *     g    b
 *      cccc
 *
 * So we just create a map of characters to their index so we can light up a relevant segment.
 *
 * @example mappingArrToObj(['d', 'e', 'a', 'f', 'g', 'b', 'c']) === { d: 0, e: 1, a: 2, f: 3, g: 4, b: 5, c: 6 }
 * @param {Array<String>} mapping_arr
 */
function mappingArrToObj(mapping_arr) {
	return mapping_arr.reduce((map, letter, i) => {
		map[letter] = i;
		return map;
	}, {});
}

/**
 * @param {Array<String>} mapping_arr
 * @param {String} wire
 * @returns {Number}
 */
function convertWireToNumber(mapping_arr, wire) {
	const map = mappingArrToObj(mapping_arr);

	// Start out with all segments turned off.
	const digit = Array(7).fill(0);
	for (let char of wire) {
		// Turn on the segment at the index based on their mapping
		digit[map[char]] = 1;
	}

	for (let [segments, answer] of segments_to_numbers) {
		if (arraysAreEqual(segments, digit)) {
			return answer;
		}
	}
}

function solveWires({ wires, wiresAsArrays, outputs } = {}) {
	const wires_by_length = wires.reduce((obj, wire) => {
		const size = wire.length;
		if (!obj.has(size)) {
			obj.set(size, []);
		}

		obj.get(size).push(wire);
		return obj;
	}, new Map());

	let [eight_wire] = wires_by_length.get(7);

	const solved_segments = Array(7).fill();
	const mapping = new Map();
	const reverse_mapping = new Map();

	for (let i = 0; i < wires.length; i++) {
		const wire = wires[i];
		const wire_arr = wiresAsArrays[i];
		let possibilities = numbers_groups_by_segments_count[wire.length];
		if (possibilities.length === 1) {
			mapping.set(wire, numbers_as_segments[possibilities[0]]);
			reverse_mapping.set(numbers_as_segments[possibilities[0]], wire_arr);
		}
	}

	let a, b, c, d, e, f, g;
	[a] = _.xor(
		reverse_mapping.get(numbers_as_segments[1]),
		reverse_mapping.get(numbers_as_segments[7])
	);
	solved_segments[0] = a;

	let c_or_f = reverse_mapping.get(numbers_as_segments[7]).filter((v) => v !== a);
	let b_or_d = reverse_mapping.get(numbers_as_segments[4]).filter((v) => !c_or_f.includes(v));
	for (let wire of wires) {
		const seven = reverse_mapping.get(numbers_as_segments[7]);
		const seven_str = seven.join('');
		if (wire.length === 5) {
			if (addUniqueCharToStringSorted(wire, seven_str) === wire) {
				let d_or_g = _.difference(wire.split(''), seven);

				[d] = _.intersection(d_or_g, b_or_d);
				[g] = d_or_g.filter((v) => v !== d);
				[b] = b_or_d.filter((v) => v !== d);
				solved_segments[1] = b;
				solved_segments[3] = d;
				solved_segments[6] = g;
				break;
			}
		}
	}

	let zero_or_six_or_nine = wires_by_length.get(6);
	let nine_wire;
	for (let wire of zero_or_six_or_nine) {
		// 9
		if (addUniqueCharToStringSorted(wire, [a, b, d, g, ...c_or_f].join('')) === wire) {
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
	// 	if (addUniqueCharToStringSorted(wire, c_or_f.join('')) === wire) {
	// 		zero_wire = wire;
	// 	}
	// }

	let two_or_three_or_five = wires_by_length.get(5);
	let [two_wire] = two_or_three_or_five.filter((wire) => {
		return addUniqueCharToStringSorted(wire, [a, d, e, g].join('')) === wire;
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
		const num = convertWireToNumber(solved_segments, output);
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
