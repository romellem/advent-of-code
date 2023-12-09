const { input } = require('./input');

// This value is small enough (<100m) that we can iterate through every value fairly quickly
const totalTime = parseInt(input.map(([time]) => String(time)).join(''), 10);
const recordDistance = parseInt(input.map(([_, distance]) => String(distance)).join(''), 10);

let waysToWin = 0;
for (let t = 0; t < totalTime; t++) {
	let timeLeft = totalTime - t;
	let distance = t * timeLeft;
	if (distance > recordDistance) {
		waysToWin++;
	}
}

console.log(waysToWin);
