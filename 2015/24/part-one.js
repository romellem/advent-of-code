let { input, sampleInput } = require('./input');
const G = require('generatorics');

let presents = sampleInput;

const arrayToMap = (arr) => {
    let obj = {};
    arr.map(v => obj[v] = true);

    return obj;
}

let g1, g2, g3;
for (let g1_num = 1; g1_num <= presents.length - 2; g1_num++) {
    for (g1 of G.combination(presents, g1_num)) {
        let g1_map = arrayToMap(g1);

        let remaining_presents = 

        for (g2 of G.combination(presents, g1_num)) {

        }
    }
}
