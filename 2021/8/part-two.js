const { input } = require('./input');

// We are comparing arrays of strings or numbers, so we can use this simple comparison
const arraysAreEqual = (a, b) => a.join(',') === b.join(',');

function addUniqueCharToStringSorted(a, b) {
	const all_chars = [...a.split(''), ...b.split('')].sort();

	return [...new Set(all_chars)].join('');
}

function wiresOverlap({ bottom_wire, top_wire }) {
	return addUniqueCharToStringSorted(bottom_wire, top_wire) === bottom_wire;
}

function uniqueSegments(wire_a, wire_b) {
	let char_counts = {};
	for (let char of [...wire_a, ...wire_b]) {
		if (!char_counts[char]) {
			char_counts[char] = 0;
		}
		char_counts[char]++;
	}

	let unique_chars = [];
	for (let [char, count] of Object.entries(char_counts)) {
		if (count === 1) {
			unique_chars.push(char);
		}
	}

	return unique_chars;
}

function intersectingSegments(wire_a, wire_b) {
	// Assumes a given wire is unique
	let char_counts = {};
	for (let char of [...wire_a, ...wire_b]) {
		if (!char_counts[char]) {
			char_counts[char] = 0;
		}
		char_counts[char]++;
	}

	let intersecting_chars = [];
	for (let [char, count] of Object.entries(char_counts)) {
		if (count > 1) {
			intersecting_chars.push(char);
		}
	}

	return intersecting_chars;
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

function solveWires({ wires, outputs } = {}) {
	const wires_by_length = wires.reduce((obj, wire) => {
		const size = wire.length;
		if (!obj.has(size)) {
			obj.set(size, []);
		}

		obj.get(size).push(wire);
		return obj;
	}, new Map());

	const number_to_wire = wires.reduce((map, wire) => {
		const size = wire.length;

		const number = numbers_groups_by_segments_count[size];
		const wire_has_one_possibility = number.length === 1;
		if (wire_has_one_possibility) {
			// Sets 1, 4, 7, 8. Those are the only unique digits with unique wire sizes at the start.
			map.set(number[0], wire);
		}
		return map;
	}, new Map());

	/**
	 *      aaaaa
	 *     b     c
	 *     b     c
	 *      ddddd
	 *     e     f
	 *     e     f
	 *      ggggg
	 */
	let a, b, c, d, e, f, g;

	/**
	 * Step 1:
	 *
	 * The `1` digit only consists of segments `c` and `f`, so get that wire
	 * and mark the segments as such
	 */
	let c_or_f = number_to_wire.get(1);

	/**
	 * Step 2:
	 *
	 * Now that we know `c or f`, we can figure out what wires are `b or d` by
	 * seeing where digit 4 overlaps.
	 *
	 *     | '_|
	 *     |   |
	 */
	let b_or_d = uniqueSegments(number_to_wire.get(4), c_or_f);

	/**
	 * Step 3:
	 *
	 * 1 and 7 overlap except for the top segment, `a`. Find which one is different and mark that as `a`
	 *.
	 *        _
	 *     |   |
	 *     |   |
	 */
	[a] = uniqueSegments(number_to_wire.get(1), number_to_wire.get(7));

	/**
	 * Step 4:
	 *
	 * The digits with 5 segments are `2`, `3`, and `5`.
	 * If you overlap `7` completely overlaps `3`, so if you remove the segments in `7` from `3`,
	 * you get segments that are either `d or g`.
	 *
	 * Since we already know what wires are `b or d`, then we just interesct these to find `d`.
	 * After that we can calcuate `b` and `g`.
	 *
	 *     _  _
	 *     _|  |
	 *     _'  '
	 */
	const two_or_three_or_five = wires_by_length.get(5);
	for (let wire of two_or_three_or_five) {
		if (wiresOverlap({ bottom_wire: wire, top_wire: number_to_wire.get(7) })) {
			// Then `wire` is digit `3`
			let d_or_g = uniqueSegments(wire, number_to_wire.get(7));

			[d] = intersectingSegments(d_or_g, b_or_d);
			[g] = uniqueSegments(d_or_g, d);
			[b] = uniqueSegments(b_or_d, d);

			break;
		}
	}

	/**
	 * Step 5:
	 *
	 * We currently know `a`, `b`, `d`, `g`, and know what wires are `c or f`.
	 * When we put all those segments together, we get digit `9`.
	 * We also already know digit `8` (it has a unique number of segments).
	 * So we can get segment `e` by seeing what extra segment `8` has that `9` doesn't.
	 *
	 *     _   _
	 *    '_' '_|
	 *    '_'  _'
	 */
	number_to_wire.set(9, [a, b, d, g, ...c_or_f].sort().join(''));
	[e] = uniqueSegments(number_to_wire.get(8), number_to_wire.get(9));

	/**
	 * Step 6:
	 *
	 * Digits that have 5 segments include `2`, `3`, and `5`.
	 * 2 is the only digit that includes segment `e`, which is known.
	 *
	 * Once we have the `2` wire, grab the first segment from `c_or_f`. If that segment is `c`,
	 * it'll overlap with `2`. If it's `f`, it won't overlap with `2`.
	 *
	 *      _  _   _
	 *      _' _' '_
	 *     '_  _'  _'
	 */
	let two_wire = wires_by_length.get(5).find((wire) => wire.includes(e));
	if (wiresOverlap({ bottom_wire: two_wire, top_wire: c_or_f[0] })) {
		// `c` is the first segment of `c_or_f`
		[c, f] = c_or_f;
	} else {
		// `f` is the first segment of `c_or_f`
		[f, c] = c_or_f;
	}

	// We have our mapping / ordering!
	const solved_segment_mapping = [a, b, c, d, e, f, g];

	let num_sr = '';
	for (let output of outputs) {
		const num = convertWireToNumber(solved_segment_mapping, output);
		num_sr += num;
	}

	return parseInt(num_sr, 10);
}

const output_sum = input.reduce((sum, input_line) => sum + solveWires(input_line), 0);
console.log(output_sum);
