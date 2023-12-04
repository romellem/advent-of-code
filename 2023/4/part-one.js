const { input } = require('./input');
// Card   1: 57 76 72 11  8 28 15 38 54 46 | 77 87 71 98 40  7 84 43 61 64  5 50 19 83 79 99 36 47  4 95 30 44 37 55 26

let sum = 0;
for (let line of input) {
	let [, cardNum, winningCards, yourHand] = /^Card\s+(\d+): ([^\|]+) \| ([^\|]+)$/.exec(line);

	winningCards = winningCards
		.trim()
		.split(' ')
		.filter(Boolean)
		.map((v) => +v);
	yourHand = yourHand
		.trim()
		.split(' ')
		.filter(Boolean)
		.map((v) => +v);

	let winningCardsSet = new Set(winningCards);
	let yourHandSet = new Set(yourHand);

	const haveWins = yourHand.filter((card) => winningCardsSet.has(card));
	const numWins = haveWins.length ? haveWins.length - 1 : 0;

	const score = 2 ** numWins;
	sum += score;
}

console.log(sum);
