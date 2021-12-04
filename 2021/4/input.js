const path = require('path');
const fs = require('fs');
const { Board } = require('./bingo');

/**
 * @property {Number[]} numbers
 * @property {Board[]} boards
 */
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.reduce(
		(acc, block, i) => {
			if (i === 0) {
				acc.numbers = block.split(',').map((v) => parseInt(v, 10));
			} else {
				acc.boards.push(new Board(block, i - 1));
			}

			return acc;
		},
		{ numbers: undefined, boards: [] }
	);

module.exports = {
	input,
};
