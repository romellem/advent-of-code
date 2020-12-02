const { input } = require('./input');

function countCharInString(str, char) {
	let count = 0;
	for (let v of str) {
		if (v === char) count++;
	}
	return count;
}
function isValid({ low, high, char, pass }) {
	let count = countCharInString(pass, char);
	return count >= low && count <= high ? 1 : 0;
}

const valid_passwords = input.map((v) => isValid(v)).reduce((a, b) => a + b, 0);

console.log(valid_passwords);
