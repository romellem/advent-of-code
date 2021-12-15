const path = require('path');
const fs = require('fs');

const [raw_input, raw_folds] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const input = raw_input.split('\n').map((line) => {
	// @example '1071,582'
	return line.split(',').map((v) => parseInt(v, 10));
});

const folds = raw_folds.split('\n').map((fold) => {
	// @example 'fold along x=655'
	let [axis, line] = fold.replace('fold along ', '').split('=');
	line = parseInt(line, 10);
	return { axis, line };
});

module.exports = {
	input,
	folds,
};
