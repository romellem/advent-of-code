const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n)[0];

let unique_letters_lookup = {};
input.split('').forEach(l => (unique_letters_lookup[l.toLowerCase()] = true));
let unique_letters = Object.keys(unique_letters_lookup);

let removing_letter_results_in = {};
unique_letters.forEach(l => {
    process.stdout.write(`${l}`);
    let i = 0;
    let list = input.split('');
    list = list.filter(q => q.toLowerCase() !== l);

    while (i < list.length - 1) {
        let f = list[i];
        let s = list[i + 1];

        let f_upper_case = f === f.toUpperCase();
        let s_upper_case = s === s.toUpperCase();

        // If letters are the same, and they are differing cases
        if (
            f.toUpperCase() === s.toUpperCase() &&
            ((f_upper_case && !s_upper_case) || (!f_upper_case && s_upper_case))
        ) {
            // Letters cancel each other out! Remove them from our list
            list.splice(i, 2);

            // Move back one and start testing from there
            i = i > 0 ? i - 1 : 0;
        } else {
            // Otherwise, move forward
            i++;
        }
    }
    process.stdout.write(` = ${list.length}, `);
    removing_letter_results_in[l] = list.length;
});

let solution = Object.entries(removing_letter_results_in);
// Sort by final length
solution.sort((a, b) => {
    if (a[1] < b[1]) {
        return -1;
    } else if (a[1] > b[1]) {
        return 1;
    } else {
        return 0;
    }
});

console.log(
    `\nShortest length was found after removing "${solution[0][0]}", yields a length of ${
        solution[0][1]
    }`
);
