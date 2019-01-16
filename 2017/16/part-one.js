const { input, sampleInput } = require('./input');
const Dance = require('./dance');
const assert = require('assert');

let sample_dance = new Dance(sampleInput, 'abcde');
sample_dance.run();
assert.strictEqual(sample_dance.getOrder(), 'baedc');

let dance = new Dance(input);

dance.run();

console.log(dance.programs.join(''));
