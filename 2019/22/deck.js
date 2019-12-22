class Deck {
	constructor(moves, deck_size = 10007) {
		this.moves = JSON.parse(JSON.stringify(moves));
		this.current_deck = Array(deck_size)
			.fill()
			.map((_, i) => i);
		this.temp_deck = this.deck.slice(0);
	}

	reverse() {
		this.current_deck.reverse();
	}

	cut(n) {

	}

	increment(n) {
		
	}
}
