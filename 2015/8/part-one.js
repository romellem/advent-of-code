const { input } = require('./input');

const parsed_input = eval(`[${input.join(',')}]`);

let raw_sum = input.reduce((a, b) => a + b.length, 0);
let parsed_sum = parsed_input.reduce((a, b) => a + b.length, 0);

console.log(raw_sum - parsed_sum);
