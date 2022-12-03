const { input } = require('./input');
const { intersection } = require('./utils');

const a_code = 'a'.charCodeAt(0);
const A_code = 'A'.charCodeAt(0);

const charCodes = input.map((line) => {
	const left = line.slice(0, line.length / 2);
	const right = line.slice(line.length / 2);
	// Or `_.intersection(left, right)`
	const [same] = intersection(left, right);
	if (/[a-z]/.test(same)) {
		return same.charCodeAt(0) - a_code + 1;
	} else {
		return same.charCodeAt(0) - A_code + 27;
	}
});

console.log(charCodes.reduce((a, b) => a + b));
