const assert = require('assert');

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
const CALORIES_PER_COOKIE = 500;

/**
 * OK, this is a bit confusing, but I remember this back in my college stats class.
 * Essentially, we use a trick of combinations [e.g. (k choose n)], to help us
 * iterate all the possible ways we can split a number into finite groups.
 *
 * Let's simplify it: pretend we have 10 total teaspoons to work with, and 3 ingredients.
 * How many different ways
 */

let ingredients = range(TOTAL_TEASPOONS + NUMBER_OF_INGREDIENTS);

let amounts_range, perm_of_amounts;
let best_recipe_score = -1;

for (amounts_range of G.combination(ingredients, NUMBER_OF_INGREDIENTS - 1)) {
    let total_ingredients_verification = 0;
    let amounts = [];
    for (let i = 0; i < NUMBER_OF_INGREDIENTS; i++) {
        let amount;
        if (i === 0) {
            amount = amounts_range[i];
        } else if (i === NUMBER_OF_INGREDIENTS - 1) {
            amount = ingredients.length - amounts_range[i - 1] - 2;
        } else {
            amount = amounts_range[i] - amounts_range[i - 1] - 1;
        }
        amounts.push(amount);
        total_ingredients_verification += amount;
    }

    assert.strictEqual(total_ingredients_verification, TOTAL_TEASPOONS);

    let total_calories = input.map((v, i) => v.calories * amounts[i]).reduce((a, b) => a + b);
    if (total_calories === CALORIES_PER_COOKIE) {
        let total_score = ['capacity', 'durability', 'flavor', 'texture']
            .map(quality => input.map((v, i) => v[quality] * amounts[i]).reduce((a, b) => a + b))
            .map(v => (v < 0 ? 0 : v))
            .reduce((a, b) => a * b);

        if (total_score > best_recipe_score) {
            // console.log(`New best of ${total_score} with breakdown of ${amounts.join(',')}`);
            best_recipe_score = total_score;
        }
    }
}

console.log('===========');
console.log(best_recipe_score);
