const { input, sampleInputs } = require('./input');
const Stream = require('./stream');
const colors = require('colors');
const assert = require('assert');

// Make sure sample data passes
Object.entries(sampleInputs).forEach(([line, score]) => {
    let stream = new Stream(line);
    assert.strictEqual(stream.score, score);
});

let stream = new Stream(input);

console.log(stream.score);
