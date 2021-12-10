const { input } = require('./input');
const { CORRUPTED_SCORE, getLineStatus } = require('./syntax');

const sum = input.reduce((sum, line) => {
	const status = getLineStatus(line);
	if (status.error) {
		return sum + CORRUPTED_SCORE[status.char];
	} else {
		return sum;
	}
}, 0);

console.log(sum);
