let { difference } = require('lodash');
let { input, sampleInput } = require('./input');
const G = require('generatorics');

const sum = (a, b) => a + b;

let presents = input;
let presents_weight = presents.reduce(sum);
let presents_weight_fourth = presents_weight / 4;

const solutions = [];

let g1, g2, g3;
const upper_bound = (presents.length - 3) / 4;
for (let g1_num = 1; g1_num <= upper_bound; g1_num++) {
    process.stdout.write(Math.round(((g1_num - 1) / upper_bound) * 100) + '%...\r');
    for (g1 of G.combination(presents, g1_num)) {
        let g1_weight = g1.reduce(sum);

        if (g1_weight === presents_weight_fourth) {
            let g1_copy = g1.join(',');

            let sol = {
                g1: g1_copy,
                qe: g1.reduce((a, b) => a * b, 1),
                g1_size: g1.length,
            };

            solutions.push(sol);
        }
    }
}

solutions.sort((a, b) => {
    if (a.g1_size < b.g1_size) return -1;
    else if (a.g1_size > b.g1_size) return 1;
    else {
        if (a.qe < b.qe) return -1;
        else if (a.qe > b.qe) return 1;
        else return 0;
    }
});

console.log(solutions[0]);
console.log('Quantum Entanglement of least amount of Group 1 packages is:\n' + solutions[0].qe);
