class Formula {
	constructor(recipes) {
		this.recipes = recipes;
	}

	/*
	1 ORE => 2 A
	4 A => 3 B
	13 B => 1 FUEL

	formula = {
		FUEL: {
			creates: 1,
			needs: [
				['B', 12]
			]
		},
		B: {
			creates: 3,
			needs: [
				['A', 4]
			]
		},
		A: {
			creates: 2,
			needs: [
				['ORE', 1]
			]
		}
	};

	formula = {
		FUEL: {
			creates: 1,
			needs: [
				['A', 1]
			]
		},
		A: {
			creates: 10,
			needs: [
				['ORE', 10]
			]
		}
	};

	*/
	calculateOreFrom(element, amount = 1) {
		if (this.reverse_lookup[element] !== undefined) {
			return this.reverse_lookup[element];
		}

		let { creates, needs } = this.recipes[element];
		let sum = 0;
		for (let [piece_element, piece_amount] of needs) {
		}
	}

	calculateOreTo(element, amount = 1) {
		// Initialize leftovers to be 0 (including ORE)
		this.leftover = Object.keys(this.recipes).reduce(
			(obj, element) => ((obj[element] = 0), obj),
			{ ORE: 0 }
		);
		let ore = this.recursiveCalculateOreTo(element, amount);

		return {
			ore,
			leftover: this.leftover,
		};
	}
	recursiveCalculateOreTo(element, amount = 1) {
		if (element === 'ORE') {
			return amount;
		}

		// Get formula pieces (the "needs")
		let { creates, needs } = this.recipes[element];
		let ore_sum = 0;
		for (let [piece_element, piece_amount] of needs) {
			let amount_minus_leftover = amount - this.leftover[piece_element];
			if (amount_minus_leftover <= 0) {
				/**
				 * We already have enough created, we don't need to synthesize more.
				 * Adjust our leftover and return 0, don't need to spend any more ORE.
				 */
				this.leftover[piece_element] -= amount;
				return 0;
			}

			let multiplier = Math.ceil(amount_minus_leftover / creates);
			let remainder = multiplier * creates - amount_minus_leftover;

			this.leftover[piece_element] = remainder;

			ore_sum +=
				multiplier *
				this.recursiveCalculateOreTo(piece_element, piece_amount);
		}

		return ore_sum;
	}

	addToLeftover(element, amount) {
		if (this.leftover[element] === undefined) {
			this.leftover[element] = 0;
		}
		this.leftover[element] += amount;
	}
}

module.exports = Formula;
