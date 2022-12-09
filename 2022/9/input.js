const path = require('path');
const fs = require('fs');

const dirToCompass = {
	U: 'N',
	D: 'S',
	L: 'W',
	R: 'E',
};

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		let [dir, steps] = v.split(' ');
		dir = dirToCompass[dir];
		steps = parseInt(steps, 10);
		return { dir, steps };
	});

module.exports = {
	input,
};
