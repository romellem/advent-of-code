const { input } = require('./input');

function parseLine(line) {
	// @example `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
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

// Use `cardNum - 1` as indices. Each card's count starts at 1 for its own self
const copies = Array(input.length).fill(1);

for (let line of input) {
	const { cardNum, winningCards, yourHand } = parseLine(line);
	const winningCardsSet = new Set(winningCards);

	const haveWins = yourHand.filter((card) => winningCardsSet.has(card));
	const cardIndex = cardNum - 1;
	// Get current count of number of copies of the current card
	const cardCopies = copies[cardIndex];

	// If our scratch card was a winner
	if (haveWins.length) {
		// Figure out which cards we need to get copies of
		const nextCardIndices = Array(haveWins.length)
			.fill()
			.map((_, i) => cardIndex + 1 + i); // e.g. `cardNum + i`
		for (let nextCardIndex of nextCardIndices) {
			// Each scratch off wins `(1 copy * number of scratchoffs) = cardCopies`, so add that to counts so far
			copies[nextCardIndex] += cardCopies;
		}
	}
}

console.log(copies.reduce((a, b) => a + b, 0));
