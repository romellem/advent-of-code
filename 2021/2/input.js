const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let [movement, amount] = line.split(' ');
		amount = parseInt(amount, 10);

		return {
			movement,
			amount,
		};
	});

module.exports = {
	input,
};
