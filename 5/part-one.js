const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n)[0];

let list = input.split('');

let i = 0;

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

console.log(`List ends up at length: ${list.length}`);
