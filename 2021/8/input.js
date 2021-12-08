const path = require('path');
const fs = require('fs');
const {InfiniteGrid} = require('./infinite-grid')

const a = InfiniteGrid.split('str');


const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()

module.exports = {
	input,
};
