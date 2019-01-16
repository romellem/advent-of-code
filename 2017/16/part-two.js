const { input } = require('./input');
const Dance = require('./dance');
const assert = require('assert');

let dance = new Dance(input);

const DANCE_COUNT = 1000000000;
const initial_order = dance.getOrder();
let count_when_first_repeat;

/**
 * The cycle starts repeating after a short while, so even though
 * this loop looks like it'll take a while, it xit pretty quickly
 */
for (let i = 1; i <= DANCE_COUNT; i++) {
    dance.run();
    if (dance.getOrder() === initial_order) {
        // We are starting at the beginning, break out of our loop
        count_when_first_repeat = i;
        break;
    }
}

// Our dance should be in its initial state. Just make sure of that before we continue on.
assert.strictEqual(dance.getOrder(), 'abcdefghijklmnop');

let reduced_iterations = DANCE_COUNT % count_when_first_repeat;
for (let i = 0; i < reduced_iterations; i++) {
    dance.run();
}

console.log(dance.getOrder());
