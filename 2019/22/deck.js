class Deck {
	constructor(moves, deck_size = 10007) {
		this.moves = JSON.parse(JSON.stringify(moves));
		this.current_deck = Array(deck_size)
			.fill()
			.map((_, i) => i);

		// The values here will be changed later, on init they don't matter
		this.temp_deck = Array(deck_size).fill();
	}

	shuffle(position_of_card_to_return = 2019) {
		for (let { op, arg } of this.moves) {
			// 'reverse', 'cut', 'increment'
			this[op](arg);
		}

		return this.current_deck.indexOf(position_of_card_to_return);
	}

	reverse() {
		this.current_deck.reverse();
	}

	cut(n) {
		let size = Math.abs(n);
		if (n > 0) {
			let front_part = this.current_deck.splice(0, size);
			this.current_deck = this.current_deck.concat(front_part);
		} else {
			let back_part = this.current_deck.splice(this.current_deck.length - size, size);
			this.current_deck = back_part.concat(this.current_deck);
		}
	}

	increment(n) {
		for (let c = 0; c < this.current_deck.length; c++) {
			let position = (c * n) % this.current_deck.length;
			this.temp_deck[position] = this.current_deck[c];
		}

		// Copy temp deck into current deck. Temp deck never gets recreated
		this.current_deck = this.temp_deck.slice(0);
	}
}

module.exports = Deck;
