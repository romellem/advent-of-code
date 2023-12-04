const { input } = require('./input');
// Card   1: 57 76 72 11  8 28 15 38 54 46 | 77 87 71 98 40  7 84 43 61 64  5 50 19 83 79 99 36 47  4 95 30 44 37 55 26

let copies = Array(input.length + 1).fill(1);
copies[0] = 0;

let sum = 0;
for (let line of input) {
	let [, cardNum, winningCards, yourHand] = /^Card\s+(\d+): ([^\|]+) \| ([^\|]+)$/.exec(line);

	cardNum = +cardNum;
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

	const haveWins = yourHand.filter((card) => winningCardsSet.has(card));
	const cardCopies = copies[cardNum];

	if (haveWins.length) {
		let newCopies = Array(haveWins.length)
			.fill()
			.map((_, i) => cardNum + i + 1);
		for (let copy of newCopies) {
			copies[copy] += cardCopies;
		}
	}

	// const score = haveWins.length ? 2 ** (haveWins.length - 1) : 0;
	// sum += score * cardCopies;
}

console.log(copies.reduce((a, b) => a + b, 0));
