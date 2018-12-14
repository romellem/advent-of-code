const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

let two_multiplier = 0;
let three_multiplier = 0;
input.forEach(id => {
    let letter_count_lookup = {};
    id.split('').forEach(c => {
        if (!letter_count_lookup[c]) {
            letter_count_lookup[c] = 1;
        } else {
            letter_count_lookup[c]++;
        }
    });

    let letter_count = Object.values(letter_count_lookup);

    if (letter_count.includes(2)) {
        two_multiplier++;
    }

    if (letter_count.includes(3)) {
        three_multiplier++;
    }
});

console.log(`Number of IDs with 2 repeated letters: ${two_multiplier}`);
console.log(`Number of IDs with 3 repeated letters: ${three_multiplier}`);
console.log(`Your checksum = ${two_multiplier} * ${three_multiplier} =\n\t${two_multiplier * three_multiplier}`);
