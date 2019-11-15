const assert = require('assert');
const { input, sampleInput } = require('./input');
const Bridges = require('./bridge');

let bridges = new Bridges(sampleInput);
let best_bridge = bridges.getBestSolution();

console.log('All Bridges\n============');
bridges.printSolutions();
console.log('============\nSolution:\n');
console.log(Bridges.getSolutionString(best_bridge));
console.log(Bridges.getSolutionScore(best_bridge));