const { input, sampleInput } = require('./input');
const Tree = require('./tree');

// let tree = new Tree(sampleInput);
let tree = new Tree(input);

console.log(tree.findOneUnbalancedNodeNewTargetTotalWeight());
