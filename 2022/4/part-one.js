const { input } = require('./input');
const _ = require('lodash');

let c = 0;
for (let [a, b] of input) {
	let ar = _.range(a[0], a[1] + 1);
	let br = _.range(b[0], b[1] + 1);
	let all = _.union(ar, br)
		.sort((a, b) => a - b)
		.join(',');

	// console.log(ar, br, all);
	if (all === ar.join(',') || all === br.join(',')) {
		c++;
	}
}

console.log(c);
