const { input } = require('./input');
const { rankHands } = require('./poker');

input.sort((a, b) => {
	let [handA, wagerA] = a;
	let [handB, wagerB] = b;

	let val = rankHands(handA, handB);
	if (val > 0) {
		console.log(handA.join(''), ' > ', handB.join(''));
	} else if (val < 0) {
		console.log(handA.join(''), ' < ', handB.join(''));
	} else {
		console.log(handA.join(''), ' = ', handB.join(''));
	}
	return val;
});

console.log('sorted input');
console.log(JSON.stringify(input));

let ans = input
	.map(([hand, wager], i) => {
		return (i + 1) * wager;
	})
	.reduce((a, b) => a + b);

console.log(ans);
