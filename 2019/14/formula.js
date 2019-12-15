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

		let { creates, needs } = this.recipes[element];
		let amount_minus_leftover = amount - this.leftover[element];
		let need_to_create = Math.max(amount_minus_leftover, 0);
		let multiplier = Math.ceil(need_to_create / creates);
		let leftover_after_synthesis = creates * multiplier - amount_minus_leftover;
		this.leftover[element] = leftover_after_synthesis;

		if (need_to_create === 0) {
			/**
			 * We already have enough of this element created, we don't need to synthesize more.
			 * So, it doesn't cost us any ORE, return 0 to indicate that.
			 */
			return 0;
		}

		// Otherwise, we need to synthesize this element
		let ore_sum = 0;
		for (let [piece_element, piece_amount] of needs) {
			ore_sum += multiplier * this.recursiveCalculateOreTo(piece_element, piece_amount);
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
