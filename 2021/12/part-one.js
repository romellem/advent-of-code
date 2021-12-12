const { input } = require('./input');
const { Graph } = require('./graph');

let graph = new Graph(input);
let count = graph.countPaths('start', 'end');
console.log(count);
