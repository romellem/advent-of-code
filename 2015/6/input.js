const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// e.g. 'turn off 446,432 through 458,648'
		let [, action, from_x, from_y, through_x, through_y] =
			/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/.exec(line);

		[from_x, from_y, through_x, through_y] = [from_x, from_y, through_x, through_y].map(Number)

		return {
			action,
			coords: [
				[from_x, from_y],
				[through_x, through_y],
			],
		};
	});

module.exports = input;
