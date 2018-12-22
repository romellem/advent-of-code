const fs = require('fs');
const path = require('path');
const G = require('generatorics');

let raw_input_txt = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

let raw_input = raw_input_txt.split('\n').filter(n => n);

// @example Tristram to Norrath = 111
const CITY_REGEX = /^(\w+) to (\w+) = (\d+)$/;

let unique_cities_lookup = {};
let distances = {};

let input = raw_input.map(line => {
    let [match, from, to, distance] = CITY_REGEX.exec(line);
    distance = parseInt(distance);

    if (!unique_cities_lookup[from]) {
        unique_cities_lookup[from] = true;
    }
    if (!unique_cities_lookup[to]) {
        unique_cities_lookup[to] = true;
    }

    // Each distance works from either direction
    distances[`${from}${to}`] = distance;
    distances[`${to}${from}`] = distance;

    return {
        from,
        to,
        distance,
    };
});

const unique_cities = Object.keys(unique_cities_lookup);
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
