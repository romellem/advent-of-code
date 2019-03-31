const assert = require('assert');

// Functions return true if the number _is_ in the range
// Since these ranges are blacklists, we want the numbers
// that _don't_ return true when passed into these functions
const { inputFn, sampleFn } = require('./input');

// Tests
let valid_test_nums = [];
for (let i = 0; i <= 9; i++) {
    if (!sampleFn(i)) {
        valid_test_nums.push(i);
    }
}
assert.deepStrictEqual(valid_test_nums, [3, 9]);

let answer;
for (let i = 0; i <= 4294967295; i++) {
    if (!inputFn(i)) {
        answer = i;
        break;
    }
}

console.log(answer);
