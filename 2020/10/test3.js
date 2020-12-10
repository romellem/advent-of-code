const { DiGraph } = require('./graph');

const input = [1,2,3,4];
let g = new DiGraph(input);
console.log(g.countPaths(0, input.length));