const assert = require('assert');
const NUMBER_OF_ELVES = require('./input');
const { LoopedList } = require('looped-list');

const loopElves = list => {
    while (true) {
        let current_elf = list.head;
        let elf_to_the_left = list.move().head;

        if (elf_to_the_left === current_elf) {
            // If the next elf is the same as the current elf, we are the last elf standing.
            // Return its value (the answer to our puzzle)
            return current_elf.value;
        } else {
            // Elf to the left is "removed"
            list.popHeadMoveNext();
        }
    }
};

// Tests
const test_elf_list = new LoopedList([1, 2, 3, 4, 5]);
assert.strictEqual(loopElves(test_elf_list), 3);

const elves = Array(NUMBER_OF_ELVES)
    .fill()
    .map((c, i) => i + 1);
const elf_list = new LoopedList(elves);

console.log(loopElves(elf_list));
