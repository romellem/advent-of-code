const { input, sampleInput } = require('./input');
const { getRegexForId } = require('./messages');

let regex = getRegexForId(0, input.rules);
let total_valid_messages = input.codes
	.map((c) => (regex.test(c) ? 1 : 0))
	.reduce((a, b) => a + b, 0);

console.log(total_valid_messages);
