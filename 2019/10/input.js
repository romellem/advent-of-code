const path = require('path');
const fs = require('fs');

const inputToArray = (inputStr) =>
	String(inputStr)
		.trim()
		.split('\n')
		.map((row) => row.split('').map((v) => (v === '#' ? 1 : 0)));

const read = (file_path) =>
	fs.readFileSync(path.join(__dirname, file_path), 'utf8').toString().trim();

const main_input = read('input.txt');

const sample_input_1 = read('sample-input-1.txt');
const sample_input_2 = read('sample-input-2.txt');
const sample_input_3 = read('sample-input-3.txt');
const sample_input_4 = read('sample-input-4.txt');
const sample_input_5 = read('sample-input-5.txt');

const sample_input_part_2 = read('sample-input-part-2.txt');

module.exports = {
	parseInt: inputToArray,
	input: inputToArray(main_input),
	sampleInputs: [
		{
			grid: inputToArray(sample_input_1),
			best_count: 8,
			best_coords: [3, 4],
		},
		{
			grid: inputToArray(sample_input_2),
			best_count: 33,
			best_coords: [5, 8],
		},
		{
			grid: inputToArray(sample_input_3),
			best_count: 35,
			best_coords: [1, 2],
		},
		{
			grid: inputToArray(sample_input_4),
			best_count: 41,
			best_coords: [6, 3],
		},
		{
			grid: inputToArray(sample_input_5),
			best_count: 210,
			best_coords: [11, 13],
			partTwo: 802, // 8 * 100 + 2
		},
		{
			grid: inputToArray(sample_input_part_2),
			best_count: 30,
			best_coords: [8, 3],
		},
	],
};
