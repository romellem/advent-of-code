const MINIMUM_PRESENTS = require('./input');
const getDivisors = require('get-divisors/dist/getDivisors');

let house = 0;
let presents;
do {
    ++house;

    let divisors = getDivisors(house);
    let sum_of_divisors = divisors.reduce((a, b) => a + b);
    presents = sum_of_divisors * 10;

} while (presents < MINIMUM_PRESENTS);

console.log(house);
