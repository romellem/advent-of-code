const { unique_cities, distances } = require('./input');
const G = require('generatorics');

let longest_distance = -1;

for (let permuation of G.permutation(unique_cities)) {
    let accumulator = 0;
    for (let i = 0; i < permuation.length - 1; i++) {
        let from_to = permuation[i] + permuation[i + 1];

        accumulator += distances[from_to];
    }

    if (accumulator > longest_distance) {
        longest_distance = accumulator;
    }
}

console.log(longest_distance);
