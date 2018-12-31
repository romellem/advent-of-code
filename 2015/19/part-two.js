'use strict';
const { sampleInput, splitMolecule } = require('./input');
let { rules, initialState } = sampleInput;
initialState = 'HOHOHO'.split('');

// const { input, splitMolecule } = require('./input');
// const { rules, initialState } = input;

let valid_solutions_length = {};
const trampoline = fn => (...args) => {
    let result = fn(...args);

    while (typeof result === 'function') {
        result = result();
    }

    return result;
};

const growMoleculesFromSeedRecursive = (seed = ['e'], step = 0) => {
    // If we are at the max length, test our growth to break out of our recursive loop
    if (seed.length === initialState.length) {
        if (seed.join('') === initialState.join('')) {
            // We only care about how many steps, not what those steps were
            valid_solutions_length[step] = true;
        }
    } else {
        for (let i = 0; i < seed.length; i++) {
            let element = seed[i];
            if (rules[element]) {
                for (let e = 0; e < rules[element].length; e++) {
                    let grow_to = rules[element][e];
                    let growth = seed.slice(0);
                    growth[i] = grow_to;
                    growth = splitMolecule(growth.join(''));
                    return () => growMoleculesFromSeedRecursive(growth, step + 1);
                }
            }
        }
    }
};

const growMoleculesFromSeed = trampoline(growMoleculesFromSeedRecursive);
growMoleculesFromSeed();
let valid_solutions = Object.keys(valid_solutions_length);
valid_solutions.sort((a, b) => a - b);
console.log(valid_solutions[0]);
