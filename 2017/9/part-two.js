const { input, sampleInputsPartTwo } = require('./input');
const Stream = require('./stream');
const colors = require('colors');
const assert = require('assert');

// Make sure sample data passes
Object.entries(sampleInputsPartTwo).forEach(([line, garbageCleaned]) => {
    let stream = new Stream(line);
    assert.strictEqual(stream.garbageCleaned, garbageCleaned);
});

let stream = new Stream(input);

console.log(stream.garbageCleaned);
