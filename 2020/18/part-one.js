const { input } = require('./input');
const { calculate, ADD, MULTIPLY } = require('./calc');

const input_totals = input.map((v) => calculate(v));
const sum = input_totals.reduce((a, b) => a + b, 0);
console.log(sum);
