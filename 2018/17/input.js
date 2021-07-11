const path = require('path');
const fs = require('fs');

// Parsing is done in `Grid` class
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

module.exports = {
	input,
};
