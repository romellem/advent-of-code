// const { sampleInput, splitMolecule } = require('./input');
// let { rules, initialState } = sampleInput;
// initialState = 'HOHOHO'.split('');

const { input, splitMolecule } = require('./input');
const { rules, initialState } = input;

let valid_solutions_length = {};
let fn_stack = [];
let growMoleculesFromSeedRec;
const trampoline = fn => (...args) => {
    // Run our function
    fn(...args);

    while (fn_stack.length) {
        let result = fn_stack.pop();
        let [growth, step] = result.split('|');
        growth = splitMolecule(growth);
        step = +step;
        growMoleculesFromSeedRec(growth, step);
    }
};

// const growMoleculesFromSeedRec = (seed = ['e'], step = 0) => {
growMoleculesFromSeedRec = (seed, step) => {
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
                    fn_stack.push(`${growth.join('')}|${step + 1}`);
                }
            }
        }
    }
};

const growMoleculesFromSeed = trampoline(growMoleculesFromSeedRec);
growMoleculesFromSeed(['e'], 0);

let valid_solutions = Object.keys(valid_solutions_length).map(n => +n);
valid_solutions.sort((a, b) => a - b);
console.log(valid_solutions[0]);
