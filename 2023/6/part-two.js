// const { input } = require('./input');
//
// console.log(input);

// let results = [];
const totalTime = 52947594;
const recordDistance = 426137412791216;
// for (let [totalTime, recordDistance] of [[52947594, 426137412791216]]) {
let waysToWin = 0;
for (let t = 0; t < totalTime; t++) {
	// let speed = t;
	let timeLeft = totalTime - t;
	let distance = t * timeLeft;
	if (distance > recordDistance) {
		++waysToWin;
	}
}

// results.push(waysToWin);
// }

console.log(waysToWin);
