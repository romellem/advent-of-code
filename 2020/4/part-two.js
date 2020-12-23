const { input } = require('./input');
const { includesAllRequiredFields, allFieldsAreValid } = require('./passport');

let valid_passports = input
	.filter((passport) => includesAllRequiredFields(passport))
	.map((passport) => (allFieldsAreValid(passport) ? 1 : 0))
	.reduce((a, b) => a + b, 0);

console.log(valid_passports);
