const { input } = require('./input');

const NUM_WORDS = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const NUM_WORD_ENTRIES = Object.entries(NUM_WORDS);

function strToNum(str) {
	for (let [word, num] of NUM_WORD_ENTRIES) {
		if (str.startsWith(word)) {
			return num;
		}
	}

	// Will get filtered out
	return '';
}

const numbersInLines = input.map((line) => {
	const allNumbers = line
		.split('')
		.map((char, i) => {
			const restOfLineFromChar = line.slice(i);

			// If we have a digit, return that. Otherwise, look to see if this char could be the start of a number word
			return /\d/.test(char) ? char : strToNum(restOfLineFromChar);
		})
		.filter(Boolean);

	const firstNumber = allNumbers[0];
	const lastNumber = allNumbers[allNumbers.length - 1];
	return parseInt(`${firstNumber}${lastNumber}`, 10);
});

let sum = 0;
for (let num of numbersInLines) {
	sum += num;
}

console.log(sum);
