const { input } = require('./input');
const { rankHands } = require('./poker');

input.sort((a, b) => {
	let [handA] = a;
	let [handB] = b;

	return rankHands(handA, handB, true);
});

let ans = input
	.map(([hand, wager], i) => {
		return (i + 1) * wager;
	})
	.reduce((a, b) => a + b);

console.log(ans);
