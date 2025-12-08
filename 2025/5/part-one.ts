import { input } from './input';

const { ranges, ingredients } = input;

let freshCount = 0;
for (let ingredient of ingredients) {
	const inRange = ranges.some((range) => {
		return ingredient >= range.low && ingredient <= range.high;
	});

	if (inRange) {
		freshCount++;
	}
}

console.log('Part 1:', freshCount);
