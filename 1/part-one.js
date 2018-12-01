const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Need last `filter` because 'input.txt' contains an empty line at the end, which parseInt parses as `NaN`
let input = raw_input
    .split('\n')
    .map(n => parseInt(n.replace('+', '')))
    .filter(n => !Number.isNaN(n));

const STARTING_VALUE = 0;
let sum = input.reduce((a, b) => a + b, STARTING_VALUE);

console.log(`Sum of input is when starting at ${STARTING_VALUE} is: ${sum}`);
