const { uniq, intersectionBy } = require('lodash');

class Ingredient {
	constructor(name) {
		this.name = name;
		this.allergen = undefined;
	}
}

class Food {
	constructor({ ingredients, ingredients_lookup, allergens, allergens_lookup }) {
		this.ingredients = ingredients.map((v) => new Ingredient(v));
		// this.ingredients_lookup = ingredients_lookup;
		this.allergens = allergens;
		// this.allergens_lookup = allergens_lookup;
	}
}

class AllFoods {
	constructor(input) {
		this.foods = input.map((food_input) => new Food(food_input));
		this.listed_allergens = this.getUniqueAllergens();
		this.foods_by_allergens = this.generateFoodsByAllergen();

		this.assigned_allergens = this.listed_allergens.reduce(
			(obj, allergen) => ((obj[allergen] = undefined), obj),
			{}
		);
	}

	getUniqueAllergens() {
		return uniq(this.foods.map((f) => f.allergens).flat());
	}

	generateFoodsByAllergen() {
		let lookup = this.listed_allergens.reduce(
			(obj, allergen) => ((obj[allergen] = []), obj),
			{}
		);

		for (let food of this.foods) {
			for (let allergen of food.allergens) {
				lookup[allergen].push(food);
			}
		}

		return lookup;
	}

	hasUnassociatedAllergen() {
		for (let allergen in this.assigned_allergens) {
			if (!this.assigned_allergens[allergen]) {
				return true;
			}
		}

		return false;
	}

	assignKnownAllergens() {
		let unknown_allergens = [...this.listed_allergens];

		let bail = 99999;
		while (unknown_allergens.length > 0 && (bail--) > 0) {
			for (let i = 0; i < unknown_allergens.length; i++) {
				let unknown_allergen = unknown_allergens[i];
				let foods_with_allergen = this.foods_by_allergens[unknown_allergen];
				let unassigned_ingredients = foods_with_allergen.map((f) =>
					f.ingredients.filter((ingredient) => !ingredient.allergen)
				);
				let similar_ingredients = intersectionBy(...unassigned_ingredients, 'name');
				if (similar_ingredients.length === 1) {
					let [ingredient] = similar_ingredients;
					ingredient.allergen = unknown_allergen;
					this.assigned_allergens[unknown_allergen] = ingredient;

					/**
					 * I'm not a fan of modifying the `i` index within a loop,
					 * but here, the idea is, if I find a match, remove that
					 * from my array, and subtract 1 from the index
					 * since the length has now changed.
					 */
					unknown_allergens.splice(i, 1);
					i--;
				}
			}
		}

		console.log(this.assigned_allergens);
	}
}

module.exports = { AllFoods };
