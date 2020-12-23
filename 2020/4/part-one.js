const { input } = require('./input');
const { includesAllRequiredFields } = require('./passport');

let valid_passports = input
	.map((passport) => (includesAllRequiredFields(passport) ? 1 : 0))
	.reduce((a, b) => a + b, 0);

console.log(valid_passports);
