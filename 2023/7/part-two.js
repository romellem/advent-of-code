const { input } = require('./input');
const { rankHands } = require('./poker');

input.sort(([handA], [handB]) => {
	return rankHands(handA, handB, { jokersWild: true });
});

const sumOfWagers = input
	.map(([hand, wager], i) => {
		return (i + 1) * wager;
	})
	.reduce((a, b) => a + b, 0);

console.log(sumOfWagers);
