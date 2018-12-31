const assert = require('assert');

const G = require('generatorics');
const { range } = require('lodash');
const input_map = require('./input');

const input = Object.keys(input_map).map(ingredient => {
    let ingredient_stats = JSON.parse(JSON.stringify(input_map[ingredient]));

    // Adds name for completeness sake
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
 * How many different ways are there of slicing up those ten total teaspoons among
 * the 3 ingredients?
 * 
 * The trick has to do with combinations. To see how, imagine this:
 * Imagine we have ten dots `.` and two lines `|`, where a dot represents a
 * single unit of an ingredient, and a line indicates how we separate the
 * ingredients from each other. For now, let's write these out in a random
 * order. You'll see what I'm getting at shortly...
 * 
 *     `...|.....|..`
 * 
 * You can see we have _3_ dots to the left of the first line, _5_ dots
 * in between the first and second, and _2_ dots to the right of the last line.
 * You can think of this as a way pick our ingredients:
 * 
 * - The first ingredient gets _3_ units
 * - The second ingredient gets _5_ units
 * - And the third ingredient gets _2_ units (note the whole thing totals to **10**)
 * 
 * Using this representation, we can loop through the combinations of placing these
 * pipes through our units to get all the possible breakdowns of our ingredients,
 * and they'll always nicely total to 10.
 * 
 * For another example, say we have
 * 
 *     `||..........`
 * 
 * This would translate to:
 * 
 * - The first ingredient gets _0_ units
 * - The second ingredient gets _0_ units
 * - And the third ingredient gets _10_ units
 * 
 * So if we have `K` total units of some ingredient to work with (in the case of this
 * program, its 100) and add in `N - 1` "stop points," where `N` is the number of
 * ingredients we have to work with (in this case, it is 4), we simply do a
 * `(K choose N)` to get an example ingredient breakdown.
 * 
 * Within the program, I do another trick by creating a _range()_ array,
 * and looping through the combinations within that array. Since the combintations
 * are always in increasing order, I do some math to calculate where by "stop points"
 * are located, which gives me the size of ingredient breakdown.
 * 
 * For the first example I used above, the analogous program would look like
 * 
 * Initial array of: `array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]`
 * Notice how the value of an item matches up with its index. That is, `array[n] === n`.
 * 
 * Example combination for "stop points" of: `combos = [3, 9]`
 * Think of that second as as the indices where we draw our lines, so with that initial
 * array, replacing everything with dots and pipes where needed, we'd see a familiar
 * 
 * _index:_  `0  1  2  3  4  5  6  7  8  9 10 11`
 * _visual:_ `.  .  .  |  .  .  .  .  .  |  .  .`
 * 
 * OK, so back to our combination array, how can we use those two values to calculate
 * our ingredients breakdown?
 * 
 * We calculate it with:
 * 
 * - For the _first_ ingredient, the amount is just the amount of the first value within
 *   our combo array, since everything is 0-indexed. So for the first ingredient,
 *   its amount is just `combos[0] = 3`. This makes sense because above, we see **3**
 *   dots to the left of the first line.
 * - For the _second_ ingredient, we want to count the amount between the first
 *   and second combo numbers. This is just our second combo, minus our first combo,
 *   minus 1 so we don't count that leftmost index (we only want the indices
 *   strictly **between** our two values). So the second ingredient is
 *   `combos[1] - combos[0] - 1 = 9 - 3 - 1 = 5`. Again, we see **5** dots between the
 *   first and second line.
 * - For the _third_ ingredient, we take the length of our original array, and subtract
 *   the second combo from it, while remembering to again subtract one to only count
 *   the number of items between those points. So the third ingredient is
 *   `array.length - combos[1] - 1 = 12 - 9 - 1 = 2`. Finally, we see **2** dots
 *   to the right of the second line.
 * 
 * You can see, we have edge cases for the first and last ingredients, while ingredients
 * in the middle are calculated the same way. Extrapolating this out, we can come
 * up with a formula to calculate these amounts, and then use those amounts to
 * figure out our total score for the recipe.
 * 
 * Easy peasy!
 * 
 */

let ingredients = range(TOTAL_TEASPOONS + (NUMBER_OF_INGREDIENTS - 1));

let amounts_range;
let best_recipe_score = -1;

for (amounts_range of G.combination(ingredients, (NUMBER_OF_INGREDIENTS - 1))) {
    let total_ingredients_verification = 0;
    let amounts = [];
    for (let i = 0; i < NUMBER_OF_INGREDIENTS; i++) {
        let amount;
        if (i === 0) {
            amount = amounts_range[i];
        } else if (i === NUMBER_OF_INGREDIENTS - 1) {
            amount = ingredients.length - amounts_range[i - 1] - 1;
        } else {
            amount = amounts_range[i] - amounts_range[i - 1] - 1;
        }
        amounts.push(amount);
        total_ingredients_verification += amount;
    }

    assert.strictEqual(total_ingredients_verification, TOTAL_TEASPOONS);

    /**
     * Part two _does_ care about calories, so compute it and check to
     * see if it equals the exact `CALORIES_PER_COOKIE` we're shooting for.
     * If so, then compute the total score and see if it beats our current best.
     */

    let total_calories = input.map((v, i) => v.calories * amounts[i]).reduce((a, b) => a + b);
    if (total_calories === CALORIES_PER_COOKIE) {
        let total_score = ['capacity', 'durability', 'flavor', 'texture']
            .map(quality => input.map((v, i) => v[quality] * amounts[i]).reduce((a, b) => a + b))
            .map(v => (v < 0 ? 0 : v))
            .reduce((a, b) => a * b);

        if (total_score > best_recipe_score) {
            // console.log(`When using: \n${amounts.map((v, i) => `\t${input[i].name}: ${v} tsp`).join('\n')}`);
            // console.log(`New best of ${total_score}\n=================`);
            best_recipe_score = total_score;
        }
    }
}

// console.log('\n');
console.log(best_recipe_score);
