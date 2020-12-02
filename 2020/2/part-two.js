const { input } = require('./input');

function isValid({ low, high, char, pass }) {
	let a = pass[low - 1];
	let b = pass[high - 1];
	return (a === char && b !== char) || (b === char && a !== char) ? 1 : 0;
}

const valid_passwords = input.map((v) => isValid(v)).reduce((a, b) => a + b, 0);

console.log(valid_passwords);
