const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Need last `filter` because 'input.txt' contains an empty line at the end, which parseInt parses as `NaN`
let input = raw_input
    .split('\n')
    .map(n => parseInt(n.replace('+', '')))
    .filter(n => !Number.isNaN(n));

const STARTING_VALUE = 0;
let accumulator = STARTING_VALUE;

let frequency_list = {
    [accumulator.toString()]: true,
};

for (let i = 0; i < input.length; i++) {
    let value = input[i];
    accumulator += value;

    // If we've seen this frequency before, log out the value and break the loop
    if (frequency_list[accumulator.toString()]) {
        console.log(`Frequency ${accumulator} has been seen before!`);
        return;
    }

    // Otherwise, add the frequency to our lookup table
    frequency_list[accumulator.toString()] = true;
}
