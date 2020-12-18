const { input } = require('./input');
const { calculate } = require('./calc');


for (let s of [
    '2 * 3 + (4 * 5)',
    '5 + (8 * 3 + 9 + 3 * 4 * 3)',
    '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
    '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
]) {
    console.log(s, '=', calculate(s))
}
console.log('===========')
console.log(input.map(v => calculate(v)).reduce((a, b) => a+b, 0))
