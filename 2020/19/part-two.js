const { input, tokenizeRule } = require('./input');
const { getRegexForId } = require('./messages');

input.rules[8] = tokenizeRule('8: 42 | 42 8');
input.rules[11] = tokenizeRule('11: 42 31 | 42 11 31');

let regex = getRegexForId(0, input.rules);
let total_valid_messages = input.codes
	.map((c) => (regex.test(c) ? 1 : 0))
	.reduce((a, b) => a + b, 0);

console.log(total_valid_messages);
