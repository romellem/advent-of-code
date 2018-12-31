const G = require('generatorics');
const { range } = require('lodash');
const input_map = require('./input');

const input = Object.keys(input_map).map(ingredient => {
    let ingredient_stats = JSON.parse(JSON.stringify(input_map[ingredient]));
    ingredient_stats['name'] = ingredient;

    return ingredient_stats;
});

const TOTAL_TEASPOONS = 100;
const NUMBER_OF_INGREDIENTS = input.length;

/**
 * OK, this is a bit confusing, but I remember this back in my college stats class.
 * Essentially, we use a trick of combinations [e.g. (k choose n)], to help us
 * iterate all the possible ways we can split a number into finite groups.
 *
 * Let's simplify it: pretend we have 10 total teaspoons to work with, and 3 ingredients.
 * How many different ways...
 */

let ingredients = range(TOTAL_TEASPOONS + NUMBER_OF_INGREDIENTS);

let amounts_range, perm_of_amounts;
let best_recipe_score = -1;

for (amounts_range of G.combination(ingredients, NUMBER_OF_INGREDIENTS - 1)) {
    /**
     * Eh, this should be a loop but I'm being lazy, I know we have four ingredients
     */

    // prettier-ignore
    let amounts = [
        (amounts_range[0])       - (0),
        (amounts_range[1])       - (amounts_range[0] - 1),
        (amounts_range[2])       - (amounts_range[1] - 1),
        (ingredients.length - 1) - (amounts_range[2] - 1),
    ];
    let total_score = ['capacity', 'durability', 'flavor', 'texture']
        .map(quality => input.map((v, i) => v[quality] * amounts[i]).reduce((a, b) => a + b))
        .map(v => (v < 0 ? 0 : v))
        .reduce((a, b) => a * b);

    if (total_score > best_recipe_score) {
        best_recipe_score = total_score;
    }
}

console.log(best_recipe_score);
