const path = require('path');
const fs = require('fs');
const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();

const input = file.split('\n\n').map((line) => {
	// Put the entries all on one line
	return line.split('\n').join(' ');
});

module.exports = {
	input,
};
