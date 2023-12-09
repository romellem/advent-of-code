// Use numbers for easy sorting
const FIVE_OF_A_KIND = 6;
const FOUR_OF_A_KIND = 5;
const FULL_HOUSE = 4;
const THREE_OF_A_KIND = 3;
const TWO_PAIR = 2;
const ONE_PAIR = 1;
const HIGH_CARD = 0;

/**
 * @returns {Array<[string, number]>}
 */
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

const CARD_RANKS_JOKERS_WILD = 'J23456789TQKA'
	.split('')
	.map((v, i) => [v, i + 1])
	.reduce((acc, [c, r]) => {
		acc.set(c, r);
		return acc;
	}, new Map());

const ALL_CARDS_WITHOUT_JOKERS = '23456789TQKA'.split('');
function getAllHandsJokersWild(hand) {
	let newHands = new Set();
	for (let swapCard of ALL_CARDS_WITHOUT_JOKERS) {
		let newHand = hand.map((v) => (v === 'J' ? swapCard : v)).join('');
		newHands.add(newHand);
	}

	return Array.from(newHands).map((v) => v.split(''));
}

function rankHands(handA, handB, { jokersWild = false } = {}) {
	const ranks = jokersWild ? CARD_RANKS_JOKERS_WILD : CARD_RANKS;

	let handAType;
	let handBType;

	if (jokersWild && (handA.includes('J') || handB.includes('J'))) {
		const allHandsA = getAllHandsJokersWild(handA);
		const bestA = allHandsA.sort((a, b) => rankHands(a, b)).at(-1);

		const allHandsB = getAllHandsJokersWild(handB);
		const bestB = allHandsB.sort((a, b) => rankHands(a, b)).at(-1);

		handAType = getHandType(bestA);
		handBType = getHandType(bestB);
	} else {
		handAType = getHandType(handA);
		handBType = getHandType(handB);
	}

	if (handAType !== handBType) {
		// Highest hand goes on the bottom
		return handAType - handBType;
	} else {
		for (let i = 0; i < handA.length; i++) {
			const cardA = handA[i];
			const cardB = handB[i];

			const cardARank = ranks.get(cardA);
			const cardBRank = ranks.get(cardB);
			if (cardARank !== cardBRank) {
				return cardARank - cardBRank;
			}
		}
	}

	// Hands are equal
	return 0;
}

module.exports = { rankHands };
