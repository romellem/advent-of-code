const assert = require('assert');
const { input, sampleInput } = require('./input');
const { getMostCommonLetterInEachColumn } = require('./message');

// Tests
assert.strictEqual(getMostCommonLetterInEachColumn(sampleInput), 'easter');

console.log(getMostCommonLetterInEachColumn(input));
