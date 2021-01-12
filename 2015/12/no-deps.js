const path = require('path');
const fs = require('fs');

const json_str = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();
const input = JSON.parse(json_str);

function* walkOverNumbers(value) {
	if (Array.isArray(value)) {
		for (let item of value) {
			yield* walkOverNumbers(item);
		}
	} else if (typeof value === 'string') {
		// Skip string values
	} else if (typeof value === 'number') {
		// Only return number values
		yield value;
	} else {
		// Assume an Object (there are no `null` values)
		for (let key in value) {
			// Drill down on the object value, (aka `value[key]`)
			yield* walkOverNumbers(value[key]);
		}
	}
}

let sum = 0;
for (let v of walkOverNumbers(input)) {
	sum += v;
}

console.log('Part One:', sum);

function* walkOverNumbersWithoutRed(value) {
	if (Array.isArray(value)) {
		for (let item of value) {
			yield* walkOverNumbersWithoutRed(item);
		}
	} else if (typeof value === 'string') {
		// Skip string values
	} else if (typeof value === 'number') {
		// Only return number values
		yield value;
	} else {
		// Assume an Object (there are no `null` values)

		const contains_red = Object.values(value).includes('red');

		// Only drill down if we don't contain red anywhere
		if (!contains_red) {
			for (let key in value) {
				yield* walkOverNumbersWithoutRed(value[key]);
			}
		}

		// Otherwise, don't drill down at all
	}
}

sum = 0;
for (let v of walkOverNumbersWithoutRed(input)) {
	sum += v;
}

console.log('Part Two:', sum);
