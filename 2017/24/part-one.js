const assert = require('assert');
const { input, sampleInput } = require('./input');
const Bridges = require('./bridge');

let test_bridges = new Bridges(sampleInput);
let test_best_bridge = test_bridges.getBestSolution();

assert.strictEqual(Bridges.getSolutionScore(test_best_bridge), 31);

let bridges = new Bridges(input);
let best_bridge = bridges.getBestSolution();

// console.log('All Bridges\n============');
// bridges.printSolutions();
console.log('============\nSolution:\n');
console.log(Bridges.getSolutionString(best_bridge));
console.log(Bridges.getSolutionScore(best_bridge));
