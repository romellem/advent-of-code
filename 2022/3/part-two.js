const { input } = require('./input');
const { intersection, chunk } = require('./utils');

const a_code = 'a'.charCodeAt(0);
const A_code = 'A'.charCodeAt(0);

// Or `_.chunk()`
const chunks = chunk(
	input.map((v) => v.split('')),
	3
);

const charCodes = chunks.map((chunk) => {
	// Or `_.intersection()`
	const [same] = intersection(...chunk);
	if (/[a-z]/.test(same)) {
		return same.charCodeAt(0) - a_code + 1;
	} else {
		return same.charCodeAt(0) - A_code + 27;
	}
});

console.log(charCodes.reduce((a, b) => a + b));
