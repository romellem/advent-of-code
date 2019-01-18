// This needs to be run with a higher RAM allocation
// @example
// node --optimize_for_size --max_old_space_size=8192 2017/17/part-two.js 
const input = require('./input');
const CircularList = require('./circular-list');

let buffer = new CircularList(0);

// Keep a pointer stored to the '0' element, since we want to see what is the `next_item` after 50000000 insertions
let zero = buffer.head;

const INSTRUCTIONS = 50000000;
for (let i = 1; i <= INSTRUCTIONS; i++) {
    if (i % 1009 === 0) process.stdout.write(i + ' ' + Math.round(i / INSTRUCTIONS * 10000)/100 + '%       \r');
    buffer.move(input).insertNext(i);
}

console.log('===============');
console.log(zero.next_item.value);
