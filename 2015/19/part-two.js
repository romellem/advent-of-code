// const { sampleInput, splitMolecule } = require('./input');
// let { rules, initialState } = sampleInput;
// initialState = 'HOHOHO'.split('');

const { input, splitMolecule } = require('./input');
const { rules, initialState } = input;

let which_e = process.argv[2] || '0';
which_e = parseInt(which_e);

let new_e = [rules['e'][which_e]];
rules['e'] = new_e;

console.log('Using the "e" rule at index ' + which_e + '...')
console.log(rules['e'])

let valid_solutions_length = {};
let fn_stack = [];
let loop = 0;
const trampoline = fn => (...args) => {
    // Run our function
    fn(...args);

    while (fn_stack.length) {
        ++loop;
        let result = fn_stack.pop();
        result();
        if (loop % 2473 === 0) {
            process.stdout.write(loop.toLocaleString() + '\r');
        }
    }
};

// const growMoleculesFromSeedRec = (seed = ['e'], step = 0) => {
const growMoleculesFromSeedRec = (seed, step) => {
    // If we are at the max length, test our growth to break out of our recursive loop
    if (seed.length >= initialState.length) {
        if (seed.length === initialState.length && seed.join('') === initialState.join('')) {
            // We only care about how many steps, not what those steps were
            valid_solutions_length[step] = true;

            console.log('                   \nSolution found! Took steps: ' + step);
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
                    fn_stack.push(() => growMoleculesFromSeedRec(growth, step + 1));
                }
            }
        }
    }
};

const growMoleculesFromSeed = trampoline(growMoleculesFromSeedRec);
growMoleculesFromSeed(['e'], 0);

console.log('\n\nAfter ' + loop.toLocaleString() + ' loops...\n\n');

let valid_solutions = Object.keys(valid_solutions_length).map(n => +n);
valid_solutions.sort((a, b) => a - b);
console.log(valid_solutions[0]);
