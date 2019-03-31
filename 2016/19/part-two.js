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
        process.stdout.write(length + '\r');
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

// Tests
assert.strictEqual(loopElves([1, 2, 3, 4, 5]), 2);
console.log('Tests passed');

const elves = Array(NUMBER_OF_ELVES)
    .fill()
    .map((c, i) => i + 1);

const answer = loopElves(elves);
console.log('                 ');
console.log(answer);
