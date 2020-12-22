function play(p1, p2) {
	while (p1.length && p2.length) {
		let p1_top = p1.shift();
		let p2_top = p2.shift();

		if (p1_top > p2_top) {
			p1.push(p1_top, p2_top);
		} else {
			p2.push(p2_top, p1_top);
		}
	}

	let winner = p1.length ? p1.reverse() : p2.reverse();
	let score = winner.map((v, i) => v * (i + 1)).reduce((a, b) => a + b, 0);

	return score;
}

const PLAYER_1 = '1';
const PLAYER_2 = '2';

function recursivePlay(p1, p2, depth = 0) {
	let played = {};
	while (p1.length && p2.length) {
		let check = p1.join('') + '+' + p2.join('');

		/**
		 * Before either player deals a card, if there was a previous round
		 * in this game that had exactly the same cards in the same order
		 * in the same players' decks, the game instantly ends in a win for
		 * player 1. Previous rounds from other games are not considered.
		 * (This prevents infinite games of Recursive Combat, which everyone
		 * agrees is a bad idea.)
		 */
		if (played[check] === true) {
			return PLAYER_1;
		}
		played[check] = true;

		let p1_top = p1.shift();
		let p2_top = p2.shift();

		if (p1_top <= p1.length && p2_top <= p2.length) {
			let winner = recursivePlay(p1.slice(0, p1_top), p2.slice(0, p2_top), depth + 1);
			if (winner === PLAYER_1) {
				p1.push(p1_top, p2_top);
			} else if (PLAYER_2) {
				p2.push(p2_top, p1_top);
			}
		} else if (p1_top > p2_top) {
			p1.push(p1_top, p2_top);
		} else if (p1_top < p2_top) {
			p2.push(p2_top, p1_top);
		}
	}

	// Only compute score on initial game as an optimization
	if (depth === 0) {
		let winner = p1.length ? p1.reverse() : p2.reverse();
		let score = winner.map((v, i) => v * (i + 1)).reduce((a, b) => a + b, 0);

		return score;
	} else {
		return p1.length ? PLAYER_1 : PLAYER_2;
	}
}

module.exports = { play, recursivePlay };
