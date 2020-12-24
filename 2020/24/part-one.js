const { input } = require('./input');
const { Hex } = require('./hex-grid-red-blob');

const BLACK = {};
for (let steps of input) {
	let route = new Hex(0, 0, 0);
	// console.log(route.toString())
	for (let d of steps) {
		route = route.add(Hex.diagonals[d]);
	}

	if (BLACK[route.toString()] === undefined) {
		BLACK[route.toString()] = 1;
	} else if (BLACK[route.toString()] === 1) {
		BLACK[route.toString()] = 0;
	} else if (BLACK[route.toString()] === 0) {
		BLACK[route.toString()] = 1;
	}
}

console.log(Object.values(BLACK).reduce((a, b) => a + b, 0));
