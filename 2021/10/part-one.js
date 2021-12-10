const { input } = require('./input');
const { score, getLineStatus } = require('./syntax');

const sum = input.reduce((sum, line) => {
	const status = getLineStatus(line);
	if (status.error) {
		return sum + score[status.char];
	} else {
		return sum;
	}
}, 0);

console.log(sum);
