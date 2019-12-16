class Formula {
	constructor(recipes) {
		// Clone our recipes
		this.recipes = JSON.parse(JSON.stringify(recipes));
		this.leftover;
	}

	calculateOreTo(element, amount = 1) {
		// Initialize leftovers to be 0
		this.leftover = Object.keys(this.recipes).reduce(
			(obj, element) => ((obj[element] = 0), obj),
			{}
		);

		let ore = this.recursiveCalculateOreTo(element, amount);

		return {
			ore,
			leftover: this.leftover,
		};
	}

	recursiveCalculateOreTo(element, amount = 1) {
		// We don't synthesize ORE, just return that ammount immediately
		if (element === 'ORE') {
			return amount;
		}

		// Find our recipe, and see how much that recipe creates as well as the needed ingredients
		let { creates, needs: ingredients } = this.recipes[element];

		// Subtract our leftovers from how much we need to create
		let amount_minus_leftover = amount - this.leftover[element];

		// Clamp the amount we need to create at zero (can't create negative elements)
		let need_to_create = Math.max(amount_minus_leftover, 0);

		// We need to create more, calculate how many times we need to run the recipe
		let multiplier = Math.ceil(need_to_create / creates);

		// How many would be created after running the recipe `multiplier` times
		let total_from_running_m_times = creates * multiplier;

		// Add our leftovers to how many we will create
		let total_plus_leftover = total_from_running_m_times + this.leftover[element];

		// Subtract the amount we need from the amount we've created
		let leftover_after_synthesis = total_plus_leftover - amount;

		// Save our leftover count, we may not need to synthesize an element later
		this.leftover[element] = leftover_after_synthesis;

		if (need_to_create === 0) {
			/**
			 * We already have enough of this element created, we don't need to synthesize more.
			 * So, it doesn't cost us any ORE, return 0 to indicate that.
			 *
			 * @note that we only do this _after_ we've saved our leftover count. Otherwise our counts will be off.
			 */
			return 0;
		}

		/**
		 * If we're here, we don't have enough leftovers to pull from.
		 * So, we need to sysnthesize them. Recursively calculate the ORE
		 * cost then for all our ingredients. Importantly, for each of
		 * the ingredients, multiply it by our multiplier, since that
		 * is how many of the recipes we need from the prior call.
		 */
		let ore_sum = 0;

		for (let [ingredient_element, ingredient_amount] of ingredients) {
			ore_sum += this.recursiveCalculateOreTo(
				ingredient_element,
				multiplier * ingredient_amount
			);
		}

		return ore_sum;
	}
}

module.exports = Formula;
