const G = require('generatorics');
const { uniq } = require('lodash');
const input = require('./input');

let unique_people = uniq(input.map(p => p.person));

for (let seating_arrangement of G.permutation(unique_people)) {
    let total_happiness = 0;
    seating_arrangement.forEach((person, index) => {
        let left, right;
        if (index === 0) {
            // First person
            left = unique_people[unique_people.length - 1];
            right = unique_people[index + 1];
        } else if (index === unique_people.length - 1) {
            // Last person
            left = unique_people[index - 1];
            right = unique_people[0];
        } else {
            left = unique_people[index - 1];
            right = unique_people[index + 1];
        }

        total_happiness += 

    })
}
