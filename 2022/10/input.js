const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.flatMap((v) => {
		let [op, n] = v.split(' ');
		if (op === 'addx') {
			n = parseInt(n, 10);

			if (Number.isNaN(n)) {
				throw v;
			}

			/**
			 * Simplify cycles logic by inserting `noop` instructions
			 * before every `addx` call so account for fact that
			 * `addx` takes two cycles.
			 */
			return [{ op: 'noop' }, { op: 'addx', n }];
		} else {
			return [{ op: 'noop' }];
		}
	});

module.exports = {
	input,
};
