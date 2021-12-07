const { unique_cities, distances } = require('./input');
const G = require('generatorics');

let shortest_distance = Number.MAX_SAFE_INTEGER;

for (let permuation of G.permutation(unique_cities)) {
    let accumulator = 0;
    for (let i = 0; i < permuation.length - 1; i++) {
        let from_to = permuation[i] + permuation[i + 1];

        accumulator += distances[from_to];
    }

    if (accumulator < shortest_distance) {
        shortest_distance = accumulator;
    }
}

console.log(shortest_distance);
