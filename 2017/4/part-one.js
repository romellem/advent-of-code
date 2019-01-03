const { uniq } = require('lodash');
const input = require('./input');

const isValid = phrase_array => {
    return uniq(phrase_array).length === phrase_array.length ? 1 : 0;
};

console.log(input.map(p => isValid(p)).reduce((a, b) => a + b, 0));
