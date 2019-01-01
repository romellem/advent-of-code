const MINIMUM_PRESENTS = require('./input');
const getDivisors = require('get-divisors/dist/getDivisors');

let house = 0;
let presents;
do {
    ++house;

    let divisors = getDivisors(house);
    let divisors_within_50_of_house = divisors.filter(v => (v * 50 >= house));

    let sum_of_divisors = divisors_within_50_of_house.reduce((a, b) => a + b);
    presents = sum_of_divisors * 11;

} while (presents < MINIMUM_PRESENTS);

console.log(house);
