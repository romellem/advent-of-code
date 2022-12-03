const path = require('path');
const fs = require('fs');
const assert = require('assert');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

for (let line of input) {
	assert.ok(line.length % 2 === 0);
}

module.exports = {
	input,
};
