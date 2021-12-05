const path = require('path');
const fs = require('fs');

/**
 * @typedef {Object} VentLines
 * @property {[Number, Number]} from
 * @property {[Number, Number]} to
 */

/**
 * @type {VentLines[]}
 */
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// e.g. '958,982 -> 115,139'
		let [from, to] = line.split(' -> ');
		let [from_x, from_y] = from.split(',').map((v) => parseInt(v, 10));
		let [to_x, to_y] = to.split(',').map((v) => parseInt(v, 10));

		return {
			from: [from_x, from_y],
			to: [to_x, to_y],
		}
	});

module.exports = {
	input,
};
