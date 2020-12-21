const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		/**
		 * @example mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
		 * @example trh fvjkl sbzzf mxmxvkd (contains dairy)
		 */
		let [ingredients] = line.split(' (contains');
		ingredients = ingredients.split(' ');
		// let ingredients_lookup = ingredients.reduce((obj, v) => ((obj[v] = true), obj), {});
		let [, allergens] = /contains ([\w,\s]+)\)/.exec(line);
		allergens = allergens.split(', ');
		// let allergens_lookup = allergens.reduce((obj, v) => ((obj[v] = true), obj), {});

		return {
			ingredients,
			// ingredients_lookup,
			allergens,
			// allergens_lookup,
		};
	});

module.exports = {
	input,
};
