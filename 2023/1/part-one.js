const { input } = require('./input');

const numbersInLines = input.map((line) => {
	const allNumbers = line.split('').filter((v) => /\d/.test(v));

	const firstNumber = allNumbers[0];
	const lastNumber = allNumbers[allNumbers.length - 1];
	return parseInt(`${firstNumber}${lastNumber}`, 10);
});

let sum = 0;
for (let num of numbersInLines) {
	sum += num;
}

console.log(sum);
