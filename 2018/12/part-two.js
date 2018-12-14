const Garden = require('./garden');
const input = require('./input');

const { initialState, spreadRules } = input;

let garden = new Garden(initialState, spreadRules);

// 😱
const DAYS_TO_SIMULATE = 50000000000;

/**
 * OK, had to look up a hint for this one. Basically,
 * it'd take forever to actually run 50 billion iterations
 * (especially since as the simulation ticks forward, our "row"
 * continue to grow, so our inner loop gets longer and longer!!!),
 * so the trick is that the sum (at some point) "stabalizes,"
 * meaning with each tick we add some constant value.
 *
 * So, we just need to simulate until we stablize, see how much
 * the next iteration will bring, and multiply that by the days remaining
 * and add that to the current sum.
 *
 * Simple! 🙄
 */
let total_days = 0;
let days_stabilized = 0;
let last_sum = garden.getSumOfAlivePlantsIds();
let last_sum_difference = last_sum; // last_sum - 0
while (days_stabilized < 100) {
    garden.tick();
    total_days++;

    let new_sum = garden.getSumOfAlivePlantsIds();
    let current_sum_difference = new_sum - last_sum;

    // Save our sum to get ready for next tick, or to use when we break outside the loop
    last_sum = new_sum;

    if (current_sum_difference !== last_sum_difference) {
        days_stabilized = 0;
        last_sum_difference = current_sum_difference;
    } else {
        days_stabilized++;
    }
}

let remaining_days = DAYS_TO_SIMULATE - total_days;
let current_sum = last_sum;
let current_sum_difference = last_sum_difference;

// y = mx + b
let final_sum = current_sum_difference * remaining_days + current_sum;

console.log(`${current_sum_difference} * ${remaining_days} + ${current_sum} =`);
console.log('\t' + final_sum);
