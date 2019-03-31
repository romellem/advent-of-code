const NUMBER_OF_ELVES = require('./input');

const getLastElf = n => {
    // Get largest exponent part of input (`floor(log_3(n))`)
    let exp = Math.floor(Math.log(n) / Math.log(3));
    let largest_pow_of_3 = Math.pow(3, exp);

    // If our input is a pure power of 3, the "winner" is that input
    if (n === largest_pow_of_3) {
        return n;
    }

    // If our input is _less than or equal to_ two of our highest exponent,
    // the answer is our input minus the highest power
    if (n <= 2 * largest_pow_of_3) {
        return n - largest_pow_of_3;
    }

    // Otherwise, it is double our input, minus triple our largest power
    return (2 * n) - (3 * largest_pow_of_3);
};

console.log(getLastElf(NUMBER_OF_ELVES));
