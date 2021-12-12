const { input } = require('./input');
const { Graph } = require('./graph');

let graph = new Graph(input);
let paths = graph.getPaths('start', 'end');
console.log(paths.length);
