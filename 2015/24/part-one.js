let { difference } = require('lodash');
let { input, sampleInput } = require('./input');
const G = require('generatorics');

// let g1_num = process.argv[2] || '1';
// g1_num = parseInt(g1_num);

// console.log('Using ' + g1_num);

let presents = sampleInput;

const sum = (a, b) => a + b;

const solutions = [];

let g1, g2, g3;
for (let g1_num = 1; g1_num <= presents.length - 2; g1_num++) {
for (g1 of G.combination(presents, g1_num)) {
    // console.log(g1);
    let remaining_presents1 = difference(presents, g1);
    let g1_weight = g1.reduce(sum);

    for (let g2_num = 1; g2_num <= remaining_presents1.length - 1; g2_num++) {
        for (g2 of G.combination(remaining_presents1, g2_num)) {
            let g2_weight = g2.reduce(sum);

            if (g1_weight === g2_weight) {
                let g3 = difference(remaining_presents1, g2);

                let g1_weight = g1.reduce(sum);
                let g2_weight = g2.reduce(sum);
                let g3_weight = g3.reduce(sum);

                if (g1_weight === g2_weight && g1_weight === g3_weight) {
                    let g1_copy = g1.join(',');
                    let g2_copy = g2.join(',');
                    let g3_copy = g3.join(',');

                    let sol = {
                        g1: g1_copy,
                        g2: g2_copy,
                        g3: g3_copy,
                        qe: g1.reduce((a, b) => a * b, 1),
                        g1_size: g1.length,
                    };

                    // console.log('Found sol ' + JSON.stringify(sol));
                    // console.log(sol.qe + '\n===========\n\n');

                    solutions.push(sol);
                }
            }
        }
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
console.log(solutions[0].qe);
