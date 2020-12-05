const { input } = require('./input');
const { includesAllRequiredFields } = require('./passport');

let valid_passports = 0;
for (let passport of input) {
	if (includesAllRequiredFields(passport)) {
		valid_passports++;
	}
}

console.log(valid_passports);
