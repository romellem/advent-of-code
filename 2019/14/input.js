const path = require('path');
const fs = require('fs');

const read = (file_path) =>
	fs.readFileSync(path.join(__dirname, file_path), 'utf8').toString().trim();

/**
 * Takes advantage of that fact we only have one way to make any given element.
 * That is, I don't have `1 A => 1 B` and `1 C => 1 B` in the same formula listing.
 *
 * @returns {Object} Returns an object keyed by the element it creates. The value is another
 *                   object, with 'creates' and 'needs' keys. 'creates' is the number of elements
 *                   this formula creates, and 'needs' is an array of key value pairs,
 *                   the key (first item) is the element the formula needs and the value (second item)
 *                   is the amount of that element that is needed.
 * @example
 *     parseLines('10 ORE => 10 A\n1 ORE => 1 B\n7 A, 1 B => 1 FUEL') // returns
 *     {
 *       A: { creates: 10, needs: [['ORE', 10]] },
 *       B: { creates: 1, needs: [['ORE', 1]] },
 *       FUEL: { creates: 1, needs: [['A', 7], ['B', 1]] },
 *     }
 */
const parseLines = (raw_lines) => {
	const formula = {};

	const lines = String(raw_lines).trim().split('\n');

	for (let line of lines) {
		let [needs, creates] = line.split(' => ');
		let [creates_amount, creates_element] = creates.split(' ');
		creates_amount = parseInt(creates_amount, 10);

		let needs_parsed = needs.split(', ').map((raw_need) => {
			let [needs_amount, needs_element] = raw_need.split(' ');
			needs_amount = parseInt(needs_amount, 10);

			// [A, 1]
			return [needs_element, needs_amount];
		});

		formula[creates_element] = {
			creates: creates_amount,
			needs: needs_parsed,
		};
	}

	return formula;
};

const sampleInput_1 = read('sample-input-1.txt');
const sampleInput_2 = read('sample-input-2.txt');
const sampleInput_3 = read('sample-input-3.txt');
const sampleInput_4 = read('sample-input-4.txt');
const sampleInput_5 = read('sample-input-5.txt');
const sampleInput_6 = read('sample-input-6.txt');

const input = read('input.txt');

module.exports = {
	sampleInputs: [
		{ formula: parseLines(sampleInput_1), ore: 31 },
		{ formula: parseLines(sampleInput_2), ore: 165 },
		{ formula: parseLines(sampleInput_3), ore: 13312, max_fuel: 82892753 },
		{ formula: parseLines(sampleInput_4), ore: 180697, max_fuel: 5586022 },
		{ formula: parseLines(sampleInput_5), ore: 2210736, max_fuel: 460664 },
		{ formula: parseLines(sampleInput_6), ore: 10 },
	],
	input: parseLines(input),
	parseLines,
};
