const assert = require('assert');
const NUMBER_OF_ELVES = require('./input');

const loopElves = arr => {
    let list = arr.slice(0);

    let current = 0;

    /**
     * I realized, I don't need to check if the next elf is the same
     * as the current elf, just loop a preset number of times.
     */
    while (list.length > 1) {
        let current_item = list[current];

        if (list.length % 241 === 0) process.stdout.write(list.length + '\r');
        /**
         * Elf "across the circle" is the length divided by two,
         * with odd numbers having the elf "to the left" be selected,
         * which means we round down.
         */
        let elf_across_circle_movements = Math.floor(list.length / 2);
        let elf_across_circle_index = (current + elf_across_circle_movements) % list.length;
        list.splice(elf_across_circle_index, 1);

        if (current > list.length - 1) {
            current = list.indexOf(current_item);
        }
        current = (current + 1);
    }

    return list[0];
};

// Tests
assert.strictEqual(loopElves([1, 2, 3, 4, 5]), 2);
console.log('Tests passed');

const elves = Array(NUMBER_OF_ELVES)
    .fill()
    .map((c, i) => i + 1);

const answer = loopElves(elves);
console.log('                 ');
console.log(answer);
