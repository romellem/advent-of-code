const path = require('path');
const fs = require('fs');

const SOME_HUGE_UTF_CONST = 'utf8';

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), SOME_HUGE_UTF_CONST)
	.toString()
	.trim();

module.exports = {
	input,
};
