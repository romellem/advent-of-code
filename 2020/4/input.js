const path = require('path');
const fs = require('fs');
const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();

const input = file.split('\n\n').map((line) => {
	/**
	 * Put the entries all on one line AND put
	 * a trailing space at the end. This makes our
	 * regexes easier: we can guarantee that a space
	 * will always come after a value, rather than testing
	 * for
	 */
	return line.split('\n').join(' ');
});

module.exports = {
	input,
};
