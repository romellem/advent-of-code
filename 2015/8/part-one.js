const fs = require('fs');
const path = require('path');

let _raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
const raw_input = _raw_input.split('\n').filter(n => n);
const parsed_input = require('./input');

let raw_sum = raw_input.reduce((a, b) => a + b.length, 0);
let parsed_sum = parsed_input.reduce((a, b) => a + b.length, 0);

console.log(raw_sum - parsed_sum);
