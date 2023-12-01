const { input } = require('./input');

function doThing(input) {
	let sum = 0;
	for (let v of input) {
		sum += +v;
	}

	return sum;
}

const val = doThing(input);

console.log(val);
