const { input } = require('./input');
const _ = require('lodash');
let chunks = _.chunk(
	input.map((v) => v.join('').split('')),
	3
);

let data = chunks.map((chunk) => {
	let [same] = _.intersection(...chunk);
	if (same.toLowerCase() === same) {
		return same.charCodeAt(0) - 97 + 1;
	} else {
		return same.charCodeAt(0) - 65 + 27;
	}
});
console.log(data.reduce((a, b) => a + b));
