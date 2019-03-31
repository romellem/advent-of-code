const fs = require('fs');
const path = require('path');
const assert = require('assert');
const NUMBER_OF_ELVES = require('./input');
const { LoopedList } = require('looped-list');

const loopElves = arr => {
    let length = arr.length;
    let list = new LoopedList(arr);

    /**
     * I realized, I don't need to check if the next elf is the same
     * as the current elf, just loop a preset number of times.
     */
    while ((length--) > 1) {
        let current_elf = list.head;
        /**
         * Elf "across the circle" is the length divided by two,
         * with odd numbers having the elf "to the left" be selected,
         * which means we round down.
         */
        let elf_across_circle_movements = Math.floor((length + 1) / 2);
        let elf_across_circle = list.move(elf_across_circle_movements).head;

        // Elf across the circle is removed
        elf_across_circle.removeSelf();

        // Set the list's "head" to the elf to the left of the current elf
        list.head = current_elf.next_item;
    }

    return list.head.value;
};

// Init edge cases by hand
let data = [`n,W(n)`, `1,1`];

// Generate for small numbers (that are possible for me to calculate)

for (let n = 2; n <= 100; n++) {
    const elves = Array(n)
    .fill()
    .map((c, i) => i + 1);

    let answer = loopElves(elves);
    data.push(`${n},${answer}`);
}

const pathname = path.resolve(__dirname, './day-19-data.csv');
fs.writeFileSync(pathname, data.join('\n'));
console.log('First 100 cases written to ' + pathname);
