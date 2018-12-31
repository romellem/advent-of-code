// const { sampleInput } = require('./input');
// let { rules, initialState } = sampleInput;

const { input } = require('./input');
const { rules, initialState } = input;

let possible_molecules = {};
initialState.forEach((element, i) => {
    if (rules[element]) {
        rules[element].forEach(rule => {
            let molecule_copy = JSON.parse(JSON.stringify(initialState));
            molecule_copy[i] = rule;

            let possible_molecule = molecule_copy.join('');
            possible_molecules[possible_molecule] = true;
        });
    }
});

console.log(Object.keys(possible_molecules).length);
