const path = require('path');
const fs = require('fs');

const [raw_input, raw_folds] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const input = raw_input.split('\n').map((line) => {
	return line.split(',').map((v) => parseInt(v, 10));
});

const folds = raw_folds.split('\n').map((q) => {
	let [axis, line] = q.replace('fold along ', '').split('=');
	line = +line;
	return { axis, line };
});

module.exports = {
	input,
	folds,
};
