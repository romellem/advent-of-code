const { input } = require('./input');

function parseLine(line) {
	const [, cardNum, winningCards, yourHand] = /^Card\s+(\d+): ([^\|]+) \| ([^\|]+)$/.exec(line);

	return {
		cardNum: parseInt(cardNum, 10),
		winningCards: winningCards
			.trim()
			.split(' ') // Split on single space and remove empties via Boolean filter
			.filter(Boolean)
			.map((v) => parseInt(v, 10)),
		yourHand: yourHand
			.trim()
			.split(' ')
			.filter(Boolean)
			.map((v) => parseInt(v, 10)),
	};
}

let sum = 0;
for (let line of input) {
	const { winningCards, yourHand } = parseLine(line);
	const winningCardsSet = new Set(winningCards);

	const haveWins = yourHand.filter((card) => winningCardsSet.has(card));

	const score = haveWins.length ? 2 ** (haveWins.length - 1) : 0;
	sum += score;
}

console.log(sum);
