const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		let a = v.split('').filter((v) => /\d/.test(v));
		return a[0] + a[a.length - 1];
	});

module.exports = {
	input,
};
