const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

// Can't think of a way to do this that isn't ~O(n^2)... oh well, this won't be too bad
for (let i = 0; i < input.length; i++) {
    // Start comparing at the next one in the list (e.g., `i + 1`)
    for (let j = i + 1; j < input.length; j++) {
        let id_a = input[i];
        let id_b = input[j];

        let diffs_by = 0;
        for (let q = 0; q < id_a.length; q++) {
            if (id_a[q] !== id_b[q]) {
                diffs_by++;
            }

            // If we have more than one difference, break out of our loop immediately
            if (diffs_by > 1) {
                continue;
            }
        }

        if (diffs_by === 1) {
            console.log(`${id_a}\n${id_b}\nOnly differ by one letter!\n`);

            // Compute what common letters we have now that we've found the two ids that match
            let common_letters = [];
            for (let q = 0; q < id_a.length; q++) {
                if (id_a[q] === id_b[q]) {
                    common_letters.push(id_a[q]);
                }
            }

            console.log(`Common letters between the two IDs are:\n${common_letters.join('')}`);
            return;
        }
    }
}
