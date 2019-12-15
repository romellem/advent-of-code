class Formula {
	constructor(recipes) {
		this.recipes = JSON.parse(JSON.stringify(recipes));
		this.formula_lookup = {};
		this.reverse_lookup = {};
		this.leftover = {};
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
		this.leftover = {};
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

		if (this.formula_lookup[element] !== undefined) {
			return this.formula_lookup[element];
		}

		// Get formula pieces (the "needs")
		let { creates, needs } = this.recipes[element];
		let sum = 0;
		for (let [piece_element, piece_amount] of needs) {
			let multiplier = Math.ceil(amount / creates);
			let remainder = creates % amount;
			this.addToLeftover(element, remainder);
			sum +=
				multiplier *
				this.recursiveCalculateOreTo(piece_element, piece_amount);
		}

		return sum;
	}

	addToLeftover(element, amount) {
		if (this.leftover[element] === undefined) {
			this.leftover[element] = 0;
		}
		this.leftover[element] += amount;
	}
}

module.exports = Formula;
