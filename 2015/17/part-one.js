const G = require('generatorics');
const input = require('./input');

const TOTAL_LITERS = 150;
let subsets_that_work = 0;
for (var subset of G.powerSet(input)) {
    if (subset.reduce((a, b) => a + b, 0) === TOTAL_LITERS) {
        subsets_that_work++;
    }
}

console.log(subsets_that_work);