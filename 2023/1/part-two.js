const { input } = require('./input');

const nums = {
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

const entries = Object.entries(nums);

function strToNum(str) {
	return entries.map(([word, num]) => (str.startsWith(word) ? num : 0)).filter(Boolean)[0] || 0;
}

function doThing(input) {
	let sum = 0;
	for (let line of input) {
		let numbers = line
			.split('')
			.map((c, i) => {
				return /\d/.test(c) ? +c : strToNum(line.slice(i));
			})
			.filter(Boolean);

		const val = '' + numbers[0] + numbers[numbers.length - 1];

		sum += +val;
	}
	return sum;
}

const val = doThing(input);

console.log(val);
