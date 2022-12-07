const { input } = require('./input');

let last4 = [];
for (let i = 0; i < input.length; i++) {
	last4.push(input[i]);
	if (last4.length === 14) {
		if ([...new Set(last4)].length === 14) {
			console.log(i + 1);
			break;
		}
		last4.shift();
	}
}
