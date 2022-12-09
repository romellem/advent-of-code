const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('');

const getPacketStartIndex = (count) => {
	const window = [];
	for (let i = 0; i < input.length; i++) {
		window.push(input[i]);
		if (window.length === count) {
			if (Array.from(new Set(window)).length === count) {
				return i + 1;
			}
			window.shift();
		}
	}

	return -1;
};

module.exports = {
	getPacketStartIndex,
};
