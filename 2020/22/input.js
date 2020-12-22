const path = require('path');
const fs = require('fs');

const inputToPlayers = (input_str) =>
	input_str
		.trim()
		.split('\n\n')
		.map((p) => {
			let p1 = p.split('\n');
			p1.shift();

			let nums = p1.map((v) => +v);
			return nums;
		});

const input = inputToPlayers(fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString());

const sampleInput = inputToPlayers(`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`);

module.exports = {
	input,
	sampleInput,
};
