const G = require('generatorics');
const { uniq } = require('lodash');
const input = require('./input');

let unique_people = uniq(input.map(p => p.person));
const happiness_lookup = {};

unique_people.forEach(person => {
    happiness_lookup[person] = {
        happinessChangeSittingNextTo: {},
    };
});

input.forEach(info => {
    let { person, happinessChange, sittingNextTo } = info;
    happiness_lookup[person].happinessChangeSittingNextTo[sittingNextTo] = happinessChange;
});

let max_happiness = 0;
let best_seating_arrangement = '';
for (let seating_arrangement of G.permutation(unique_people)) {
    let total_happiness = 0;
    seating_arrangement.forEach((person, index) => {
        let left, right;
        if (index === 0) {
            // First person
            left = seating_arrangement[seating_arrangement.length - 1];
            right = seating_arrangement[index + 1];
        } else if (index === seating_arrangement.length - 1) {
            // Last person
            left = seating_arrangement[index - 1];
            right = seating_arrangement[0];
        } else {
            left = seating_arrangement[index - 1];
            right = seating_arrangement[index + 1];
        }

        let left_change = happiness_lookup[person].happinessChangeSittingNextTo[left];
        let right_change = happiness_lookup[person].happinessChangeSittingNextTo[right];

        total_happiness += left_change + right_change;
    });

    if (total_happiness > max_happiness) {
        max_happiness = total_happiness;
        best_seating_arrangement = seating_arrangement.join(',');
    }
}

console.log(
    `With a seating arrangment of ${best_seating_arrangement}, we max the hapiness at\n${max_happiness}`
);
