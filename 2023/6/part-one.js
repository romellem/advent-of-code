const { input } = require('./input');

const results = [];
for (let [totalTime, recordDistance] of input) {
	let waysToWin = 0;
	for (let t = 0; t < totalTime; t++) {
		const speed = t;
		const timeLeft = totalTime - t;
		const distance = speed * timeLeft;
		if (distance > recordDistance) {
			waysToWin++;
		}
	}

	results.push(waysToWin);
}

console.log(results.reduce((a, b) => a * b, 1));
