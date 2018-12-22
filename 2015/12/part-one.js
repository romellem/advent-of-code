const input = require('./input');
const traverse = require('traverse');

let sum = 0;
traverse(input).forEach(val => {
    if (typeof val === 'number') {
        sum += val;
    }
});

console.log(sum);
