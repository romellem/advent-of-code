const { input } = require('./input');

console.log(input);

let results = [];
for (let [totalTime, recordDistance] of input) {
	let waysToWin = 0;
	for (let t = 0; t < totalTime; t++) {
		let speed = t;
		let timeLeft = totalTime - t;
		let distance = speed * timeLeft;
		if (distance > recordDistance) {
			waysToWin++;
		}
	}

	results.push(waysToWin);
}

console.log(results.reduce((a, b) => a * b));
