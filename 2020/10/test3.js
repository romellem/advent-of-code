const { input } = require('./input');
const { DiGraph } = require('./graph');

let g = new DiGraph(input.slice(0).sort((a, b) => a - b));
let total = g.countPaths();
console.log('\n\n============\n');
console.log(total);