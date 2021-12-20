const path = require('path');
const fs = require('fs');
const { InfiniteGrid } = require('./infinite-grid');

const [raw_enhancement, image] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const enhancement = raw_enhancement.split('').map((c) => (c === '#' ? 1 : 0));

const input = InfiniteGrid.split(image)
	.map((row) => row.map((c) => (c === '#' ? 1 : 0)).join(''))
	.join('\n');

module.exports = {
	enhancement,
	input,
};
