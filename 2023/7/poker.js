const FIVE_OF_A_KIND = 6;
const FOUR_OF_A_KIND = 5;
const FULL_HOUSE = 4;
const THREE_OF_A_KIND = 3;
const TWO_PAIR = 2;
const ONE_PAIR = 1;
const HIGH_CARD = 0;

function countCards(hand) {
	let count = new Map();
	for (let card of hand) {
		if (!count.has(card)) {
			count.set(card, 0);
		}

		let currentCount = count.get(card);
		count.set(card, currentCount + 1);
	}

	return Array.from(count.entries());
}

function getHandType(hand) {
	let uniqueCards = new Set(hand);
	if (uniqueCards.size === 1) {
		return FIVE_OF_A_KIND;
	} else if (uniqueCards.size === 5) {
		return HIGH_CARD;
	} else if (uniqueCards.size === 4) {
		return ONE_PAIR;
	} else if (uniqueCards.size === 3) {
		// AAABC
		// AABBC
		let counts = countCards(hand);
		if (counts.some(([card, count]) => count === 3)) {
			return THREE_OF_A_KIND;
		} else {
			return TWO_PAIR;
		}
	} else {
		// full or 4
		let counts = countCards(hand);
		if (counts.some(([card, count]) => count === 4)) {
			return FOUR_OF_A_KIND;
		} else {
			return FULL_HOUSE;
		}
	}
}

/** @type Map<string, number> */
const CARD_RANKS = '23456789TJQKA'
	.split('')
	.map((v, i) => [v, i + 1])
	.reduce((acc, [c, r]) => {
		acc.set(c, r);
		return acc;
	}, new Map());

function rankHands(handA, handB) {
	const handAType = getHandType(handA);
	const handBType = getHandType(handB);
	if (handAType === handBType) {
		// Highest hand goes on the bottom
		return handAType - handBType;
	} else {
		for (let i = 0; i < handA.length; i++) {
			let cardA = handA[i];
			let cardB = handB[i];

			let cardARank = CARD_RANKS.get(cardA);
			let cardBRank = CARD_RANKS.get(cardB);
			if (cardARank !== cardBRank) {
				return cardARank - cardBRank;
			}
		}
	}

	console.log('handA', handA);
	console.log('handB', handB);
	throw 'SHould not get here!';
}

module.exports = { rankHands };

// 252496178 wrong
