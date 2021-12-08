const { input } = require('./input');

const segment = {
	1: 2,
	4: 4,
	7: 3,
};
let count = 0;
for (let { after } of input) {
	for (let signal of after) {
		if (signal.length === 2) {
			// 1
			count++;
		} else if (signal.length === 4) {
			// 4
			count++;
		} else if (signal.length === 3) {
			// 7
			count++;
		} else if (signal.length === 7) {
			// 8
			count++;
		}
	}
}
console.log(count);
